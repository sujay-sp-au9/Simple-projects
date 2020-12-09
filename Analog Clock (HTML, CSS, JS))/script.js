const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");
const setClock = () => {
  const currentTime = new Date();
  const secondsRatio = currentTime.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentTime.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentTime.getHours()) / 12;
  console.log(secondsRatio);
  console.log(minutesRatio);
  console.log(hoursRatio);
  setRotation(secondHand, secondsRatio);
  setRotation(hourHand, hoursRatio);
  setRotation(minuteHand, minutesRatio);
};

const setRotation = (element, degree) => {
  element.style.setProperty("--rotation", degree * 360);
};

setClock();
setInterval(setClock, 1000);
