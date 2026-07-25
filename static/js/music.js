// Music JS
/*===========================================================
    PROJECT STARLIGHT
    music.js
===========================================================*/

"use strict";

/*===========================================================
    ELEMENTS
===========================================================*/

const audio = document.getElementById("birthdayMusic");

const playBtn = document.getElementById("playBtn");

const pauseBtn = document.getElementById("pauseBtn");

const album = document.querySelector(".album");

const musicSection = document.getElementById("music");



/*===========================================================
    SETTINGS
===========================================================*/

audio.volume = 0.7;

audio.preload = "auto";

let userStarted = false;



/*===========================================================
    PLAY MUSIC
===========================================================*/

function playMusic(){

    audio.play()

    .then(()=>{

        album.classList.add("playing");

        playBtn.style.display="none";

        pauseBtn.style.display="inline-flex";

        userStarted=true;

    })

    .catch(err=>{

        console.log(err);

    });

}



/*===========================================================
    PAUSE MUSIC
===========================================================*/

function pauseMusic(){

    audio.pause();

    album.classList.remove("playing");

    playBtn.style.display="inline-flex";

    pauseBtn.style.display="none";

}



/*===========================================================
    BUTTON EVENTS
===========================================================*/

playBtn.addEventListener("click",playMusic);

pauseBtn.addEventListener("click",pauseMusic);



/*===========================================================
    SONG FINISHED
===========================================================*/

audio.addEventListener("ended",()=>{

    album.classList.remove("playing");

    playBtn.style.display="inline-flex";

    pauseBtn.style.display="none";

});
/*===========================================================
    CREATE PROGRESS BAR
===========================================================*/

const controls = document.querySelector(".music-controls");

const progressWrapper = document.createElement("div");
progressWrapper.className = "music-progress";

const progress = document.createElement("div");
progress.className = "music-progress-fill";

progressWrapper.appendChild(progress);

musicSection.appendChild(progressWrapper);



/*===========================================================
    TIME DISPLAY
===========================================================*/

const timeDisplay = document.createElement("p");

timeDisplay.className = "music-time";

timeDisplay.innerHTML = "00:00 / 00:00";

musicSection.appendChild(timeDisplay);



/*===========================================================
    FORMAT TIME
===========================================================*/

function formatTime(seconds){

    if(isNaN(seconds)) return "00:00";

    const min = Math.floor(seconds/60);

    const sec = Math.floor(seconds%60);

    return String(min).padStart(2,"0") + ":" +

           String(sec).padStart(2,"0");

}



/*===========================================================
    UPDATE PROGRESS
===========================================================*/

audio.addEventListener("timeupdate",()=>{

    if(!audio.duration) return;

    const percent=(audio.currentTime/audio.duration)*100;

    progress.style.width=percent+"%";

    timeDisplay.innerHTML=

        formatTime(audio.currentTime)

        +

        " / "

        +

        formatTime(audio.duration);

});



/*===========================================================
    SEEK BAR
===========================================================*/

progressWrapper.addEventListener("click",(e)=>{

    const rect=progressWrapper.getBoundingClientRect();

    const x=e.clientX-rect.left;

    const percent=x/rect.width;

    audio.currentTime=percent*audio.duration;

});



/*===========================================================
    VOLUME SLIDER
===========================================================*/

const volume=document.createElement("input");

volume.type="range";

volume.min=0;

volume.max=1;

volume.step=0.01;

volume.value=audio.volume;

volume.className="volume-slider";

controls.appendChild(volume);

volume.addEventListener("input",()=>{

    audio.volume=volume.value;

});



/*===========================================================
    AUTO PLAY
===========================================================*/

function autoPlay(){

    if(userStarted) return;

    playMusic();

    window.removeEventListener("click",autoPlay);

    window.removeEventListener("touchstart",autoPlay);

}

window.addEventListener("click",autoPlay,{once:true});

window.addEventListener("touchstart",autoPlay,{once:true});



/*===========================================================
    AUDIO FADE IN
===========================================================*/

function fadeIn(){

    audio.volume=0;

    playMusic();

    let volumeLevel=0;

    const fade=setInterval(()=>{

        volumeLevel+=0.05;

        if(volumeLevel>=0.7){

            volumeLevel=0.7;

            clearInterval(fade);

        }

        audio.volume=volumeLevel;

        volume.value=volumeLevel;

    },100);

}



/*===========================================================
    AUDIO FADE OUT
===========================================================*/

function fadeOut(){

    let volumeLevel=audio.volume;

    const fade=setInterval(()=>{

        volumeLevel-=0.05;

        if(volumeLevel<=0){

            volumeLevel=0;

            clearInterval(fade);

            pauseMusic();

        }

        audio.volume=volumeLevel;

        volume.value=volumeLevel;

    },100);

}



/*===========================================================
    DOUBLE CLICK ALBUM
===========================================================*/

album.addEventListener("dblclick",()=>{

    if(audio.paused){

        fadeIn();

    }

    else{

        fadeOut();

    }

});



/*===========================================================
    LOOP
===========================================================*/

audio.loop=true;



/*===========================================================
    KEYBOARD
===========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(audio.paused){

            playMusic();

        }

        else{

            pauseMusic();

        }

    }

    if(e.key==="ArrowUp"){

        audio.volume=Math.min(audio.volume+0.05,1);

        volume.value=audio.volume;

    }

    if(e.key==="ArrowDown"){

        audio.volume=Math.max(audio.volume-0.05,0);

        volume.value=audio.volume;

    }

});



/*===========================================================
    PAGE VISIBILITY
===========================================================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        if(!audio.paused){

            audio.pause();

        }

    }

});



/*===========================================================
    INITIALIZE
===========================================================*/

pauseBtn.style.display="none";

progress.style.width="0%";



/*===========================================================
    END OF MUSIC.JS
===========================================================*/