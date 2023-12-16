// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: new Audio(), // The file path of the jump sound.
  jumpPad: new Audio(), // The file path of the jump pad sound.
  Slippery: new Audio(), // The file path of the slippery surface sound.
  FinishGame: new Audio(), // The file path of the finish game sound.
  Collect: new Audio(), // The file path of the collect sound.
  GameOver: new Audio(), // The file path of the game over sound.
};

// Set the source of the jump sound.
AudioFiles.jump.src = './resources/Audio/PlayerJump.mp3'; // Update the audio file path
// Set the source of the jump pad sound.
AudioFiles.jumpPad.src = './resources/Audio/JumpPad.mp3'; // Update the audio file path
// Set the source of the slippery surface sound.
AudioFiles.Slippery.src = './resources/Audio/SlipperySurface.mp3'; // Update the audio file path
//Set the source of the finish game sound.
AudioFiles.FinishGame.src = './resources/Audio/Victory.mp3'; // Update the audio file path
// Set the source of the collect sound.
AudioFiles.Collect.src = './resources/Audio/Collect.mp3'; // Update the audio file path
// Set the source of the game over sound.
AudioFiles.GameOver.src = './resources/Audio/GameOver.mp3'; // Update the audio file path
// Set the source of the player image.
Images.player.src = './resources/images/player/player.png'; // Update the image path

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/enemy.png'; // Update the image path

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles};
