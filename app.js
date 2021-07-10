import { startVisualiser } from './modules/visualisers.mjs';
import { toggleMediaMenu } from './modules/animations.mjs';
import { displayMedia } from './modules/toggleFunctions.mjs';
import { loader } from './modules/loader.mjs';
// const startBtn = document.querySelector('.launch-wrapper');
const startBtn = document.querySelector('#spoilt-bratz-play-btn');
const backBtn = document.querySelector('#t-back-btn');
const sections = document.querySelectorAll('.section');
const mediaMenu = document.querySelector('#menu');
let menuStatus = false;
const mediaDisplays = document.querySelectorAll('.media-container');
// mediaDisplays.forEach((display) => {
// 	display.addEventListener('click', () => {
// 		console.log(this);
// 	});
// });

const turnTableBtn = document.querySelector('#display-record');
const discBtn = document.querySelector('#dislpay-cd');
const cassetteBtn = document.querySelector('#display-cassette');

const musicContainer = document.getElementById('music-container');
const recordContainer = document.querySelector('.record');
const lpContainer = document.querySelector('.lp-table');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const tapeTitle = document.querySelector('.tape-title');
const cover = document.getElementById('cover');
const covers = document.querySelectorAll('.cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const curTime = document.querySelector('#current-time');
const songTime = document.querySelector('#song-time');
const progressBar = document.querySelector('#progress');

// Song titles
// const songs = [
// 	'04 Discotheque Wreck',
// 	'08 Dog Chewed the Handle',
// 	'09 Rock Radio',
// 	'14 When I Die',
// ];
const songs = [
	'01 (Not So) Hot',
	'02 You Talk Too Much',
	'03 I Could Die',
	"04 She's A Drag",
	'01 Sex Doll Love Cramp',
	'02 Going Down Again',
	'03 Stuck In A Rut',
	"04 Crawlin' On Broken Glass",
];
// Keep track of song
let songIndex = 7;

// window.addEventListener('load', loader);

// Initially load song details into DOM
loadSong(songs[songIndex]);

// EVENT LISTENERS
startBtn.addEventListener('click', () => {
	// display now playing section
	document.querySelector('.landing').classList.remove('section-active');
	document.querySelector('.now-playing').classList.add('section-active');
	playMusic();
});
backBtn.addEventListener('click', () => {
	// show landing page
	document.querySelector('.now-playing').classList.remove('section-active');
	document.querySelector('.landing').classList.add('section-active');
	// pauseSong();
});
// Event listeners
playBtn.addEventListener('click', playMusic);
// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
// Song ends
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', getSongDuration);
audio.addEventListener('timeupdate', getCurrentTime);
audio.addEventListener('timeupdate', updateProgressBar);

mediaMenu.addEventListener('click', () => {
	menuStatus = toggleMediaMenu(menuStatus);
});

const mediaToDisplay = document.querySelectorAll('#media-menu li');
mediaToDisplay.forEach((media) => {
	// console.log(media);
	// console.log(media.id);
	media.addEventListener('click', () => {
		displayMedia(media.id);
	});
});

// turnTableBtn.addEventListener(){
// 	toggleMediaMenu(menuStatus)
// 	menuStatus = false;
// 	// run record
// }
// discBtn.addEventListener(){
// 	toggleMediaMenu(menuStatus)
// 	menuStatus = false;
// 	// run cd
// }
// cassetteBtn.addEventListener(){
// 	toggleMediaMenu(menuStatus)
// 	menuStatus = false;
// 	//run cassette
// }

function playMusic() {
	const isPlaying = recordContainer.classList.contains('play');
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
}
// Play song
function playSong() {
	recordContainer.classList.add('play');
	lpContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	audio.play();
	// start visualiser?
	console.log(audio);
	startVisualiser(audio);
}
// Update song details
function loadSong(song) {
	const songTitle = song.replace(/\d+/g, '');
	title.innerText = songTitle;
	tapeTitle.innerText = songTitle;
	audio.src = `./music/${song}.mp3`;
	// cover.src = `./images/${song}.jpg`;
	covers.forEach((cover) => {
		cover.src = `./images/${song}.jpg`;
	});
}
// Pause song
function pauseSong() {
	recordContainer.classList.remove('play');
	lpContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	audio.pause();
}
// Previous song
function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}
// Next song
function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}
//get song duration
function getSongDuration(e) {
	console.log(e.srcElement.duration);
	const durInSecs = Math.round(e.srcElement.duration);
	let secs = (durInSecs % 60).toString();
	secs < 10 ? (secs = secs.padStart(2, '0')) : secs;
	console.log(secs);
	let mins = Math.floor(durInSecs / 60).toString();
	mins < 10 ? (mins = mins.padStart(2, '0')) : mins;
	console.log(mins);
	songTime.innerHTML = `${mins}:${secs}`;
	// mins || secs === NaN
	// 	? (songTime.innerHTML = '')
	// 	: (songTime.innerHTML = `${mins}:${secs}`);
	// mins || secs != NaN
	// 	? (songTime.innerHTML = `${mins}:${secs}`)
	// 	: (songTime.innerHTML = '');
}
//get current time
function getCurrentTime(e) {
	const durInSecs = Math.round(e.srcElement.currentTime);
	// console.log(currentTime);
	let secs = (durInSecs % 60).toString();
	secs < 10 ? (secs = secs.padStart(2, '0')) : secs;
	let mins = Math.floor(durInSecs / 60).toString();
	mins < 10 ? (mins = mins.padStart(2, '0')) : mins;
	curTime.innerHTML = `${mins}:${secs}`;
}
// update progress bar
function updateProgressBar(e) {
	const { currentTime, duration } = e.srcElement;
	let percentPlayed = Math.round((currentTime / duration) * 100);
	console.log(percentPlayed);
	progressBar.style.width = `${percentPlayed}%`;
}

//get duration & currentTime for Time of song
// function DurTime(e) {
// 	console.log(e);
// 	const { duration, currentTime } = e.srcElement;
// 	console.log(duration, currentTime);
// 	let sec;
// 	var sec_d;

// 	// define minutes currentTime
// 	let min = currentTime == null ? 0 : Math.floor(currentTime / 60);
// 	min = min < 10 ? '0' + min : min;

// 	// define seconds currentTime
// 	function get_sec(x) {
// 		if (Math.floor(x) >= 60) {
// 			for (var i = 1; i <= 60; i++) {
// 				if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
// 					sec = Math.floor(x) - 60 * i;
// 					sec = sec < 10 ? '0' + sec : sec;
// 				}
// 			}
// 		} else {
// 			sec = Math.floor(x);
// 			sec = sec < 10 ? '0' + sec : sec;
// 		}
// 		console.log(x);
// 	}

// 	get_sec(currentTime, sec);

// 	// change currentTime DOM
// 	curTime.innerHML = min + ':' + sec;

// 	// define minutes duration
// 	let min_d = isNaN(duration) === true ? '0' : Math.floor(duration / 60);
// 	min_d = min_d < 10 ? '0' + min_d : min_d;
// 	console.log(min_d);

// 	function get_sec_d(x) {
// 		if (Math.floor(x) >= 60) {
// 			for (var i = 1; i <= 60; i++) {
// 				if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
// 					sec_d = Math.floor(x) - 60 * i;
// 					sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
// 				}
// 			}
// 		} else {
// 			sec_d = isNaN(duration) === true ? '0' : Math.floor(x);
// 			sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
// 		}
// 	}

// 	// define seconds duration

// 	get_sec_d(duration);

// 	// change duration DOM
// 	durTime.innerHTML = min_d + ':' + sec_d;
// }

// Time of song
// audio.addEventListener('timeupdate', DurTime);

// Update progress bar
// function updateProgress(e) {
// 	const { duration, currentTime } = e.srcElement;
// 	const progressPercent = (currentTime / duration) * 100;
// 	progress.style.width = `${progressPercent}%`;
// }

// // Set progress bar
// function setProgress(e) {
// 	const width = this.clientWidth;
// 	const clickX = e.offsetX;
// 	const duration = audio.duration;

// 	audio.currentTime = (clickX / width) * duration;
// }

// //get duration & currentTime for Time of song
// function DurTime(e) {
// 	const { duration, currentTime } = e.srcElement;
// 	var sec;
// 	var sec_d;

// 	// define minutes currentTime
// 	let min = currentTime == null ? 0 : Math.floor(currentTime / 60);
// 	min = min < 10 ? '0' + min : min;

// 	// define seconds currentTime
// 	function get_sec(x) {
// 		if (Math.floor(x) >= 60) {
// 			for (var i = 1; i <= 60; i++) {
// 				if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
// 					sec = Math.floor(x) - 60 * i;
// 					sec = sec < 10 ? '0' + sec : sec;
// 				}
// 			}
// 		} else {
// 			sec = Math.floor(x);
// 			sec = sec < 10 ? '0' + sec : sec;
// 		}
// 	}

// 	get_sec(currentTime, sec);

// 	// change currentTime DOM
// 	currTime.innerHTML = min + ':' + sec;

// 	// define minutes duration
// 	let min_d = isNaN(duration) === true ? '0' : Math.floor(duration / 60);
// 	min_d = min_d < 10 ? '0' + min_d : min_d;

// 	function get_sec_d(x) {
// 		if (Math.floor(x) >= 60) {
// 			for (var i = 1; i <= 60; i++) {
// 				if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
// 					sec_d = Math.floor(x) - 60 * i;
// 					sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
// 				}
// 			}
// 		} else {
// 			sec_d = isNaN(duration) === true ? '0' : Math.floor(x);
// 			sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
// 		}
// 	}

// 	// define seconds duration

// 	get_sec_d(duration);

// 	// change duration DOM
// 	durTime.innerHTML = min_d + ':' + sec_d;
// }

// Time/song update
// audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
// progressContainer.addEventListener('click', setProgress);

// Time of song
// audio.addEventListener('timeupdate', DurTime);
