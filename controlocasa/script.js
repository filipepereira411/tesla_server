let currentStream = null;
let useFrontCamera = true;

function startTesla() {
    document.getElementById('initOverlay').style.display = 'none';
    
    // Inicia a câmara do dispositivo
    initDeviceCamera();

    // Atualização do Relógio Superior
    setInterval(() => {
        const now = new Date();
        document.getElementById('teslaClock').innerText = now.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
    }, 1000);
}

// Configura e liga a câmara local (do portátil ou telemóvel)
async function initDeviceCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    const video = document.getElementById('cameraView');
    const mode = useFrontCamera ? "user" : "environment";

    try {
        currentStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: mode },
            audio: false
        });
        video.srcObject = currentStream;

        if (useFrontCamera) {
            video.classList.add('mirror');
        } else {
            video.classList.remove('mirror');
        }
    } catch (err) {
        console.error("Erro ao aceder à câmara:", err);
        alert("Certifica-te de que permitiste o acesso à câmara no browser.");
    }
}

// Alterna entre a câmara frontal e traseira
async function switchCamera() {
    useFrontCamera = !useFrontCamera;
    await initDeviceCamera();
}

// Tira fotografia a partir do fluxo de vídeo local
function capturePhoto() {
    const video = document.getElementById('cameraView');
    const canvas = document.getElementById('captureCanvas');
    const flash = document.getElementById('flash');
    const context = canvas.getContext('2d');

    if (!video.srcObject) return;

    flash.classList.add('active');
    setTimeout(() => flash.classList.remove('active'), 300);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (useFrontCamera) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');

    const downloadLink = document.createElement('a');
    downloadLink.download = 'TESLA_CAPTURE_' + Date.now() + '.png';
    downloadLink.href = imageData;
    downloadLink.click();
}
