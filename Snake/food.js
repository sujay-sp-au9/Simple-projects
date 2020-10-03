import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

const EXPANSION_RATE = 3;
let food = getFoodPosition();
export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getFoodPosition();
  }
}
export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}
function getFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
