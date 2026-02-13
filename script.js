// Confetti / Heart Rain Effect
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: -10,
        size: Math.random() * 15 + 8, // Smaller hearts: 8px to 23px
        speed: Math.random() * 1.5 + 0.5, // Slower: 0.5 to 2 speed
        color: `rgba(255, 20, 147, ${Math.random() * 0.3 + 0.1})`, // More subtle opacity
        rotation: Math.random() * 360,
        oscillation: Math.random() * 0.02 + 0.01
    };
}

function drawHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fewer hearts for a cleaner look
    if (hearts.length < 25) {
        hearts.push(createHeart());
    }

    for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        ctx.fillStyle = h.color;
        ctx.font = `${h.size}px serif`;
        ctx.fillText('❤', h.x, h.y); // Solid heart glyph

        h.y += h.speed;
        // Smoother sway logic
        h.x += Math.sin(h.y * h.oscillation);

        if (h.y > canvas.height) {
            hearts.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(drawHearts);
}

drawHearts();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Countdown Timer
// START DATE: Change this to your anniversary date!
const startDate = new Date('2024-05-10T00:00:00');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}

setInterval(updateCounter, 1000);
updateCounter(); // Initial call

// Music Control
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<ion-icon name="musical-notes-outline"></ion-icon> Play Music';
    } else {
        bgMusic.play().catch(e => alert("Please interact with the document first or add a valid audio source!"));
        musicBtn.innerHTML = '<ion-icon name="pause-outline"></ion-icon> Pause Music';
    }
    isPlaying = !isPlaying;
});

// Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
