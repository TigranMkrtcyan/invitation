let animitems = document.querySelectorAll('._anim-items')
const timerContainer = document.getElementById('timerContainer');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let isPlaying = false

if (animitems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll(params) {
        for (let i = 0; i < animitems.length; i++) {
            const animitem = animitems[i]
            const animitemHeight = animitem.offsetHeight
            const animitemOffset = offset(animitem).top
            const animStart = 1;

            let animitemPoint = window.innerHeight - animitemHeight / animStart;

            if (animitemHeight > window.innerHeight) {
                animitemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animitemOffset - animitemPoint) && pageYOffset < (animitemOffset + animitemHeight)) {
                animitem.classList.add("active")
            } else {
                animitem.classList.remove("active")
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageXOffset || document.documentElement.scrollTop
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

}

let $calendar = document.querySelector('#calendar')
let days = ['ԵՐԿ', 'ԵՐՔ', 'ՉՐՔ', 'ՀՆԳ', 'ՈՒՐԲ', 'ՇԲԹ', 'ԿԻՐ']

days.forEach(el => {
    let day = document.createElement('div')

    day.textContent = el
    day.className = 'name'
    $calendar.appendChild(day)
})

for (let i = 1; i < 37; i++) {
    let day = document.createElement('div')
    let dayNum = i - 6
    let isEmpty = dayNum < 1

    day.className = 'block' + (isEmpty ? ' empty' : '')
    day.textContent = isEmpty ? '' : dayNum
    $calendar.appendChild(day)
}

let blocks = document.querySelectorAll('.block');

blocks.forEach(block => {
    if (block.textContent.trim() === "22") {
        const heart = document.createElement("div");
        heart.className = "hearth";
        heart.style.backgroundImage = 'url("heart.png")';
        heart.style.width = '90px';
        heart.style.height = '90px';
        heart.style.backgroundSize = 'contain';
        heart.style.backgroundRepeat = 'no-repeat';
        block.style.position = "relative";
        block.appendChild(heart);
    }
});

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}

disableScroll();

setTimeout(enableScroll, 5000);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}


window.addEventListener('DOMContentLoaded', function () {
    const audioElement = document.getElementById('audioElement');
    const audiobtn = document.getElementById('audiobtnRef');

    audiobtn.addEventListener('click', function () {
        console.log('Audio button clicked');
        if (audioElement.paused) {
            audioElement.play();
            audiobtn.textContent = '■';
        } else {
            audioElement.pause();
            audiobtn.textContent = '▶';
        }
    });

    audiobtn.style.cursor = 'pointer';
    audiobtn.style.zIndex = '1000';
});


const targetDate = new Date('2025-06-22T00:00:00');

function calculateTimeLeft() {
    const difference = targetDate - new Date();
    if (difference <= 0) return null;

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

function updateTimer() {
    const timeLeft = calculateTimeLeft();

    if (!timeLeft) {
        timerContainer.innerHTML = '<div style="font-size: 24px; color: red;">Time over</div>';
        return;
    }

    daysElement.textContent = String(timeLeft.days).padStart(2, '0');
    hoursElement.textContent = String(timeLeft.hours).padStart(2, '0');
    minutesElement.textContent = String(timeLeft.minutes).padStart(2, '0');
    secondsElement.textContent = String(timeLeft.seconds).padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer(); 
