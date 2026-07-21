import sys
import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

start_marker = '// --- HOLOGRAPHIC DECK (TESTIMONIALS) ---'
end_marker = 'window.closeOv = function() {'
start_idx = js.find(start_marker)
end_idx = js.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_js = '''// --- PROCESS CASE STUDY CARDS ---
const processCards = document.querySelectorAll('.process-card');
processCards.forEach(card => {
    card.addEventListener('click', () => {
        processCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
    // Also handle mouse tracking for glow
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ${e.clientX - r.left}px);
        card.style.setProperty('--my', ${e.clientY - r.top}px);
    });
});

// --- HOLOGRAPHIC DECK (TESTIMONIALS) ---
const deckCards = document.querySelectorAll('.deck-card');
let currentCard = 0;
function updateDeck() {
    deckCards.forEach((card, index) => {
        card.className = 'deck-card';
        if (index === currentCard) card.classList.add('active');
        else if (index === (currentCard + 1) % deckCards.length) card.classList.add('next-1');
        else if (index === (currentCard + 2) % deckCards.length) card.classList.add('next-2');
        else card.classList.add('next-hidden');
    });
}
const nextBtn = document.getElementById('deck-next');
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        deckCards[currentCard].classList.replace('active', 'swiped');
        currentCard = (currentCard + 1) % deckCards.length;
        setTimeout(updateDeck, 100);
    });
    updateDeck();
}
deckCards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('active')) {
            card.classList.replace('active', 'swiped');
            currentCard = (currentCard + 1) % deckCards.length;
            setTimeout(updateDeck, 100);
        }
    });
});

// --- DECRYPTION TERMINAL (FAQ) ---
const terminalLines = document.querySelectorAll('.terminal-line');
const cipherChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>{}[]";
terminalLines.forEach(line => {
    const prompt = line.querySelector('.terminal-prompt');
    const response = line.querySelector('.terminal-response');
    if (!prompt || !response) return;
    const originalText = response.textContent;
    
    prompt.addEventListener('click', () => {
        const wasActive = line.classList.contains('active');
        // Close all
        terminalLines.forEach(l => l.classList.remove('active'));
        
        if (!wasActive) {
            line.classList.add('active');
            // Decrypt animation
            let iteration = 0;
            const interval = setInterval(() => {
                response.textContent = originalText.split('').map((char, idx) => {
                    if (idx < iteration || char == ' ') return originalText[idx];
                    return cipherChars[Math.floor(Math.random() * cipherChars.length)];
                }).join('');
                if (iteration >= originalText.length) {
                    clearInterval(interval);
                    response.textContent = originalText;
                }
                iteration += 3;
            }, 15);
        }
    });
});

'''
    js = js[:start_idx] + new_js + js[end_idx:]

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('Updated script.js')
