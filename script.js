
//OR

// songs.forEach(song => {
//   song.addEventListener('click', function(){
//     songs.forEach(s => {
//       s.classList.remove('active')
//     })
//     song.classList.add('active')
//   })
// })

//web audio api / visualizer variables 
const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
const audioElement = document.querySelector('audio');
const canvasElement = document.querySelector('#canvas');
const canvasCtx = canvasElement.getContext('2d');
//variables for custom play and volume icons
const playPauseButton = document.querySelector('.play-pause');

audioElement.src = "./audiofiles/sik.mp3";

const pauseIcon = `<span class="material-icons">
<i class="uil uil-pause"></i>
</span>`;

const playIcon = `<span class="material-icons">
<i class="uil uil-play"></i>
</span>`;

const WIDTH = canvasElement.clientWidth;
const HEIGHT = canvasElement.clientHeight;

let audioState = {
  isPaused: true,
};

playPauseButton.addEventListener('click', togglePlayPause);

const source = audioCtx.createMediaElementSource(audioElement);
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 512;
source.connect(analyser);
analyser.connect(audioCtx.destination);
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw(){
  analyser.getByteFrequencyData(dataArray);
  const barWidth = (WIDTH / bufferLength) * 3.5;
  let barHeight;
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  let x = 0;

  for(let i = 0; i < bufferLength; i++){
    barHeight = dataArray[i] / 0.6;
    //visual bars color below
    canvasCtx.fillStyle = '#13DA00';
    canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    x += barWidth + 0.5;
  }
  requestAnimationFrame(draw);
}
draw();

function togglePlayPause() {
  audioCtx.resume().then(() => {
    if(audioState.isPaused){
      playPauseButton.innerHTML = pauseIcon;
      audioElement.play();
    }
    else{
      playPauseButton.innerHTML = playIcon;
      audioElement.pause();
    }
    audioState.isPaused = !audioState.isPaused;
  })
}



function changeSong(e){
  
  let title = e.target.innerText;
  console.log(title)
  // audioElement.src = title;

  // if(audioState.isPaused){
  //     togglePlayPause();
  // } else{
  //     audioElement.play();
  // }

}

const songs = [...document.querySelectorAll('.song')];
console.log(songs)

songs.forEach(song => {
  song.addEventListener('click', function(e){
    songs.forEach(s => s.classList.remove('active'));
    song.classList.add('active');
    let title = e.target.innerText;
    console.log(title);
    
  })
})
