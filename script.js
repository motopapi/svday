const scratchCard = document.getElementById('scratch');
const canvas = scratchCard.querySelector('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = scratchCard.offsetWidth;
    canvas.height = scratchCard.offsetHeight;
    drawOverlay();
}

function drawOverlay() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d8302b';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Pasame el dedo 🫦', canvas.width / 2, canvas.height / 2);
}

let isDrawing = false;

function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;
    return {
        x: (x - rect.left) / rect.width * canvas.width,
        y: (y - rect.top) / rect.height * canvas.height
    };
}

function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fill();
}

function startScratch(e) {
    e.preventDefault();
    isDrawing = true;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
}

function moveScratch(e) {
    e.preventDefault();
    if (!isDrawing) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
}

function stopScratch() {
    isDrawing = false;
}

canvas.addEventListener('mousedown', startScratch);
canvas.addEventListener('mousemove', moveScratch);
canvas.addEventListener('mouseup', stopScratch);
canvas.addEventListener('mouseleave', stopScratch);
canvas.addEventListener('touchstart', startScratch);
canvas.addEventListener('touchmove', moveScratch);
canvas.addEventListener('touchend', stopScratch);
canvas.addEventListener('touchcancel', stopScratch);

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
