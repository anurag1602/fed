// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("previous");

let songs = [
  { songName: "On & On", filePath: "1.mp3", coverPath: "a1.jpg" },
  { songName: "Invincible", filePath: "2.mp3", coverPath: "a2.jpg" },
  { songName: "Mortals", filePath: "3.mp3", coverPath: "a3.jpg" },
  { songName: "Shine", filePath: "4.mp3", coverPath: "a4.jpg" },
  { songName: "Why We Lose", filePath: "5.mp3", coverPath: "a5.jpg" },
  { songName: "Sky High", filePath: "6.mp3", coverPath: "a6.jpg" },
  { songName: "Symbolism", filePath: "7.mp3", coverPath: "a7.jpg" },
  { songName: "Heroes Tonight", filePath: "8.mp3", coverPath: "a8.jpg" },
  { songName: "Feel Good", filePath: "9.mp3", coverPath: "a9.jpg" },
  { songName: "My Heart", filePath: "10.mp3", coverPath: "a10.jpg" },
  
];

// Function to play the next song
const playNextSong = () => {
  if (songIndex < songs.length - 1) {
    songIndex++;
    playSong();
  } else {
    songIndex = 0; // Loop back to the first song
    playSong();
  }
};

// Function to play the previous song
const playPreviousSong = () => {
  // Added this function
  if (songIndex > 0) {
    songIndex--;
    playSong(); // Added this line to play the previous song
  } else {
    songIndex = songs.length - 1; // Loop back to the last song
    playSong(); // Added this line to play the last song
  }
};

// Function to play a specific song
const playSong = () => {
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
};

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong();
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

// Listen to the 'ended' event for playing the next song
audioElement.addEventListener("ended", playNextSong);

// ... (your existing event listeners)
nextButton.addEventListener("click", playNextSong);
prevButton.addEventListener("click", playPreviousSong);

// Function to initialize song items
const initializeSongItems = () => {
  songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element
      .getElementsByClassName("songItemPlay")[0]
      .addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = i;
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        playSong();
      });
  });
};

// Function to make all plays inactive
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

// Initialize song items
initializeSongItems();
