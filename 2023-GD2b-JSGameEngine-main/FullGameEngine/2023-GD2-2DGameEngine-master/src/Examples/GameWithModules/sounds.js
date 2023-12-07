class Sound {
  constructor() {
    this.sounds = {};
    this.loadSounds();
    this.bgMusicPlaying = false; 
    this.bgMusic = null; // add this line to store the Audio object for background music
  }

  loadSounds() {
    // Load all the sound files into the sounds object
    this.sounds["collect"] = new Audio("./resources/collect.wav");
    this.sounds["gameover"] = new Audio("gameover.wav");
    // Add more sound files as needed
  }

  play(soundName) {
    // Play the sound with the given name
    if (this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0;
      this.sounds[soundName].play();
    }
  }

  playBackgroundMusic() {
    this.bgMusic = new Audio("./resources/background_music.mp3");
    this.bgMusic.loop = true;
    this.bgMusic.play();
    this.bgMusicPlaying = true;
  }

  stopBackgroundMusic() {
    if (this.bgMusicPlaying) { // check if background music is playing
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
      this.bgMusicPlaying = false;
    }
  }
}

export default Sound;
