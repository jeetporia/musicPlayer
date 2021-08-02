const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('Artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music

const songs = [
    {
        name : 'jacinto-1',
        displayName : 'Electric Chill Machine',
        artist : 'Jacinto Design',
    },
    {
        name : 'jacinto-2',
        displayName : 'Seven Nation Army',
        artist : 'Jacinto Design',
    },
    {
        name : 'jacinto-3',
        displayName : 'Good Night Disco Queen',
        artist : 'Jacinto Design',
    },
    {
        name : 'metric-1',
        displayName : 'Front Row (Remix)',
        artist : 'Metric/ Jacinto Design',
    },
];

// playing or not need to check using boolean;
let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play-circle','fa-pause-circle');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
    playBtn.setAttribute('title', 'play');
    music.pause();
}
//  Play or pause event

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// update the DOM to load song
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song;
let songIndex = 0;

function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// select first song on load
 
loadSong(songs[songIndex]);

// update the Progress bar with time
function updateProgressBar(e) {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // update progressbar
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`

        // calculate duration
        const durationMinutes = Math.floor(duration/ 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        //  To avoid the NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}: ${durationSeconds}`
        }
        
        // current Time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }   
}

// Next and Previous button
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);