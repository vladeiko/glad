import gladPng from "./public/glad.png";
import song from "./public/song.mp3";
import "./index.css";

const headHeight = 64;
const headWidth = 64;

const fallSpeed = 6;
const sideSpeed = 4;
const posCalcInterval = 20;

const contentElement = document.getElementById("content");

const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;
const getPosValue = (pos) => +pos.replace(/\D/g, "");

const maxTopValue = contentElement.offsetHeight - headHeight;
const maxLeftValue = contentElement.offsetWidth - headWidth;

const maxGlads = 40;
let glads = [];

let isPlaying = false;

// Handle screen click
const clickHandler = async () => {
  // Do nothing if too much Glads
  if (glads.length >= maxGlads) return;

  // Play music if it's off
  if (!isPlaying) {
    const music = document.createElement("audio");
    music.src = song;
    music.loop = true;
    music.autoplay = true;

    isPlaying = true;

    contentElement.append(music);
  }

  // Create Glad and add to DOM
  const gladHead = document.createElement("img");
  gladHead.classList.add("glad-head");
  gladHead.classList.add("noselect");
  gladHead.src = gladPng;

  const glad = {
    id: glads.length,
    element: gladHead,
    left: getRandomInt(maxLeftValue),
    rigth: getRandomInt(maxTopValue),
    xDirection: getRandomInt(2) === 2 ? "left" : "right",
    yDirection: "bot",
  };

  glad.element.classList.add(
    glad.xDirection === "left" ? "left-rotate" : "right-rotate"
  );

  glad.element.style.height = headHeight + "px";
  glad.element.style.width = headWidth + "px";
  glad.element.style.left = glad.left + "px";
  glad.element.style.top = glad.rigth + "px";

  glads.push(glad);

  contentElement.append(glad.element);
};

// Listen for clicks
document.addEventListener("click", clickHandler);

// Calculate glads positions
setInterval(() => {
  glads.forEach((glad) => {
    const leftCord = getPosValue(glad.element.style.left);
    const topCord = getPosValue(glad.element.style.top);

    // Calculate topPos
    if (topCord <= maxTopValue && topCord >= 0) {
      // If bot direction
      if (glad.yDirection === "bot") {
        if (topCord + fallSpeed > maxTopValue) {
          glad.element.style.top = maxTopValue + "px";
          glad.yDirection = "top";
        } else {
          glad.element.style.top = topCord + fallSpeed + "px";
        }
      }

      // If top direction
      if (glad.yDirection === "top") {
        if (topCord - fallSpeed < 0) {
          glad.element.style.top = 0 + "px";
          glad.yDirection = "bot";
        } else {
          glad.element.style.top = topCord - fallSpeed + "px";
        }
      }
    }

    // Calculate leftPos
    if (leftCord <= maxLeftValue && leftCord >= 0) {
      // If right direction
      if (glad.xDirection === "right") {
        if (leftCord + sideSpeed > maxLeftValue) {
          glad.element.style.left = maxLeftValue + "px";
          glad.xDirection = "left";
          glad.element.classList.remove("right-rotate");
          glad.element.classList.add("left-rotate");
        } else {
          if (topCord < maxTopValue) {
            glad.element.style.left = leftCord + sideSpeed + "px";
          }
        }
      }
    }

    // If left direction
    if (glad.xDirection === "left") {
      if (leftCord - sideSpeed < 0) {
        glad.element.style.left = 0 + "px";
        glad.xDirection = "right";
        glad.element.classList.remove("left-rotate");
        glad.element.classList.add("right-rotate");
      } else {
        if (topCord < maxTopValue) {
          glad.element.style.left = leftCord - sideSpeed + "px";
        }
      }
    }
  });
}, posCalcInterval);
