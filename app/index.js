import gladPng from "./public/glad.png";
import song from "./public/song.mp3";
import "./index.css";

const contentElement = document.getElementById("content");

let isPlaying = false;

const init = async () => {
  if (!isPlaying) {
    const music = document.createElement("audio");
    music.src = song;
    music.autoplay = true;

    isPlaying = true;

    contentElement.append(music);
  }

  const gladHead = document.createElement("img");
  gladHead.className = "glad-head";
  gladHead.src = gladPng;

  contentElement.append(gladHead);
};

document.addEventListener("click", init);
