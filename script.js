const BACKGROUNDS = [
    { id: 'sunset', name: 'Sunset', class: 'bg-sunset' },
    { id: 'ocean', name: 'Ocean', class: 'bg-ocean' },
    { id: 'emerald', name: 'Emerald', class: 'bg-emerald' },
    { id: 'midnight', name: 'Midnight', class: 'bg-midnight' },
    { id: 'candy', name: 'Candy', class: 'bg-candy' },
    { id: 'dark', name: 'Dark', class: 'bg-dark' },
    { id: 'light', name: 'Light', class: 'bg-light' },
    { id: 'mesh', name: 'Mesh', class: 'bg-mesh' },
];

// State
let currentText = `// Your beautiful code or quote here

const greet = () => {
  console.log("Hello World!");
};`;
let currentBg = BACKGROUNDS[0];
let currentFont = 'mono';
let currentPadding = 48;
let currentRadius = 16;
let currentRatio = 'auto';

// Elements
const textInput = document.getElementById('textInput');
const snippetText = document.getElementById('snippetText');
const bgGrid = document.getElementById('bgGrid');
const captureArea = document.getElementById('captureArea');
const snippetCard = document.getElementById('snippetCard');
const paddingInput = document.getElementById('paddingInput');
const paddingVal = document.getElementById('paddingVal');
const radiusInput = document.getElementById('radiusInput');
const radiusVal = document.getElementById('radiusVal');
const exportBtn = document.getElementById('exportBtn');
const copyImageBtn = document.getElementById('copyImageBtn');
const copyTextBtn = document.getElementById('copyTextBtn');
const fontButtons = document.querySelectorAll('#fontToggle .toggle-btn');
const ratioButtons = document.querySelectorAll('#ratioToggle .toggle-btn');

// Initialize Lucide
lucide.createIcons();

// Initialize Backgrounds
BACKGROUNDS.forEach(bg => {
    const btn = document.createElement('button');
    btn.className = `bg-btn ${bg.class} ${bg.id === currentBg.id ? 'active' : ''}`;
    btn.title = bg.name;
    btn.onclick = () => {
        document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        captureArea.className = `capture-area ${bg.class}`;
        currentBg = bg;
    };
    bgGrid.appendChild(btn);
});

// Event Listeners
textInput.addEventListener('input', (e) => {
    currentText = e.target.value;
    snippetText.textContent = currentText || 'Type something...';
});

paddingInput.addEventListener('input', (e) => {
    currentPadding = e.target.value;
    paddingVal.textContent = `${currentPadding}px`;
    captureArea.style.padding = `${currentPadding}px`;
});

radiusInput.addEventListener('input', (e) => {
    currentRadius = e.target.value;
    radiusVal.textContent = `${currentRadius}px`;
    snippetCard.style.borderRadius = `${currentRadius}px`;
});

fontButtons.forEach(btn => {
    btn.onclick = () => {
        fontButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFont = btn.dataset.font;
        snippetText.className = `font-${currentFont}`;
    };
});

ratioButtons.forEach(btn => {
    btn.onclick = () => {
        ratioButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRatio = btn.dataset.ratio;
        
        if (currentRatio === 'auto') {
            captureArea.style.aspectRatio = 'auto';
            captureArea.style.width = 'auto';
        } else {
            captureArea.style.aspectRatio = currentRatio.replace(':', '/');
            captureArea.style.width = '600px';
        }
    };
});

// Actions
exportBtn.onclick = async () => {
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Exporting...';
    lucide.createIcons();
    
    try {
        const dataUrl = await htmlToImage.toPng(captureArea, { pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = `snippetcraft-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Export failed', err);
    } finally {
        exportBtn.innerHTML = originalText;
        lucide.createIcons();
    }
};

copyImageBtn.onclick = async () => {
    const originalText = copyImageBtn.innerHTML;
    copyImageBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Copying...';
    lucide.createIcons();

    try {
        const dataUrl = await htmlToImage.toPng(captureArea, { pixelRatio: 2 });
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
        ]);
        
        copyImageBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
        setTimeout(() => {
            copyImageBtn.innerHTML = originalText;
            lucide.createIcons();
        }, 2000);
    } catch (err) {
        console.error('Copy image failed', err);
        copyImageBtn.innerHTML = originalText;
        lucide.createIcons();
    }
};

copyTextBtn.onclick = () => {
    navigator.clipboard.writeText(currentText);
    const originalText = copyTextBtn.innerHTML;
    copyTextBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
    setTimeout(() => {
        copyTextBtn.innerHTML = originalText;
        lucide.createIcons();
    }, 2000);
};

// Add CSS for spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

