// Particles JS
/*===========================================================
    PROJECT STARLIGHT
    particles.js
===========================================================*/

"use strict";

/*===========================================================
    CANVAS
===========================================================*/

const canvas = document.getElementById("fireworksCanvas");

const ctx = canvas.getContext("2d");

let fireworks = [];

let particles = [];



/*===========================================================
    RESIZE
===========================================================*/

function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);



/*===========================================================
    FIREWORK CLASS
===========================================================*/

class Firework{

    constructor(x,y){

        this.x = x;

        this.y = canvas.height;

        this.targetY = y;

        this.speed = 7;

        this.exploded = false;

    }

    update(){

        this.y -= this.speed;

        if(this.y <= this.targetY){

            this.exploded = true;

            explode(this.x,this.y);

        }

    }

    draw(){

        ctx.beginPath();

        ctx.arc(this.x,this.y,3,0,Math.PI*2);

        ctx.fillStyle="white";

        ctx.fill();

    }

}



/*===========================================================
    PARTICLE CLASS
===========================================================*/

class Particle{

    constructor(x,y,color){

        this.x=x;

        this.y=y;

        this.color=color;

        this.life=100;

        this.velocity={

            x:(Math.random()-0.5)*8,

            y:(Math.random()-0.5)*8

        };

    }

    update(){

        this.x+=this.velocity.x;

        this.y+=this.velocity.y;

        this.velocity.y+=0.05;

        this.life--;

    }

    draw(){

        ctx.globalAlpha=this.life/100;

        ctx.beginPath();

        ctx.arc(this.x,this.y,2,0,Math.PI*2);

        ctx.fillStyle=this.color;

        ctx.fill();

        ctx.globalAlpha=1;

    }

}



/*===========================================================
    EXPLOSION
===========================================================*/

function explode(x,y){

    const colors=[

        "#ff4d6d",

        "#ffd166",

        "#00e5ff",

        "#7b5dff",

        "#7dff7d",

        "#ffffff"

    ];

    for(let i=0;i<80;i++){

        particles.push(

            new Particle(

                x,

                y,

                colors[Math.floor(Math.random()*colors.length)]

            )

        );

    }

}



/*===========================================================
    CREATE FIREWORK
===========================================================*/

function createFirework(){

    fireworks.push(

        new Firework(

            Math.random()*canvas.width,

            Math.random()*canvas.height/2

        )

    );

}



/*===========================================================
    PUBLIC FUNCTION
===========================================================*/

function launchFireworks(){

    for(let i=0;i<6;i++){

        setTimeout(createFirework,i*250);

    }

}

window.launchFireworks = launchFireworks;
/*===========================================================
    ANIMATION LOOP
===========================================================*/

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    fireworks = fireworks.filter(firework=>{

        firework.update();

        firework.draw();

        return !firework.exploded;

    });

    particles = particles.filter(particle=>{

        particle.update();

        particle.draw();

        return particle.life > 0;

    });

    requestAnimationFrame(animate);

}

animate();



/*===========================================================
    AUTO FIREWORKS
===========================================================*/

setInterval(()=>{

    if(document.hidden) return;

    createFirework();

},3500);



/*===========================================================
    SHOOTING STAR
===========================================================*/

const shootingLayer = document.getElementById("shooting-stars");

function createShootingStar(){

    if(!shootingLayer) return;

    const star=document.createElement("div");

    star.className="shooting-star";

    star.style.left=Math.random()*window.innerWidth+"px";

    star.style.top=Math.random()*250+"px";

    shootingLayer.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },3000);

}

setInterval(()=>{

    if(!document.hidden){

        createShootingStar();

    }

},6000);



/*===========================================================
    FLOATING PARTICLES
===========================================================*/

function createFloatingParticle(){

    const particle=document.createElement("div");

    particle.className="particle";

    particle.style.left=Math.random()*100+"%";

    particle.style.bottom="-20px";

    const size=4+Math.random()*6;

    particle.style.width=size+"px";

    particle.style.height=size+"px";

    particle.style.background=

        `hsl(${Math.random()*360},100%,75%)`;

    document.body.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },10000);

}

setInterval(()=>{

    if(!document.hidden){

        createFloatingParticle();

    }

},1200);



/*===========================================================
    TWINKLING STARS
===========================================================*/

const starsLayer=document.getElementById("stars");

function createStars(total=150){

    if(!starsLayer) return;

    starsLayer.innerHTML="";

    for(let i=0;i<total;i++){

        const star=document.createElement("span");

        star.className="star";

        star.style.left=Math.random()*100+"%";

        star.style.top=Math.random()*100+"%";

        const size=Math.random()*3+1;

        star.style.width=size+"px";

        star.style.height=size+"px";

        star.style.animationDelay=Math.random()*5+"s";

        star.style.animationDuration=

            (2+Math.random()*4)+"s";

        starsLayer.appendChild(star);

    }

}

createStars();



/*===========================================================
    CLICK FIREWORK
===========================================================*/

canvas.addEventListener("click",(e)=>{

    explode(e.clientX,e.clientY);

});



/*===========================================================
    DOUBLE CLICK CELEBRATION
===========================================================*/

canvas.addEventListener("dblclick",()=>{

    launchFireworks();

});



/*===========================================================
    RESIZE HANDLER
===========================================================*/

window.addEventListener("resize",()=>{

    resizeCanvas();

    createStars();

});



/*===========================================================
    VISIBILITY
===========================================================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        ctx.clearRect(0,0,canvas.width,canvas.height);

    }

});



/*===========================================================
    STARTUP
===========================================================*/

setTimeout(()=>{

    launchFireworks();

},1500);



/*===========================================================
    CONSOLE MESSAGE
===========================================================*/

console.log(
`✨ Project Starlight Particles Loaded ✨`
);



/*===========================================================
    END OF PARTICLES.JS
===========================================================*/