/* ============================================================
   ALORA BAKERY — Full Interactive JavaScript
   ============================================================ */

(function() {
  'use strict';

  // ============================================================
  // PRODUCT DATA — All 32 SKUs
  // ============================================================
  const PRODUCTS = [
    // CAKES (10)
    { id: 1, name: 'Red Velvet Dream', category: 'cakes', price: 899, image: 'red_velvet_cake', fomo: 'Our #1 bestseller! 62 ordered today 🔥', badge: 'available', desc: 'Layers of velvety red cake with cream cheese frosting' },
    { id: 2, name: 'Belgian Truffle', category: 'cakes', price: 1199, image: 'belgian_truffle_cake', fomo: 'Made with real Belgian cocoa. Pure indulgence.', badge: 'available', desc: 'Rich dark chocolate ganache truffle cake' },
    { id: 3, name: 'Strawberry Rosé', category: 'cakes', price: 999, image: 'strawberry_rose_cake', fomo: 'Seasonal favourite — available only this month! 🍓', badge: 'few-left', desc: 'Pink strawberry layers with rose petal garnish' },
    { id: 4, name: 'Mango Passion', category: 'cakes', price: 849, image: 'mango_passion_cake', fomo: 'Handpicked Alphonso mangoes. Summer in every bite.', badge: 'available', desc: 'Tropical mango and passion fruit layer cake' },
    { id: 5, name: 'Classic Vanilla Bean', category: 'cakes', price: 749, image: 'vanilla_bean_cake', fomo: "Simple. Elegant. Timeless. Our founder's recipe.", badge: 'available', desc: 'Pure Madagascar vanilla bean sponge cake' },
    { id: 6, name: 'Dark Forest', category: 'cakes', price: 999, image: 'dark_forest_cake', fomo: '3 layers of dark chocolate. Not for the faint-hearted.', badge: 'available', desc: 'Dark chocolate, cherries, and whipped cream' },
    { id: 7, name: 'Caramel Crunch', category: 'cakes', price: 1049, image: 'caramel_crunch_cake', fomo: 'Crunchy caramel shards on velvety mousse 🤤', badge: 'few-left', desc: 'Caramel mousse with crunchy caramel shards' },
    { id: 8, name: 'Pistachio Rose', category: 'cakes', price: 1299, image: 'pistachio_rose_cake', fomo: 'Crafted with Iranian pistachios. A royal treat.', badge: 'available', desc: 'Iranian pistachio and rose water cake' },
    { id: 9, name: 'Blueberry Lavender', category: 'cakes', price: 1149, image: 'blueberry_lavender_cake', fomo: "Floral notes meet berry bliss. Chef's special! 👩‍🍳", badge: 'available', desc: 'Fresh blueberry cake with lavender essence' },
    { id: 10, name: 'Tiramisu Tower', category: 'cakes', price: 1399, image: 'tiramisu_tower_cake', fomo: '5 layers of espresso-soaked perfection ☕', badge: 'few-left', desc: 'Multi-layer espresso mascarpone tower' },

    // BREADS (5)
    { id: 11, name: 'Sourdough Boule', category: 'breads', price: 349, image: 'sourdough_boule', fomo: '48-hour fermented. Crispy crust, pillowy inside.', badge: 'available', desc: '48-hour slow-fermented artisan sourdough' },
    { id: 12, name: 'Garlic Focaccia', category: 'breads', price: 299, image: 'garlic_focaccia', fomo: 'Fresh rosemary from our garden 🌿', badge: 'available', desc: 'Rosemary garlic focaccia with olive oil' },
    { id: 13, name: 'Multigrain Harvest', category: 'breads', price: 279, image: 'multigrain_harvest', fomo: '7 grains. Zero preservatives. Pure goodness.', badge: 'available', desc: 'Seven-grain artisan loaf, no preservatives' }
  ];

  // ============================================================
  // STORE DATA
  // ============================================================
  const STORES = [
    {
      id: 'andheri', name: 'ALORA Andheri', area: 'Andheri West',
      address: 'Plot 14, Lokhandwala Complex, Andheri West',
      pincode: '400053', radius: 6, hours: '8:00 AM – 10:00 PM',
      image: 'store_andheri',
      availability: {
        'Red Velvet Dream': 'available', 'Belgian Truffle': 'available',
        'Sourdough Boule': 'few-left', 'Classic Croissant': 'available',
        'Chocolate Avalanche': 'available', 'New York Classic': 'sold-out'
      }
    },
    {
      id: 'juhu', name: 'ALORA Juhu', area: 'Juhu',
      address: '22, Juhu Tara Road, Juhu',
      pincode: '400049', radius: 5, hours: '8:00 AM – 11:00 PM',
      image: 'store_juhu',
      availability: {
        'Red Velvet Dream': 'few-left', 'Belgian Truffle': 'available',
        'Sourdough Boule': 'available', 'Classic Croissant': 'few-left',
        'Chocolate Avalanche': 'sold-out', 'New York Classic': 'available'
      }
    },
    {
      id: 'bandra', name: 'ALORA Bandra', area: 'Bandra West',
      address: 'Turner Road, Bandra West',
      pincode: '400050', radius: 7, hours: '7:30 AM – 11:30 PM',
      image: 'store_bandra',
      availability: {
        'Red Velvet Dream': 'available', 'Belgian Truffle': 'few-left',
        'Sourdough Boule': 'available', 'Classic Croissant': 'available',
        'Chocolate Avalanche': 'available', 'New York Classic': 'available'
      }
    },
    {
      id: 'malad', name: 'ALORA Malad', area: 'Malad West',
      address: 'Inorbit Mall, Link Road, Malad West',
      pincode: '400064', radius: 8, hours: '10:00 AM – 9:30 PM',
      image: 'store_malad',
      availability: {
        'Red Velvet Dream': 'available', 'Belgian Truffle': 'available',
        'Sourdough Boule': 'sold-out', 'Classic Croissant': 'available',
        'Chocolate Avalanche': 'few-left', 'New York Classic': 'few-left'
      }
    }
  ];

  // Pincode to approximate distance mapping (simulated)
  const PINCODE_MAP = {
    '400049': { lat: 19.1075, lng: 72.8263 },
    '400050': { lat: 19.0596, lng: 72.8295 },
    '400051': { lat: 19.0728, lng: 72.8408 },
    '400052': { lat: 19.1186, lng: 72.8364 },
    '400053': { lat: 19.1364, lng: 72.8296 },
    '400054': { lat: 19.0815, lng: 72.8410 },
    '400055': { lat: 19.0919, lng: 72.8407 },
    '400056': { lat: 19.0741, lng: 72.8524 },
    '400057': { lat: 19.1126, lng: 72.8380 },
    '400058': { lat: 19.1074, lng: 72.8478 },
    '400059': { lat: 19.1180, lng: 72.8493 },
    '400060': { lat: 19.0965, lng: 72.8528 },
    '400061': { lat: 19.1051, lng: 72.8568 },
    '400062': { lat: 19.1435, lng: 72.8412 },
    '400063': { lat: 19.1503, lng: 72.8355 },
    '400064': { lat: 19.1870, lng: 72.8486 },
    '400069': { lat: 19.1200, lng: 72.8365 },
    '400070': { lat: 19.0640, lng: 72.8440 },
    '400071': { lat: 19.0720, lng: 72.8530 },
  };

  const STORE_COORDS = {
    'andheri': { lat: 19.1364, lng: 72.8296 },
    'juhu':    { lat: 19.1075, lng: 72.8263 },
    'bandra':  { lat: 19.0596, lng: 72.8295 },
    'malad':   { lat: 19.1870, lng: 72.8486 }
  };

  // ============================================================
  // QUIZ DATA
  // ============================================================
  const QUIZ = [
    {
      question: 'Pick your vibe',
      subtitle: 'What mood are you in right now?',
      options: [
        { emoji: '01', label: 'Cozy', value: 'cozy' },
        { emoji: '02', label: 'Adventurous', value: 'adventurous' },
        { emoji: '03', label: 'Classic', value: 'classic' },
        { emoji: '04', label: 'Bold', value: 'bold' }
      ]
    },
    {
      question: 'Your go-to flavour',
      subtitle: 'What makes your taste buds dance?',
      options: [
        { emoji: '01', label: 'Chocolate', value: 'chocolate' },
        { emoji: '02', label: 'Fruity', value: 'fruity' },
        { emoji: '03', label: 'Nutty', value: 'nutty' },
        { emoji: '04', label: 'Coffee', value: 'coffee' }
      ]
    },
    {
      question: 'What\'s the occasion?',
      subtitle: 'Every moment deserves the perfect cake',
      options: [
        { emoji: '01', label: 'Birthday', value: 'birthday' },
        { emoji: '02', label: 'Date Night', value: 'date' },
        { emoji: '03', label: 'Just Because', value: 'casual' },
        { emoji: '04', label: 'Celebration', value: 'celebration' }
      ]
    },
    {
      question: 'Sweetness level',
      subtitle: 'How sweet do you like it?',
      options: [
        { emoji: '01', label: 'Subtle', value: 'subtle' },
        { emoji: '02', label: 'Balanced', value: 'balanced' },
        { emoji: '03', label: 'Rich', value: 'rich' },
        { emoji: '04', label: 'Maximum', value: 'maximum' }
      ]
    }
  ];

  // Quiz result mapping
  const QUIZ_RESULTS = {
    'default': { productId: 1, message: 'Our classic bestseller that everyone loves!' },
    'cozy_chocolate': { productId: 6, message: 'Dark and comforting, like a warm hug in cake form.' },
    'cozy_fruity': { productId: 3, message: 'Sweet strawberry notes for a cozy evening.' },
    'cozy_coffee': { productId: 10, message: 'Espresso-soaked perfection for cozy coffee lovers.' },
    'cozy_nutty': { productId: 8, message: 'Pistachio rose — elegant and comforting.' },
    'adventurous_chocolate': { productId: 2, message: 'Belgian truffle — a bold chocolate adventure!' },
    'adventurous_fruity': { productId: 4, message: 'Mango passion — a tropical escape!' },
    'adventurous_coffee': { productId: 10, message: 'Tiramisu tower — a daring coffee creation!' },
    'adventurous_nutty': { productId: 8, message: 'Pistachio rose — exotic and unforgettable.' },
    'classic_chocolate': { productId: 6, message: 'The timeless Dark Forest. Nothing beats this classic.' },
    'classic_fruity': { productId: 5, message: 'Classic vanilla bean — pure, simple elegance.' },
    'classic_coffee': { productId: 10, message: 'Tiramisu — the classic Italian indulgence.' },
    'classic_nutty': { productId: 7, message: 'Caramel crunch — a classic with a twist.' },
    'bold_chocolate': { productId: 2, message: 'Belgian truffle for those who live boldly!' },
    'bold_fruity': { productId: 9, message: 'Blueberry lavender — a bold floral statement.' },
    'bold_coffee': { productId: 10, message: 'Tiramisu tower — 5 bold layers of espresso!' },
    'bold_nutty': { productId: 8, message: 'Pistachio rose — bold, green, and magnificent.' }
  };

  // ============================================================
  // CHEF ALORA MESSAGES
  // ============================================================
  const CHEF_MESSAGES = {
    hero: "Welcome to ALORA! I'm Chef Alora. Let me show you around our bakery.",
    story: "Every cake has a story... want to hear ours?",
    menu: "Hungry yet? Everything's baked fresh today.",
    stores: "Find us near you! We're always closer than you think.",
    experience: "Take the quiz! I'll find your perfect match.",
    cart: "Great choice! Your treats are waiting.",
    idle: "Need help? Just click me."
  };

  // ============================================================
  // STATE
  // ============================================================
  let cart = [];
  let currentCategory = 'all';
  let quizStep = 0;
  let quizAnswers = [];
  let currentSection = 'hero';

  // ============================================================
  // GENERATED IMAGE MAP - maps product image keys to actual file paths
  // ============================================================
  const IMAGE_DIR = 'assets/images/';
  const GENERATED_IMAGES = {
    'red_velvet_cake': true,
    'belgian_truffle_cake': true,
    'strawberry_rose_cake': true,
    'mango_passion_cake': true,
    'vanilla_bean_cake': true,
    'dark_forest_cake': true,
    'caramel_crunch_cake': true,
    'pistachio_rose_cake': true,
    'blueberry_lavender_cake': true,
    'tiramisu_tower_cake': true,
    'sourdough_boule': true,
    'garlic_focaccia': true,
    'multigrain_harvest': true
  };

  // Gradient fallbacks for products without generated images
  const GRADIENT_COLORS = {
    'brioche_loaf': ['#D4A574', '#C9956A'],
    'olive_ciabatta': ['#8B7D6B', '#6B5B4A'],
    'chocolate_avalanche_shake': ['#3D1C0E', '#6B3A2A'],
    'strawberry_cloud_shake': ['#FF9B9B', '#FFD5D5'],
    'mango_lassi_shake': ['#FFB347', '#FFD700'],
    'oreo_blast_shake': ['#2C2C2C', '#5A5A5A'],
    'caramel_macchiato_shake': ['#A0785A', '#D4A574'],
    'peanut_butter_cup_shake': ['#8B6914', '#C9A96E'],
    'berry_blast_shake': ['#6B2FA0', '#9B59B6'],
    'butterscotch_bliss_shake': ['#DAA520', '#FFD700'],
    'classic_croissant': ['#D4A574', '#E8C99B'],
    'pain_au_chocolat': ['#4A3728', '#8B6914'],
    'almond_danish': ['#C9A96E', '#E8C99B'],
    'fruit_tart': ['#FF6B6B', '#FFD93D'],
    'eclair_cafe': ['#3D1C0E', '#6B3A2A'],
    'new_york_cheesecake': ['#FFF8DC', '#F5DEB3'],
    'burnt_basque_cheesecake': ['#8B4513', '#D2691E'],
    'lotus_biscoff_cheesecake': ['#C9856B', '#E8A87C'],
    'matcha_cheesecake': ['#3CB371', '#8FBC8F'],
    'hero_bakery': ['#1A0A0A', '#8B1A1A'],
    'store_andheri': ['#2D1515', '#8B1A1A'],
    'store_juhu': ['#1A2A3A', '#4A6A8A'],
    'store_bandra': ['#3D1C0E', '#6B3A2A'],
    'store_malad': ['#1A1A2E', '#3D3D5C'],
    'chef_alora': ['#C41E3A', '#E63946'],
    'bakery_story': ['#D4A574', '#8B6914']
  };

  function getProductImageHTML(imageKey) {
    if (GENERATED_IMAGES[imageKey]) {
      return `<img src="${IMAGE_DIR}${imageKey}.png" alt="" loading="lazy">`;
    }
    const colors = GRADIENT_COLORS[imageKey] || ['#8B1A1A', '#C41E3A'];
    return `<div class="product-image-gradient" style="width:100%;height:100%;background:linear-gradient(135deg,${colors[0]},${colors[1]});display:flex;align-items:center;justify-content:center;">
      <span style="font-size:3rem;opacity:0.3;">🍰</span>
    </div>`;
  }

  // ============================================================
  // INTRO ANIMATION
  // ============================================================
  function initIntro() {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    // Generate particles
    const particlesContainer = overlay.querySelector('.intro-particles');
    if (particlesContainer) {
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'intro-particle';
        const angle = (Math.PI * 2 * i) / 30;
        const dist = 100 + Math.random() * 300;
        p.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        p.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.width = (4 + Math.random() * 8) + 'px';
        p.style.height = p.style.width;
        p.style.animationDelay = (2.5 + Math.random() * 0.5) + 's';
        particlesContainer.appendChild(p);
      }
    }

    // Auto-dismiss after 4.5s
    setTimeout(() => dismissIntro(), 4500);

    // Skip button
    const skipBtn = overlay.querySelector('.intro-skip');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => dismissIntro());
    }
  }

  function dismissIntro() {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay || overlay.classList.contains('hidden')) return;
    overlay.classList.add('hidden');
    document.body.style.overflow = '';

    // Show banner and nav
    setTimeout(() => {
      const banner = document.getElementById('promo-banner');
      if (banner) banner.classList.add('visible');
      showChef();
    }, 600);
  }

  // ============================================================
  // CUSTOM CURSOR
  // ============================================================
  function initCursor() {
    if (window.innerWidth < 768) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, .product-card, .store-card, .quiz-option, .category-tab');
      if (target) ring.classList.add('hovering');
    });
    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, .product-card, .store-card, .quiz-option, .category-tab');
      if (target) ring.classList.remove('hovering');
    });
  }

  // ============================================================
  // SCROLL EFFECTS
  // ============================================================
  function initScrollEffects() {
    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });

    // Section tracking for chef messages
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentSection = entry.target.id;
          updateChefMessage();
        }
      });
    }, { threshold: 0.3 });

    ['hero', 'story', 'menu', 'stores', 'experience'].forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // Navbar scroll effect
    // Navbar scroll effect
    let navTicking = false;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (!navTicking) {
        window.requestAnimationFrame(() => {
          const nav = document.getElementById('main-nav');
          if (nav) {
            if (scrollY > 100) {
              nav.classList.add('scrolled');
            } else {
              nav.classList.remove('scrolled');
            }
          }
          navTicking = false;
        });
        navTicking = true;
      }
    }, { passive: true });

    // Hero parallax
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
      heroBg.style.willChange = 'transform'; // Promote to GPU layer
      let parallaxTicking = false;
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (!parallaxTicking) {
          window.requestAnimationFrame(() => {
            if (scrollY < window.innerHeight) {
              heroBg.style.transform = `scale(1.1) translate3d(0, ${scrollY * 0.3}px, 0)`;
            }
            parallaxTicking = false;
          });
          parallaxTicking = true;
        }
      }, { passive: true });
    }
  }

  // ============================================================
  // HERO PARTICLES
  // ============================================================
  function initHeroParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'hero-cherry-particle';
      p.style.setProperty('--left', Math.random() * 100 + '%');
      p.style.setProperty('--delay', Math.random() * 10 + 's');
      p.style.setProperty('--duration', (8 + Math.random() * 12) + 's');
      p.style.width = (3 + Math.random() * 6) + 'px';
      p.style.height = p.style.width;
      p.style.opacity = 0.1 + Math.random() * 0.3;
      container.appendChild(p);
    }
  }

  // ============================================================
  // MENU / PRODUCTS
  // ============================================================
  function initMenu() {
    renderProducts('all');

    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.category;
        currentCategory = cat;
        renderProducts(cat);
      });
    });
  }

  function renderProducts(category) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const filtered = category === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === category);

    grid.innerHTML = '';

    filtered.forEach((product, i) => {
      const card = document.createElement('div');
      card.className = 'product-card reveal';
      card.style.transitionDelay = (i * 0.05) + 's';
      card.dataset.id = product.id;

      const badgeClass = product.badge === 'available' ? 'badge-available'
        : product.badge === 'few-left' ? 'badge-few-left'
        : 'badge-sold-out';
      const badgeText = product.badge === 'available' ? 'Available'
        : product.badge === 'few-left' ? '⚡ Few Left'
        : 'Sold Out';

      card.innerHTML = `
        <div class="product-image-container">
          ${getProductImageHTML(product.image)}
          <span class="product-badge ${badgeClass}">${badgeText}</span>
          <div class="product-fomo">
            <p class="fomo-text">"${product.fomo}"</p>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.desc}</p>
          <div class="product-footer">
            <span class="product-price"><span class="currency">₹</span>${product.price.toLocaleString('en-IN')}</span>
            <button class="add-to-cart-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">+</button>
          </div>
        </div>
      `;

      grid.appendChild(card);

      // Add to cart handler
      const cartBtn = card.querySelector('.add-to-cart-btn');
      cartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (product.badge === 'sold-out') {
          showToast('😔 Sorry, this item is sold out!');
          return;
        }
        addToCart(product);
      });

      // 3D tilt effect on hover (optimized with rAF)
      let isTicking = false;
      const imgContainer = card.querySelector('.product-image-container');
      
      card.addEventListener('mousemove', (e) => {
        if (!isTicking) {
          window.requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            if (imgContainer) {
              imgContainer.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
            isTicking = false;
          });
          isTicking = true;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (imgContainer) imgContainer.style.transform = '';
      });
    });

    // Re-observe for scroll reveal
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.1 });
      grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 50);
  }

  // ============================================================
  // CART
  // ============================================================
  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
    showToast(`🎉 ${product.name} added to cart!`);

    // Animate cart count
    const countEl = document.querySelector('.cart-count');
    if (countEl) {
      countEl.style.animation = 'none';
      void countEl.offsetWidth;
      countEl.style.animation = 'scaleBounce 0.4s ease';
    }
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
  }

  function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = totalItems;
    });

    // Update sidebar
    const itemsContainer = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('cart-empty');
    const footer = document.getElementById('cart-footer');

    if (!itemsContainer) return;

    if (cart.length === 0) {
      itemsContainer.innerHTML = '';
      if (emptyMsg) emptyMsg.style.display = 'block';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';
    if (footer) footer.style.display = 'block';

    itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image" style="background:linear-gradient(135deg,${(GRADIENT_COLORS[item.image] || ['#8B1A1A','#C41E3A'])[0]},${(GRADIENT_COLORS[item.image] || ['#8B1A1A','#C41E3A'])[1]});border-radius:8px;"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}${item.qty > 1 ? ` × ${item.qty}` : ''}</div>
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        </div>
        <button class="cart-item-remove" onclick="window.__removeFromCart(${item.id})">✕</button>
      </div>
    `).join('');

    // Update total
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const discount = Math.round(subtotal * 0.15);
    const total = subtotal - discount;

    const totalEl = document.getElementById('cart-total-amount');
    const discountEl = document.getElementById('cart-discount');
    if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    if (discountEl) discountEl.textContent = `You save ₹${discount.toLocaleString('en-IN')} with code ALORA15!`;
  }

  // Expose remove function globally
  window.__removeFromCart = function(id) { removeFromCart(id); };

  function toggleCart(show) {
    const sidebar = document.getElementById('cart-sidebar');
    const backdrop = document.getElementById('cart-backdrop');
    if (!sidebar) return;

    if (show === undefined) show = !sidebar.classList.contains('open');

    sidebar.classList.toggle('open', show);
    if (backdrop) backdrop.classList.toggle('show', show);
    document.body.style.overflow = show ? 'hidden' : '';

    if (show) updateChefSpeech(CHEF_MESSAGES.cart);
  }

  // ============================================================
  // STORES
  // ============================================================
  function initStores() {
    // Toggle store expansion
    document.querySelectorAll('.store-card').forEach(card => {
      const toggleBtn = card.querySelector('.store-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.classList.toggle('expanded');
          toggleBtn.textContent = card.classList.contains('expanded') ? 'Hide Menu' : 'View Menu';
        });
      }
    });
  }

  // ============================================================
  // DELIVERY CHECKER
  // ============================================================
  function initDelivery() {
    const input = document.getElementById('pincode-input');
    const btn = document.getElementById('pincode-check-btn');
    const results = document.getElementById('delivery-results');

    if (!btn || !input) return;

    btn.addEventListener('click', () => checkDelivery());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkDelivery();
    });

    function checkDelivery() {
      const pincode = input.value.trim();
      if (pincode.length !== 6 || isNaN(pincode)) {
        input.style.animation = 'shake 0.5s ease';
        setTimeout(() => input.style.animation = '', 500);
        showToast('⚠️ Please enter a valid 6-digit pincode');
        return;
      }

      if (!results) return;
      results.innerHTML = '';
      results.classList.add('show');

      const userCoords = PINCODE_MAP[pincode];
      let hasDelivery = false;

      STORES.forEach(store => {
        const storeCoords = STORE_COORDS[store.id];
        let distance;

        if (userCoords) {
          distance = haversine(userCoords.lat, userCoords.lng, storeCoords.lat, storeCoords.lng);
        } else {
          // Unknown pincode - generate a pseudo-random distance
          const seed = parseInt(pincode) % 100;
          distance = 5 + seed * 0.3;
        }

        const canDeliver = distance <= store.radius;
        if (canDeliver) hasDelivery = true;
        const estTime = Math.round(15 + distance * 3);

        const card = document.createElement('div');
        card.className = 'delivery-result-card';
        card.innerHTML = `
          <div class="delivery-icon ${canDeliver ? 'can-deliver' : 'cannot-deliver'}">
            ${canDeliver ? '✅' : '📍'}
          </div>
          <div class="delivery-info">
            <h4>${store.name}</h4>
            <p>${canDeliver
              ? `Delivery in ~${estTime} min`
              : `${store.address}`
            }</p>
          </div>
          <span class="delivery-distance ${canDeliver ? 'distance-ok' : distance <= store.radius + 3 ? 'distance-far' : 'distance-no'}">
            ${distance.toFixed(1)} km ${canDeliver ? '✓' : '✗'}
          </span>
        `;
        results.appendChild(card);
      });

      if (!hasDelivery) {
        const msg = document.createElement('div');
        msg.className = 'delivery-result-card';
        msg.innerHTML = `
          <div class="delivery-icon cannot-deliver">😔</div>
          <div class="delivery-info">
            <h4>We don't deliver to your area yet</h4>
            <p>But you're always welcome to visit us in-store!</p>
          </div>
        `;
        results.appendChild(msg);
      }
    }
  }

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  // ============================================================
  // RESERVATION
  // ============================================================
  function initReservation() {
    // Open reservation modal
    document.querySelectorAll('.reserve-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const storeName = btn.dataset.store;
        openReservation(storeName);
      });
    });

    // Close modal
    document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target === el) closeModal();
      });
    });

    // Prevent modal content clicks from closing
    document.querySelectorAll('.modal-content').forEach(el => {
      el.addEventListener('click', (e) => e.stopPropagation());
    });

    // Form submission
    const form = document.getElementById('reservation-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitReservation();
      });
    }
  }

  function openReservation(storeName) {
    const modal = document.getElementById('reservation-modal');
    const storeInput = document.getElementById('res-store');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (storeInput) storeInput.value = storeName || '';
    }
  }

  function closeModal() {
    document.querySelectorAll('.modal-overlay').forEach(m => {
      m.classList.remove('active');
    });
    document.body.style.overflow = '';
    // Reset form
    const form = document.getElementById('reservation-form');
    const success = document.getElementById('reservation-success');
    if (form) form.style.display = '';
    if (success) success.classList.remove('show');
  }

  function submitReservation() {
    const form = document.getElementById('reservation-form');
    const success = document.getElementById('reservation-success');
    const storeName = document.getElementById('res-store')?.value || 'ALORA';

    if (form) form.style.display = 'none';
    if (success) {
      success.classList.add('show');
      const msg = success.querySelector('.success-msg');
      if (msg) msg.textContent = `Table reserved at ${storeName}! We can't wait to see you. 🎉`;
    }

    // Confetti!
    launchConfetti();
    showToast(`🎉 Table reserved at ${storeName}!`);
  }

  // ============================================================
  // QUIZ
  // ============================================================
  function initQuiz() {
    quizStep = 0;
    quizAnswers = [];
    renderQuizStep();
  }

  function renderQuizStep() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    // Update progress dots
    container.querySelectorAll('.quiz-progress-dot').forEach((dot, i) => {
      dot.classList.remove('filled', 'current');
      if (i < quizStep) dot.classList.add('filled');
      if (i === quizStep) dot.classList.add('current');
    });

    // Show/hide questions
    container.querySelectorAll('.quiz-question').forEach((q, i) => {
      q.classList.toggle('active', i === quizStep);
    });

    // Show result if quiz complete
    if (quizStep >= QUIZ.length) {
      showQuizResult();
    }
  }

  function selectQuizOption(step, value) {
    quizAnswers[step] = value;

    // Visual feedback
    const question = document.querySelectorAll('.quiz-question')[step];
    if (question) {
      question.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.value === value);
      });
    }

    // Advance after delay
    setTimeout(() => {
      quizStep++;
      renderQuizStep();
    }, 400);
  }

  function showQuizResult() {
    const vibe = quizAnswers[0] || 'cozy';
    const flavour = quizAnswers[1] || 'chocolate';
    const key = `${vibe}_${flavour}`;
    const result = QUIZ_RESULTS[key] || QUIZ_RESULTS['default'];
    const product = PRODUCTS.find(p => p.id === result.productId);

    const resultEl = document.getElementById('quiz-result');
    const questionsEl = document.querySelector('.quiz-questions-wrapper');

    if (questionsEl) questionsEl.style.display = 'none';
    if (resultEl) {
      resultEl.classList.add('active');
      const nameEl = resultEl.querySelector('.result-cake-name');
      const descEl = resultEl.querySelector('.result-desc');
      const imgEl = resultEl.querySelector('.result-cake-image');

      if (nameEl) nameEl.textContent = product.name;
      if (descEl) descEl.textContent = result.message;
      if (imgEl) {
        if (GENERATED_IMAGES[product.image]) {
          imgEl.src = IMAGE_DIR + product.image + '.png';
        }
      }
    }

    launchConfetti();
  }

  function resetQuiz() {
    quizStep = 0;
    quizAnswers = [];
    const resultEl = document.getElementById('quiz-result');
    const questionsEl = document.querySelector('.quiz-questions-wrapper');
    const progressDots = document.querySelectorAll('.quiz-progress-dot');

    if (resultEl) resultEl.classList.remove('active');
    if (questionsEl) questionsEl.style.display = '';
    progressDots.forEach(d => { d.classList.remove('filled', 'current'); });

    // Deselect all options
    document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));

    renderQuizStep();
  }

  // Expose globally
  window.__selectQuizOption = selectQuizOption;
  window.__resetQuiz = resetQuiz;

  // ============================================================
  // CHEF ALORA CHARACTER
  // ============================================================
  function showChef() {
    const chef = document.getElementById('chef-alora');
    if (chef) {
      setTimeout(() => {
        chef.classList.add('visible');
        updateChefMessage();
      }, 800);
    }
  }

  function updateChefMessage() {
    const msg = CHEF_MESSAGES[currentSection] || CHEF_MESSAGES.idle;
    updateChefSpeech(msg);
  }

  let speechTimeout;
  function updateChefSpeech(text) {
    const speech = document.querySelector('.chef-speech');
    if (!speech) return;

    clearTimeout(speechTimeout);
    speech.classList.remove('show');

    setTimeout(() => {
      speech.textContent = text;
      speech.classList.add('show');
    }, 200);

    speechTimeout = setTimeout(() => {
      speech.classList.remove('show');
    }, 6000);
  }

  function initChef() {
    const avatar = document.querySelector('.chef-avatar');
    if (avatar) {
      avatar.addEventListener('click', () => {
        updateChefMessage();
      });
    }
  }

  // ============================================================
  // TOAST NOTIFICATIONS
  // ============================================================
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">🍰</span>
      <span class="toast-msg">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ============================================================
  // CONFETTI
  // ============================================================
  function launchConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#C41E3A', '#E63946', '#C9A96E', '#FFD700', '#FF6B7A', '#8B1A1A'];

    for (let i = 0; i < 80; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 2 + 's';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      piece.style.width = (5 + Math.random() * 10) + 'px';
      piece.style.height = piece.style.width;
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(piece);
    }

    setTimeout(() => container.remove(), 5000);
  }

  // ============================================================
  // SMOOTH SCROLL
  // ============================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ============================================================
  // CART TOGGLE
  // ============================================================
  function initCartToggle() {
    document.querySelectorAll('.nav-cart, .open-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart(true);
      });
    });

    const closeBtn = document.getElementById('cart-close');
    if (closeBtn) closeBtn.addEventListener('click', () => toggleCart(false));

    const backdrop = document.getElementById('cart-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => toggleCart(false));
  }

  // ============================================================
  // MARQUEE BANNER HOVER PAUSE
  // ============================================================
  function initBanner() {
    const banner = document.getElementById('promo-banner');
    if (!banner) return;
    const track = banner.querySelector('.banner-track');
    if (!track) return;

    banner.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    banner.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

  // ============================================================
  // TEXT REVEAL ANIMATION
  // ============================================================
  function initTextReveal() {
    document.querySelectorAll('.text-reveal').forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      el.style.visibility = 'visible';
      [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px) rotateX(-90deg)';
        span.style.transition = `all 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.03}s`;
        el.appendChild(span);
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.querySelectorAll('span').forEach(span => {
              span.style.opacity = '1';
              span.style.transform = 'translateY(0) rotateX(0)';
            });
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      observer.observe(el);
    });
  }

  // ============================================================
  // NEWSLETTER
  // ============================================================
  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing!');
      form.reset();
    });
  }

  // ============================================================
  // INIT ALL
  // ============================================================
  function init() {
    document.body.style.overflow = 'hidden'; // Lock during intro
    initIntro();
    initCursor();
    initHeroParticles();
    initScrollEffects();
    initMenu();
    initStores();
    initDelivery();
    initReservation();
    initQuiz();
    initChef();
    initSmoothScroll();
    initCartToggle();
    initBanner();
    initTextReveal();
    initNewsletter();
    initHubTabs();
  }

  // ============================================================
  // HUB TABS
  // ============================================================
  function initHubTabs() {
    const tabs = document.querySelectorAll('.hub-tab');
    const sections = document.querySelectorAll('.hub-section');
    if (!tabs.length || !sections.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');

        sections.forEach(sec => sec.classList.remove('active'));
        
        const targetId = e.target.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          targetSection.classList.add('active');
          
          // Re-trigger reveal animations in the newly active section
          targetSection.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
          });
          
          // Scroll gracefully to the top of the hub if scrolled past it
          const nav = document.getElementById('hub-nav');
          if (nav && window.scrollY > nav.offsetTop) {
            window.scrollTo({ top: nav.offsetTop - 80, behavior: 'smooth' });
          }
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
