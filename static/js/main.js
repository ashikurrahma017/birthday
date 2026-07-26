// Main JS
/*===========================================================
    PROJECT STARLIGHT
    main.js
===========================================================*/

"use strict";

/*===========================================================
    ELEMENTS
===========================================================*/

const loader = document.getElementById("loader");

const progressBar = document.getElementById("scroll-progress");

const backToTop = document.getElementById("backToTop");

const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");

const navLinks = document.querySelectorAll("nav a,#mobileMenu a");

const envelope = document.getElementById("envelope");

const letterPaper = document.getElementById("letter-paper");

const galleryItems = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

const flame = document.getElementById("flame");

const blowBtn = document.getElementById("blowCandle");

const confettiContainer = document.getElementById("confetti-container");

const readLetterBtn = document.getElementById("readLetterBtn");

const nextAfterLetter = document.getElementById("nextAfterLetter");

const nextAfterMemories =
document.getElementById("nextAfterMemories");

const nextAfterGallery =
document.getElementById("nextAfterGallery");

const nextAfterCake =
document.getElementById("nextAfterCake");

const beginJourney = document.getElementById("beginJourney");

const revealItems = document.querySelectorAll(

".about-card,.memory-card,.gallery-item,.wish-card,.message-box"

);



/*===========================================================
    LOADER
===========================================================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loader.style.opacity="0";

        loader.style.visibility="hidden";

        loader.style.pointerEvents="none";

    },1200);

});



/*===========================================================
    SMOOTH SCROLL
===========================================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",e=>{

        const href=link.getAttribute("href");

        if(!href.startsWith("#")) return;

        e.preventDefault();

        const target=document.querySelector(href);

        if(target){

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

        mobileMenu.classList.remove("show");

    });

});



/*===========================================================
    MOBILE MENU
===========================================================*/

menuBtn.addEventListener("click",()=>{

    mobileMenu.classList.toggle("show");

});

document.addEventListener("click",(e)=>{

    if(

        !mobileMenu.contains(e.target)

        &&

        !menuBtn.contains(e.target)

    ){

        mobileMenu.classList.remove("show");

    }

});



/*===========================================================
    SCROLL PROGRESS
===========================================================*/

window.addEventListener("scroll",()=>{

    const total=document.documentElement.scrollHeight

                -window.innerHeight;

    const current=window.scrollY;

    const percent=(current/total)*100;

    progressBar.style.width=percent+"%";

});



/*===========================================================
    BACK TO TOP
===========================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*===========================================================
    BEGIN JOURNEY
===========================================================*/

beginJourney.addEventListener("click", () => {

    const about = document.getElementById("about");

    about.classList.add("show");

    about.scrollIntoView({

        behavior:"smooth"

    });

    setTimeout(()=>{

        readLetterBtn.classList.add("show");

    },2500);

});

readLetterBtn.addEventListener("click",()=>{

    const letter=document.getElementById("letter");

    letter.classList.add("show");

    letter.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

});
/*===========================================================
    LETTER
===========================================================*/

let opened=false;

envelope.addEventListener("click",()=>{

    if(opened) return;

    opened=true;

    envelope.classList.add("opened");

    letterPaper.classList.add("show");

    letterPaper.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

    // Show the next button after the letter opens
    setTimeout(()=>{

        nextAfterLetter.classList.add("show");

    },2000);

});
nextAfterLetter.addEventListener("click",()=>{

    const memories=document.getElementById("memories");

    memories.classList.add("show");

    memories.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

    // Show the button after reaching Memories
    setTimeout(()=>{

        nextAfterMemories.classList.add("show");

    },1500);

});

nextAfterMemories.addEventListener("click",()=>{

    const gallery=document.getElementById("gallery");

    gallery.classList.add("show");

    gallery.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

    setTimeout(()=>{

        nextAfterGallery.classList.add("show");

    },1500);

});
nextAfterGallery.addEventListener("click",()=>{

    const music = document.getElementById("music");
    music.classList.add("show");

    setTimeout(() => {

        const cake = document.getElementById("cake");
        cake.classList.add("show");

        cake.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    }, 300);

});

    // Start the birthday song
    const birthdayMusic = document.getElementById("birthdayMusic");

    if (birthdayMusic.paused) {

        birthdayMusic.play().catch(err => console.log(err));

    }

});
/*===========================================================
    LIGHTBOX
===========================================================*/

galleryItems.forEach(image=>{

    image.addEventListener("click",()=>{

        lightbox.classList.add("active");

        lightboxImage.src=image.src;

        document.body.style.overflow="hidden";

    });

});

closeLightbox.addEventListener("click",closeGallery);

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeGallery();

    }

});

function closeGallery(){

    lightbox.classList.remove("active");

    document.body.style.overflow="";

}
/*===========================================================
    CANDLE
===========================================================*/

/*===========================================================
    CINEMATIC CANDLE EXPERIENCE
===========================================================*/

let candleBlown = false;

const birthdayMusic = document.getElementById("birthdayMusic");

blowBtn.addEventListener("click", () => {

    if (candleBlown) return;

    candleBlown = true;

    blowBtn.disabled = true;

    blowBtn.innerHTML = "🌬️ Blowing...";

    /* Flicker */

    flame.classList.add("flicker");

    setTimeout(() => {

        flame.classList.remove("flicker");

        flame.classList.add("off");

        createSmoke();

        createConfetti(120);

        document.body.classList.add("wish-mode");

        if (birthdayMusic) {

            birthdayMusic.volume = 0.3;

        }

        if (typeof launchFireworks === "function") {

            setTimeout(() => {

                launchFireworks();

            },1000);

        }

        showWishMessage();

    },500);

});
/*===========================================================
    SMOKE EFFECT
===========================================================*/

function createSmoke(){

    const cake=document.querySelector(".cake");

    for(let i=0;i<3;i++){

        const smoke=document.createElement("div");

        smoke.className="smoke";

        smoke.style.left=(48+i*8)+"%";

        smoke.style.animationDelay=(i*0.3)+"s";

        cake.appendChild(smoke);

        setTimeout(()=>{

            smoke.remove();

        },3500);

    }

}



/*===========================================================
    WISH MESSAGE
===========================================================*/

function showWishMessage(){

    const box=document.createElement("div");

    box.className="wish-popup";

    box.innerHTML=`

        <h2>✨ Make A Wish ✨</h2>

        <p>

            Close your eyes...

            Make a wish...

        </p>

    `;

    document.body.appendChild(box);

    setTimeout(()=>{

        box.classList.add("show");

    },100);

    setTimeout(()=>{

        box.classList.remove("show");

    },3500);

 setTimeout(()=>{

    box.remove();

    document.body.classList.remove("wish-mode");

    if(birthdayMusic){

        birthdayMusic.volume=1;

    }

    blowBtn.innerHTML="✨ Wish Made ✨";

    blowBtn.classList.add("wish-complete");

    // Show the next button
   nextAfterCake.style.display = "inline-flex";

},4500);
   nextAfterCake.addEventListener("click",()=>{

    const gift=document.getElementById("gift");

    gift.classList.add("show");

    gift.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}); 
}



/*===========================================================
    GIFT BOX
===========================================================*/

const giftBox = document.getElementById("giftBox");
const giftMessage = document.getElementById("giftMessage");
const lid = document.querySelector(".gift-lid");
const giftCards = document.querySelectorAll(".gift-card");

if (giftBox) {
    giftBox.addEventListener("click", () => {

        giftBox.classList.add("shake");

        setTimeout(() => {
            giftBox.classList.add("glow");
        }, 600);

        setTimeout(() => {
            if (lid) lid.classList.add("open");
        }, 1200);

        setTimeout(() => {
            giftCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add("show");
                }, index * 350);
            });
        }, 1700);

        setTimeout(() => {
            if (giftMessage) {
                giftMessage.classList.add("show");
            }
        }, 3400);

    });
}
/*===========================================================
    SCROLL REVEAL
===========================================================*/

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15

});

revealItems.forEach(item => {

    item.classList.add("reveal");

    observer.observe(item);

});



/*===========================================================
    KEYBOARD SHORTCUTS
===========================================================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeGallery();

        mobileMenu.classList.remove("show");

    }

    if (e.key === "Home") {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

});



/*===========================================================
    FIREWORK BUTTON
===========================================================*/

const fireworksBtn = document.getElementById("fireworksBtn");

if (fireworksBtn) {

    fireworksBtn.addEventListener("click", () => {

        if (typeof launchFireworks === "function") {

            launchFireworks();

        }

        createConfetti(200);

    });

}



/*===========================================================
    CONFETTI
===========================================================*/



function createConfetti(total = 100) {

    for (let i = 0; i < total; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.top = "-20px";

        piece.style.background = `hsl(${Math.random()*360},100%,60%)`;

        piece.style.animationDelay = (Math.random() * 2) + "s";

        piece.style.animationDuration = (3 + Math.random() * 3) + "s";

        confettiContainer.appendChild(piece);

        piece.addEventListener("animationend", () => {

            piece.remove();

        });

    }

}



/*===========================================================
    HERO BUTTON RIPPLE
===========================================================*/

document.querySelectorAll(".hero-btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";

        ripple.style.top = (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        ripple.addEventListener("animationend", () => {

            ripple.remove();

        });

    });

});
/*===========================================================
    NAVBAR SCROLL EFFECT
===========================================================*/

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/*===========================================================
    FLOATING HEARTS
===========================================================*/

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart-burst";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.top = "100%";

    heart.style.fontSize = (18 + Math.random() * 18) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 1200);

}

setInterval(createHeart, 3500);



/*===========================================================
    BALLOON CLICK
===========================================================*/

document.querySelectorAll(".balloon").forEach(balloon => {

    balloon.addEventListener("click", () => {

        balloon.style.transition = "transform .4s ease, opacity .4s ease";

        balloon.style.transform = "scale(1.4)";

        balloon.style.opacity = "0";

        createConfetti(20);

        setTimeout(() => {

            balloon.style.transform = "";

            balloon.style.opacity = "";

        }, 2500);

    });

});



/*===========================================================
    RANDOM STAR TWINKLE
===========================================================*/

const stars = document.getElementById("stars");

function generateStars(total = 150) {

    if (!stars) return;

    stars.innerHTML = "";

    for (let i = 0; i < total; i++) {

        const star = document.createElement("span");

        star.className = "star";

        star.style.left = Math.random() * 100 + "%";

        star.style.top = Math.random() * 100 + "%";

        const size = Math.random() * 3 + 1;

        star.style.width = size + "px";

        star.style.height = size + "px";

        star.style.animationDelay = Math.random() * 5 + "s";

        star.style.animationDuration =

            (2 + Math.random() * 4) + "s";

        stars.appendChild(star);

    }

}

generateStars();



/*===========================================================
    SHOOTING STARS
===========================================================*/

const shootingContainer =

document.getElementById("shooting-stars");

function shootingStar() {

    if (!shootingContainer) return;

    const star = document.createElement("div");

    star.className = "shooting-star";

    star.style.left =

        Math.random() * window.innerWidth + "px";

    star.style.top =

        Math.random() * 250 + "px";

    shootingContainer.appendChild(star);

    setTimeout(() => {

        star.remove();

    }, 3000);

}

setInterval(shootingStar, 6000);



/*===========================================================
    WINDOW RESIZE
===========================================================*/

window.addEventListener("resize", () => {

    generateStars();

});



/*===========================================================
    PAGE VISIBILITY
===========================================================*/

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        document.body.classList.add("paused");

    } else {

        document.body.classList.remove("paused");

    }

});



/*===========================================================
    SECTION HIGHLIGHT
===========================================================*/

const sections = document.querySelectorAll("section");

const menuLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (window.scrollY >= top) {

            current = section.id;

        }

    });

    menuLinks.forEach(link => {

        link.classList.remove("active");

        if (

            link.getAttribute("href") === "#" + current

        ) {

            link.classList.add("active");

        }

    });

});
/*===========================================================
    UTILITIES
===========================================================*/

function debounce(func, delay = 200) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {

            func.apply(this, args);

        }, delay);

    };

}

function throttle(func, limit = 100) {

    let waiting = false;

    return function (...args) {

        if (waiting) return;

        func.apply(this, args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

}



/*===========================================================
    RANDOM FLOATING PARTICLES
===========================================================*/

function createParticle() {

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.bottom = "-20px";

    particle.style.width = (4 + Math.random() * 8) + "px";

    particle.style.height = particle.style.width;

    particle.style.background =

        `hsl(${Math.random()*360},100%,75%)`;

    document.body.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, 10000);

}

setInterval(createParticle, 1200);



/*===========================================================
    CELEBRATION AUTO EFFECT
===========================================================*/

function startCelebration() {

    createConfetti(80);

    if (typeof launchFireworks === "function") {

        launchFireworks();

    }

}

setTimeout(startCelebration, 2500);



/*===========================================================
    DOUBLE CLICK HERO
===========================================================*/

const hero = document.getElementById("hero");

hero.addEventListener("dblclick", () => {

    createConfetti(150);

    if (typeof launchFireworks === "function") {

        launchFireworks();

    }

});



/*===========================================================
    SCROLL PERFORMANCE
===========================================================*/

window.addEventListener(

    "scroll",

    throttle(() => {

        // reserved for future animations

    }, 50)

);



/*===========================================================
    PRELOAD GALLERY IMAGES
===========================================================*/

galleryItems.forEach(img => {

    const preload = new Image();

    preload.src = img.src;

});



/*===========================================================
    IMAGE DRAG PREVENTION
===========================================================*/

document.querySelectorAll("img").forEach(img => {

    img.setAttribute("draggable", "false");

});



/*===========================================================
    RIGHT CLICK DISABLE (OPTIONAL)
===========================================================*/

document.addEventListener("contextmenu", e => {

    e.preventDefault();

});



/*===========================================================
    SELECT TEXT PREVENTION
===========================================================*/

document.addEventListener("selectstart", e => {

    if (

        e.target.tagName !== "INPUT" &&

        e.target.tagName !== "TEXTAREA"

    ) {

        e.preventDefault();

    }

});



/*===========================================================
    WINDOW FOCUS
===========================================================*/

window.addEventListener("focus", () => {

    document.body.classList.remove("paused");

});

window.addEventListener("blur", () => {

    document.body.classList.add("paused");

});



/*===========================================================
    INITIALIZATION
===========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    generateStars();

    giftMessage.style.display = "none";

    progressBar.style.width = "0%";

    document.body.classList.remove("paused");

});



/*===========================================================
    CONSOLE MESSAGE
===========================================================*/

console.log(

`✨
Project Starlight

Made with ❤️
Flask + HTML + CSS + JavaScript

Have a magical birthday!
✨`
);



/*===========================================================
    END OF MAIN.JS
===========================================================*/
