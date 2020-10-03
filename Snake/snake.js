import { getInputDirection } from "./input.js";
import { equalPositions } from "./grid.js";
export const SNAKE_SPEED = 4;
let newSegments = 0;

export let snakeBody = [{ x: 11, y: 11 }];
export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i > -1; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}
export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}
export function expandSnake(amount) {
  newSegments += amount;
}
export function onSnake(position, ignoreHead = false) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index == 0) return false;
    return equalPositions(segment, position);
  });
}
function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}
export function getSnakeHead() {
  return snakeBody[0];
}
export function snakeIntersection() {
  return onSnake(getSnakeHead(), true);
}
