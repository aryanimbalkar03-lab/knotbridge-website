/* ══════════════════════════════════════════
   TECHBRIDGE v3 — Full Dark Immersive JS
   Three.js Constellation · 3D Tilt Cards
   Micro-economics Scoring · Radar Chart
   ══════════════════════════════════════════ */

// ─── 1. PRELOADER ───
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('done');
        setTimeout(heroEntry, 600);
    }, 1800);
});

// ─── 2. SCROLL PROGRESS ───
const scrollProg = document.getElementById('scroll-prog');
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollProg) scrollProg.style.width = (winScroll / height) * 100 + "%";
});

// ─── 3. CURSOR ───
const cur = document.getElementById('cur');
const ring = document.getElementById('ring');
let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cur) cur.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
});

(function animRing() {
    rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
    if (ring) ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, select, input, .magnetic, .b-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cur?.classList.add('h'); ring?.classList.add('h'); });
    el.addEventListener('mouseleave', () => { cur?.classList.remove('h'); ring?.classList.remove('h'); });
});

// ─── 4. THREE.JS CONSTELLATION BRIDGE ───
(function initScene() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const W = window.innerWidth, H = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 500);
    camera.position.set(0, 3, 22);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050E09, 1);

    // Glow texture
    const gc = document.createElement('canvas'); gc.width = gc.height = 64;
    const gctx = gc.getContext('2d');
    const grad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(74,222,128,1)'); grad.addColorStop(0.3, 'rgba(74,222,128,0.7)');
    grad.addColorStop(0.6, 'rgba(34,197,94,0.3)'); grad.addColorStop(1, 'rgba(34,197,94,0)');
    gctx.fillStyle = grad; gctx.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(gc);

    // Nodes
    const nodeCount = 120;
    const nodes = [];
    // Bridge Arch
    for (let i = 0; i < 70; i++) {
        const t = i / 70;
        const x = (t * 2 - 1) * 16;
        const y = Math.sin(t * Math.PI) * 7.5 + (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 6;
        nodes.push({ pos: new THREE.Vector3(x, y, z), orig: new THREE.Vector3(x, y, z) });
    }
    // Ambient
    for (let i = 0; i < nodeCount - 70; i++) {
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 15;
        nodes.push({ pos: new THREE.Vector3(x, y, z), orig: new THREE.Vector3(x, y, z) });
    }

    const nodeMat = new THREE.PointsMaterial({
        size: 0.25, map: glowTex, transparent: true, blending: THREE.AdditiveBlending,
        depthWrite: false, color: 0x4ADE80, opacity: 0.9, sizeAttenuation: true
    });
    const nodeGeo = new THREE.BufferGeometry();
    const nPos = new Float32Array(nodeCount * 3);
    nodes.forEach((n, i) => { nPos[i * 3] = n.pos.x; nPos[i * 3 + 1] = n.pos.y; nPos[i * 3 + 2] = n.pos.z; });
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nPos, 3));
    scene.add(new THREE.Points(nodeGeo, nodeMat));

    // Lines
    const linePositions = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (nodes[i].orig.distanceTo(nodes[j].orig) < 5.5) {
                linePositions.push(nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z);
                linePositions.push(nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z);
            }
        }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x4ADE80, transparent: true, opacity: 0.15 });
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    // Particles
    const bgCount = 2000;
    const bgGeo = new THREE.BufferGeometry();
    const bgArr = new Float32Array(bgCount * 3);
    const bgOrig = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
        bgArr[i * 3] = bgOrig[i * 3] = (Math.random() - 0.5) * 55;
        bgArr[i * 3 + 1] = bgOrig[i * 3 + 1] = (Math.random() - 0.5) * 28;
        bgArr[i * 3 + 2] = bgOrig[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgArr, 3));
    const bgMat = new THREE.PointsMaterial({
        size: 0.08, map: glowTex, transparent: true, blending: THREE.AdditiveBlending,
        depthWrite: false, color: 0x22C55E, opacity: 0.35, sizeAttenuation: true
    });
    scene.add(new THREE.Points(bgGeo, bgMat));

    // Mouse Tracking for Camera
    let tmx = 0, tmy = 0, cmx = 0, cmy = 0;
    document.addEventListener('mousemove', e => {
        tmx = (e.clientX / window.innerWidth - 0.5) * 2;
        tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();
    function tick() {
        requestAnimationFrame(tick);
        const t = clock.getElapsedTime();
        cmx += (tmx - cmx) * 0.05; cmy += (tmy - cmy) * 0.05;

        // Breathe nodes
        const nArr = nodeGeo.attributes.position.array;
        for (let i = 0; i < nodeCount; i++) {
            const o = nodes[i].orig;
            nArr[i * 3] = o.x + Math.sin(t * 0.4 + i * 0.1) * 0.25;
            nArr[i * 3 + 1] = o.y + Math.sin(t * 0.5 + i * 0.15) * 0.2;
            nArr[i * 3 + 2] = o.z + Math.cos(t * 0.3 + i * 0.1) * 0.2;
        }
        nodeGeo.attributes.position.needsUpdate = true;

        // Update lines
        const lArr = lineGeo.attributes.position.array;
        let li = 0;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (nodes[i].orig.distanceTo(nodes[j].orig) < 5.5) {
                    lArr[li++] = nArr[i * 3]; lArr[li++] = nArr[i * 3 + 1]; lArr[li++] = nArr[i * 3 + 2];
                    lArr[li++] = nArr[j * 3]; lArr[li++] = nArr[j * 3 + 1]; lArr[li++] = nArr[j * 3 + 2];
                }
            }
        }
        lineGeo.attributes.position.needsUpdate = true;

        // Drift bg
        const ba = bgGeo.attributes.position.array;
        for (let i = 0; i < bgCount; i++) {
            ba[i * 3 + 1] = bgOrig[i * 3 + 1] + Math.sin(t * 0.3 + i * 0.05) * 0.4;
        }
        bgGeo.attributes.position.needsUpdate = true;

        // Camera
        camera.position.x = cmx * 2.5;
        camera.position.y = 3 - cmy * 1.5;
        camera.lookAt(0, 2, 0);

        lineMesh.rotation.y = t * 0.02;

        renderer.render(scene, camera);
    }
    tick();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

// ─── 5. HERO ENTRY ───
function heroEntry() {
    const title = document.getElementById('hero-title');
    if (title) {
        const txt = title.textContent.trim();
        title.innerHTML = '';
        txt.split('').forEach((c, i) => {
            const s = document.createElement('span');
            s.className = 'ch';
            s.textContent = c === ' ' ? '\u00A0' : c;
            s.style.transitionDelay = `${0.2 + i * 0.05}s`;
            title.appendChild(s);
        });
        requestAnimationFrame(() => title.classList.add('go'));
    }
    document.querySelectorAll('.anim, .anim-s').forEach(el => el.classList.add('go'));
}

// ─── 6. NAVBAR SCROLL ───
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav?.classList.toggle('solid', window.scrollY > 80));

// ─── 7. MOBILE MENU ───
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    drawer?.classList.toggle('open');
    document.body.style.overflow = drawer?.classList.contains('open') ? 'hidden' : '';
});
drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger?.classList.remove('open'); drawer?.classList.remove('open');
    document.body.style.overflow = '';
}));

// ─── 8. SCROLL REVEALS ───
const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); revObs.unobserve(e.target); } });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.rv').forEach(el => revObs.observe(el));

// ─── 9. STAT COUNTERS ───
const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.st-n').forEach(n => {
            const to = +n.dataset.to, dur = 2000, start = Date.now();
            (function up() {
                const p = Math.min((Date.now() - start) / dur, 1);
                const ease = 1 - Math.pow(1 - p, 4);
                n.textContent = Math.floor(ease * to);
                if (p < 1) requestAnimationFrame(up); else n.textContent = to;
            })();
        });
        statObs.unobserve(e.target);
    });
}, { threshold: 0.3 });
const statsEl = document.getElementById('stats');
if (statsEl) statObs.observe(statsEl);

// ─── 10. SMOOTH ANCHORS ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ─── 11. MAGNETIC BUTTONS ───
document.querySelectorAll('.magnetic').forEach(b => {
    b.addEventListener('mousemove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.15}px, ${(e.clientY - r.top - r.height / 2) * 0.15}px)`;
    });
    b.addEventListener('mouseleave', () => b.style.transform = '');
});

// ─── 12. 3D CARD TILT & GLASS HIGHLIGHT ───
document.querySelectorAll('.tilt-card, .glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        
        if (card.classList.contains('tilt-card')) {
            const cx = r.width / 2;
            const cy = r.height / 2;
            const tiltX = ((y - cy) / cy) * -5;
            const tiltY = ((x - cx) / cx) * 5;
            card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
    });
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('tilt-card')) card.style.transform = '';
    });
});

// ─── 13. WIZARD NAVIGATION ───
let currentStep = 1;
const wizSteps = document.querySelectorAll('.wp');
const wizPanels = document.querySelectorAll('.panel');
const wizFill = document.getElementById('wfill');

function goStep(n) {
    const currentPanel = document.querySelector(`.panel[data-p="${currentStep}"]`);
    const fields = currentPanel?.querySelectorAll('select[required], input[required]');
    let valid = true;
    fields?.forEach(f => {
        if (!f.value) { f.style.borderColor = '#EF4444'; valid = false; }
        else f.style.borderColor = '';
    });
    if (!valid && n > currentStep) return;

    currentStep = n;
    wizPanels.forEach(p => p.classList.toggle('active', +p.dataset.p === n));
    wizSteps.forEach(s => {
        const sn = +s.dataset.s;
        s.classList.toggle('active', sn === n);
        s.classList.toggle('done', sn < n);
    });
    wizFill.style.width = `${(n / 3) * 100}%`;
    document.querySelector('.wiz')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.querySelectorAll('.wnext').forEach(b => b.addEventListener('click', () => goStep(+b.dataset.next)));
document.querySelectorAll('.wprev').forEach(b => b.addEventListener('click', () => goStep(+b.dataset.prev)));

const repeatSlider = document.getElementById('w-repeat');
const repeatVal = document.getElementById('rval');
repeatSlider?.addEventListener('input', () => repeatVal.textContent = repeatSlider.value);

// ─── 14. ASSESSMENT ALGORITHM ───
document.getElementById('wiz-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const p3 = document.querySelector('.panel[data-p="3"]');
    const fields = p3?.querySelectorAll('select[required]');
    let valid = true;
    fields?.forEach(f => {
        if (!f.value) { f.style.borderColor = '#EF4444'; valid = false; }
        else f.style.borderColor = '';
    });
    if (!valid) return;
    computeScore();
});

function computeScore() {
    const v = [
        document.getElementById('w-industry').value, document.getElementById('w-years').value,
        document.getElementById('w-emp').value, document.getElementById('w-rev').value,
        document.getElementById('w-pos').value, document.getElementById('w-orders').value,
        document.getElementById('w-inventory').value, document.getElementById('w-tools').value,
        document.getElementById('w-finance').value, document.getElementById('w-profit').value,
        document.getElementById('w-website').value, document.getElementById('w-social').value,
        document.getElementById('w-custdata').value, document.getElementById('w-cac').value,
        +document.getElementById('w-repeat').value, document.getElementById('w-challenge').value,
        document.getElementById('w-goal').value
    ];
    const _0x1a={'manual':2,'basic-pos':8,'cloud-pos':18,'integrated':25};
    const _0x1b={'walkin':2,'phone':6,'aggregator':14,'own-system':20,'multi':25};
    const _0x1c={'none':2,'basic':6,'some':14,'suite':25};
    const _0x1d={'memory':2,'diary':6,'spreadsheet':12,'accounting':20,'integrated':25};
    const dO = Math.round(((_0x1a[v[4]]||5)+(_0x1b[v[5]]||5)+(_0x1c[v[7]]||5)+(_0x1d[v[8]]||5))/4);

    const _0x2a={'dont':2,'phone-contacts':6,'spreadsheet':14,'crm':25};
    const _0x2b={'no':2,'rough':8,'track':18,'optimize':25};
    const _0x2c={'no':3,'roughly':12,'detailed':25};
    const rS = v[14]<20?5:v[14]<40?10:v[14]<60?15:v[14]<80?20:25;
    const cI = Math.round(((_0x2a[v[12]]||5)+(_0x2b[v[13]]||5)+rS+(_0x2c[v[9]]||5))/4);

    const _0x3a={'dont':2,'manual':5,'spreadsheet':12,'software':20,'automated':25};
    const dM = Math.round(((_0x3a[v[6]]||5)+(_0x1d[v[8]]||5)+(_0x2c[v[9]]||5)+(_0x1c[v[7]]||5))/4);

    const _0x4a={'none':2,'basic':8,'pro':18,'ecom':25};
    const _0x4b={'none':2,'inactive':6,'active':16,'paid':25};
    const _0x4c={'maintain':5,'10-25':12,'25-50':18,'50+':23,'expand':25};
    const _0x4d={'qsr':4,'salon':4,'retail':3,'manufacturing':5,'logistics':5,'healthcare':3,'education':2,'realestate':3,'professional':2,'other':3};
    const gR = Math.round(((_0x4a[v[10]]||5)+(_0x4b[v[11]]||5)+(_0x4c[v[16]]||5)+(_0x4d[v[0]]||3)*2.5)/4);

    const nS = 100 - (dO + cI + dM + gR);

    showResult(nS, {
        'Digital Operations': 25 - dO,
        'Customer Intelligence': 25 - cI,
        'Data Maturity': 25 - dM,
        'Growth Readiness': 25 - gR
    });
}

function showResult(score, breakdown) {
    const wrap = document.getElementById('result');
    wrap.classList.remove('hidden');
    wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const circ = 2 * Math.PI * 58;
    const prog = document.getElementById('rprog');
    setTimeout(() => prog.style.strokeDashoffset = circ - (score / 100) * circ, 300);

    const numEl = document.getElementById('snum');
    const start = Date.now(), dur = 1500;
    (function animN() {
        const p = Math.min((Date.now() - start) / dur, 1);
        numEl.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * score);
        if (p < 1) requestAnimationFrame(animN); else numEl.textContent = score;
    })();

    const title = document.getElementById('vtitle');
    const desc = document.getElementById('vdesc');
    if (score >= 60) {
        title.innerHTML = 'Yes — Your Business <span style="color:#4ADE80">Urgently Needs</span> Tech Blending';
        desc.textContent = `With a transformation need of ${score}%, your business has major untapped potential. You're leaving growth on the table by relying on manual processes. We can digitize operations and automate workflows.`;
    } else if (score >= 40) {
        title.innerHTML = 'Your Business Would <span style="color:#4ADE80">Significantly Benefit</span>';
        desc.textContent = `At ${score}% need, you have solid foundations but clear gaps. Strategic tech investments in your weakest areas could unlock 2-3x efficiency gains.`;
    } else {
        title.innerHTML = 'Your Business Is Fairly Tech-Ready';
        desc.textContent = `With only ${score}% transformation need, your tech stack is in good shape. Consider advanced optimizations like AI-powered analytics or expanding digital channels.`;
    }

    const bdEl = document.getElementById('bd');
    bdEl.innerHTML = '';
    Object.entries(breakdown).forEach(([label, val]) => {
        const pct = Math.round((val / 25) * 100);
        bdEl.innerHTML += `<div class="bd-i"><div class="bl">${label}</div><div class="bb"><div class="bf" style="width:0"></div></div><div class="bv">${pct}%</div></div>`;
    });
    setTimeout(() => {
        bdEl.querySelectorAll('.bf').forEach((bar, i) => {
            const pct = Object.values(breakdown)[i] / 25 * 100;
            setTimeout(() => bar.style.width = `${pct}%`, i * 150);
        });
    }, 500);

    drawRadar(breakdown);
}

// ─── 15. RADAR CHART ───
function drawRadar(scores) {
    const svg = document.getElementById('radar');
    const cx = 150, cy = 150, r = 100;
    const labels = Object.keys(scores);
    const vals = Object.values(scores).map(v => v / 25);
    const n = labels.length;
    let html = '';

    [0.25, 0.5, 0.75, 1].forEach(s => {
        const pts = [];
        for (let i = 0; i < n; i++) {
            const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
            pts.push(`${cx + Math.cos(angle) * r * s},${cy + Math.sin(angle) * r * s}`);
        }
        html += `<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(74,222,128,.1)" stroke-width="1"/>`;
    });

    for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const ex = cx + Math.cos(angle) * r;
        const ey = cy + Math.sin(angle) * r;
        html += `<line x1="${cx}" y1="${cy}" x2="${ex}" y2="${ey}" stroke="rgba(74,222,128,.15)" stroke-width="1"/>`;
        
        const lx = cx + Math.cos(angle) * (r + 20);
        const ly = cy + Math.sin(angle) * (r + 20);
        const anchor = Math.abs(Math.cos(angle)) < 0.01 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
        const shortLabel = labels[i].replace('Customer Intelligence', 'Customer Intel').replace('Digital Operations', 'Digital Ops').replace('Growth Readiness', 'Growth Ready');
        html += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle" fill="rgba(255,255,255,.6)" font-size="11" font-weight="500" font-family="Inter">${shortLabel}</text>`;
    }

    const dataPts = [];
    for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        dataPts.push(`${cx + Math.cos(angle) * r * vals[i]},${cy + Math.sin(angle) * r * vals[i]}`);
    }
    html += `<polygon points="${dataPts.join(' ')}" fill="rgba(74,222,128,.15)" stroke="#4ADE80" stroke-width="2"/>`;

    for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const dx = cx + Math.cos(angle) * r * vals[i];
        const dy = cy + Math.sin(angle) * r * vals[i];
        html += `<circle cx="${dx}" cy="${dy}" r="4" fill="#4ADE80"/>`;
    }

    svg.innerHTML = html;
}

// ─── 16. RESET WIZARD ───
window.resetWiz = function() {
    document.getElementById('result').classList.add('hidden');
    document.getElementById('rprog').style.strokeDashoffset = 364.42;
    document.getElementById('wiz-form').reset();
    document.getElementById('rval').textContent = '40';
    currentStep = 1;
    goStep(1);
    document.getElementById('assess').scrollIntoView({ behavior: 'smooth' });
}

// ─── 17. BOOKING FORM & HONEYPOT ───
document.getElementById('book-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const ogText = btn.textContent;
    btn.textContent = 'Sending...';

    // Honeypot check
    const hp = document.getElementById('b-hp');
    if (hp && hp.value) {
        e.target.reset();
        btn.textContent = ogText;
        return;
    }

    const name = document.getElementById('b-name').value;
    const phone = document.getElementById('b-phone').value;
    const purpose = document.getElementById('b-purpose').value;
    if (!name || !phone || !purpose) return;

    try {
        await fetch('https://formsubmit.co/ajax/aryanimbalkar08@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Name: name,
                Phone: phone,
                Purpose: purpose,
                _subject: 'New Lead from Knotbridge!'
            })
        });
        document.getElementById('success').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        e.target.reset();
    } catch (err) {
        alert('Something went wrong. Please try again later.');
    } finally {
        btn.textContent = ogText;
    }
});

// --- PROCESS CASE STUDY CARDS ---
const processCards = document.querySelectorAll('.process-card');
processCards.forEach(card => {
    card.addEventListener('click', () => {
        processCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
    // Also handle mouse tracking for glow
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
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

window.closeOv = function() {
    document.getElementById('success').classList.add('hidden');
    document.body.style.overflow = '';
}

// ─── 18. ANTI-SCRAPING MEASURES ───
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || 
        (e.ctrlKey && e.key === 'u')
    ) {
        e.preventDefault();
        return false;
    }
});
