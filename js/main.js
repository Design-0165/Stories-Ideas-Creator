/* ============================================
   STORIES IDEAS CREATOR — Main JavaScript
   Animations, Navigation, Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initMobileMenu();
  initSmoothScroll();
  initParticles();
  initFormValidation();
  initFloatingSpheres();
  initCustomCursor();
  initPlayableGamesModal();
  initPlayableWebsitesModal();
  initReviewSubmission();
});

/* ---------- Portfolio Showcase Smooth Sliding Helper & Drag-Scroll ---------- */
window.slideShowcase = function(trackId, offset) {
  const track = document.getElementById(trackId);
  if (track) {
    track.scrollBy({ left: offset, behavior: 'smooth' });
  }
};

// Enable mouse drag scrolling on all slider tracks
document.addEventListener('DOMContentLoaded', () => {
  const tracks = document.querySelectorAll('.showcase-slider-track');
  tracks.forEach(track => {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      // Don't trigger drag if clicking a button or link inside card
      if (e.target.closest('button') || e.target.closest('a')) return;
      isDown = true;
      track.classList.add('active-drag');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.classList.remove('active-drag');
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.classList.remove('active-drag');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed multiplier
      track.scrollLeft = scrollLeft - walk;
    });
  });
});

/* ---------- Playable Live Website Explorer Modal ---------- */
function initPlayableWebsitesModal() {
  const modal = document.getElementById('website-modal');
  if (!modal) return;

  const modalTitle = document.getElementById('website-modal-title');
  const iframeContainer = document.getElementById('website-iframe-container');
  const closeBtn = document.getElementById('website-modal-close');

  const webTriggers = document.querySelectorAll('[data-explore-web]');

  webTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const webUrl = trigger.getAttribute('data-explore-web');
      const webTitle = trigger.getAttribute('data-web-title') || 'Web Project Explorer';
      openWebsiteModal(webUrl, webTitle);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeWebsiteModal());
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeWebsiteModal();
  });

  function closeWebsiteModal() {
    modal.style.display = 'none';
    iframeContainer.innerHTML = '';
    document.body.style.overflow = '';
  }

  function openWebsiteModal(url, title) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalTitle.textContent = `🌐 ${title}`;

    const isGithub = url.includes('github.com');
    const isInstagram = url.includes('instagram.com');

    if (isInstagram) {
      // Render Instagram Channel Preview
      iframeContainer.innerHTML = `
        <div style="background:#141414; padding:28px; border-radius:16px; border:1px solid rgba(212,168,67,0.3); text-align:center;">
          <div style="font-size:3rem; margin-bottom:12px;">📸</div>
          <h4 style="font-family:var(--font-heading); color:#fff; font-size:1.4rem; margin-bottom:8px;">${title}</h4>
          <p style="color:#a0a0a0; font-size:0.95rem; margin-bottom:20px;">Explore official social media ads, creative stories, and motion graphic reels.</p>
          <div style="background:#1e1e1e; border:1px dashed rgba(212,168,67,0.4); padding:12px; border-radius:12px; font-family:monospace; color:var(--accent); font-size:0.9rem; margin-bottom:24px; word-break:break-all;">
            Channel: ${url}
          </div>
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn--primary" style="padding:12px 32px; font-size:1rem; border-radius:10px; display:inline-block;">Open Channel on Instagram ↗</a>
        </div>
      `;
    } else if (isGithub) {
      // Render Live Interactive Web Application Tool Demo for GitHub Repos
      let demoContent = '';

      if (url.includes('Numerology')) {
        demoContent = `
          <div style="background:#141414; padding:24px; border-radius:16px; border:1px solid rgba(212,168,67,0.3); text-align:center;">
            <h4 style="font-family:var(--font-heading); color:#fff; font-size:1.3rem; margin-bottom:12px;">🔢 Live Numerology Life Path Calculator</h4>
            <p style="color:#a0a0a0; font-size:0.9rem; margin-bottom:20px;">Enter your birth date to calculate your Life Path Number & Expression Reading.</p>
            <div style="display:flex; justify-content:center; gap:12px; margin-bottom:20px;">
              <input type="date" id="num-date" style="background:#222; border:1px solid rgba(212,168,67,0.4); color:#fff; padding:10px 16px; border-radius:10px; font-family:var(--font-heading); font-size:1rem;">
              <button id="num-calc-btn" class="btn btn--primary" style="padding:10px 20px;">Calculate Number</button>
            </div>
            <div id="num-result" style="background:#1e1e1e; border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:20px; color:var(--accent); font-family:var(--font-heading); font-size:1.1rem; min-height:80px; display:flex; justify-content:center; align-items:center;">Select date to reveal your Numerology Reading</div>
          </div>
        `;
      } else if (url.includes('Astrology')) {
        demoContent = `
          <div style="background:#141414; padding:24px; border-radius:16px; border:1px solid rgba(212,168,67,0.3); text-align:center;">
            <h4 style="font-family:var(--font-heading); color:#fff; font-size:1.3rem; margin-bottom:12px;">🔮 Live Astrology Horoscope & Zodiac Finder</h4>
            <p style="color:#a0a0a0; font-size:0.9rem; margin-bottom:20px;">Select your birth month & day to generate planetary insights.</p>
            <div style="display:flex; justify-content:center; gap:12px; margin-bottom:20px;">
              <select id="astro-sign" style="background:#222; border:1px solid rgba(212,168,67,0.4); color:#fff; padding:10px 16px; border-radius:10px; font-family:var(--font-heading); font-size:1rem;">
                <option value="Aries ♈">Aries ♈ (Mar 21 - Apr 19)</option>
                <option value="Taurus ♉">Taurus ♉ (Apr 20 - May 20)</option>
                <option value="Gemini ♊">Gemini ♊ (May 21 - Jun 20)</option>
                <option value="Cancer ♋">Cancer ♋ (Jun 21 - Jul 22)</option>
                <option value="Leo ♌">Leo ♌ (Jul 23 - Aug 22)</option>
                <option value="Virgo ♍">Virgo ♍ (Aug 23 - Sep 22)</option>
                <option value="Libra ♎">Libra ♎ (Sep 23 - Oct 22)</option>
                <option value="Scorpio ♏">Scorpio ♏ (Oct 23 - Nov 21)</option>
                <option value="Sagittarius ♐">Sagittarius ♐ (Nov 22 - Dec 21)</option>
                <option value="Capricorn ♑">Capricorn ♑ (Dec 22 - Jan 19)</option>
                <option value="Aquarius ♒">Aquarius ♒ (Jan 20 - Feb 18)</option>
                <option value="Pisces ♓">Pisces ♓ (Feb 19 - Mar 20)</option>
              </select>
              <button id="astro-btn" class="btn btn--primary" style="padding:10px 20px;">Get Horoscope</button>
            </div>
            <div id="astro-result" style="background:#1e1e1e; border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:20px; color:#fff; font-size:0.95rem; min-height:80px; text-align:left; line-height:1.6;">Click 'Get Horoscope' to view your daily astrological energy alignment.</div>
          </div>
        `;
      } else if (title.includes('Sales AI Agent') || title.includes('Autonomous')) {
        demoContent = `
          <div style="background:#141414; padding:20px; border-radius:16px; border:1px solid rgba(212,168,67,0.3);">
            <h4 style="font-family:var(--font-heading); color:#fff; font-size:1.2rem; margin-bottom:12px; text-align:center;">🤖 Autonomous Sales AI Agent Sandbox</h4>
            <div id="sales-ai-messages" style="background:#1a1a1a; border:1px solid rgba(255,255,255,0.1); border-radius:12px; height:220px; overflow-y:auto; padding:16px; margin-bottom:16px; font-size:0.9rem;">
              <div style="color:var(--accent); margin-bottom:10px;"><strong>Sales AI Bot:</strong> Hello! Welcome! I'm your Autonomous Sales Assistant. How can I help boost your business conversions today?</div>
            </div>
            <div style="display:flex; gap:10px;">
              <input type="text" id="sales-ai-input" placeholder="Ask about pricing, features, or book a demo..." style="flex:1; background:#222; border:1px solid rgba(212,168,67,0.4); color:#fff; padding:10px 16px; border-radius:10px; font-size:0.9rem;">
              <button id="sales-ai-send" class="btn btn--primary" style="padding:10px 20px;">Send</button>
            </div>
          </div>
        `;
      } else if (url.includes('Chatbot')) {
        demoContent = `
          <div style="background:#141414; padding:20px; border-radius:16px; border:1px solid rgba(212,168,67,0.3);">
            <h4 style="font-family:var(--font-heading); color:#fff; font-size:1.2rem; margin-bottom:12px; text-align:center;">🤖 Live AI Assistant Mobile App</h4>
            <div id="chat-messages" style="background:#1a1a1a; border:1px solid rgba(255,255,255,0.1); border-radius:12px; height:220px; overflow-y:auto; padding:16px; margin-bottom:16px; font-size:0.9rem;">
              <div style="color:var(--accent); margin-bottom:10px;"><strong>AI Bot:</strong> Hello! How can I assist you with your business today?</div>
            </div>
            <div style="display:flex; gap:10px;">
              <input type="text" id="chat-input" placeholder="Type your query..." style="flex:1; background:#222; border:1px solid rgba(212,168,67,0.4); color:#fff; padding:10px 16px; border-radius:10px; font-size:0.9rem;">
              <button id="chat-send" class="btn btn--primary" style="padding:10px 20px;">Send</button>
            </div>
          </div>
        `;
      } else if (title.includes('Delivery')) {
        demoContent = `
          <div style="background:#141414; padding:24px; border-radius:16px; border:1px solid rgba(212,168,67,0.3); text-align:center;">
            <h4 style="font-family:var(--font-heading); color:#fff; font-size:1.2rem; margin-bottom:12px;">📦 Smart Delivery & GPS Tracker Mobile App</h4>
            <div style="background:#1a1a1a; border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:20px; max-width:320px; margin:0 auto;">
              <div style="font-size:0.85rem; color:#a0a0a0; margin-bottom:8px;">Order #ORD-8924 • In Transit</div>
              <div style="font-size:1.4rem; font-weight:bold; color:var(--accent); margin-bottom:16px;">Estimated Arrival: 14 Mins</div>
              <div style="background:#222; height:8px; border-radius:4px; overflow:hidden; margin-bottom:16px;">
                <div style="background:var(--accent); width:75%; height:100%;"></div>
              </div>
              <div style="text-align:left; font-size:0.85rem; color:#fff; line-height:1.8;">
                <div>📍 <strong>Current Location:</strong> Park Street, Kolkata</div>
                <div>👤 <strong>Delivery Agent:</strong> Rahul Sharma (★ 4.9)</div>
                <div>🚴 <strong>Vehicle:</strong> Electric Express Scooter</div>
              </div>
            </div>
          </div>
        `;
      } else if (title.includes('Fitness')) {
        demoContent = `
          <div style="background:#141414; padding:24px; border-radius:16px; border:1px solid rgba(212,168,67,0.3); text-align:center;">
            <h4 style="font-family:var(--font-heading); color:#fff; font-size:1.2rem; margin-bottom:12px;">💪 Fitness & Wellness Mobile Tracker</h4>
            <div style="background:#1a1a1a; border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:20px; max-width:320px; margin:0 auto;">
              <div style="font-size:2.5rem; font-weight:bold; color:var(--accent); margin-bottom:4px;">8,420</div>
              <div style="font-size:0.85rem; color:#a0a0a0; margin-bottom:16px;">Daily Steps (Goal: 10,000)</div>
              <div style="display:flex; justify-content:space-around; background:#222; padding:12px; border-radius:12px; font-size:0.85rem; color:#fff;">
                <div>🔥 <strong>540</strong> kcal</div>
                <div>⏱️ <strong>45</strong> mins</div>
                <div>❤️ <strong>112</strong> bpm</div>
              </div>
            </div>
          </div>
        `;
      } else {
        // Dev Tool
        demoContent = `
          <div style="background:#141414; padding:20px; border-radius:16px; border:1px solid rgba(212,168,67,0.3);">
            <h4 style="font-family:var(--font-heading); color:#fff; font-size:1.2rem; margin-bottom:12px; text-align:center;">⚙️ Developer Utility Suite — Text & Base64 Encoder</h4>
            <textarea id="tool-text" style="width:100%; height:100px; background:#222; border:1px solid rgba(212,168,67,0.4); color:#fff; padding:12px; border-radius:10px; font-family:monospace; font-size:0.9rem; margin-bottom:14px;" placeholder="Paste text here to encode or transform..."></textarea>
            <div style="display:flex; gap:10px; justify-content:center; margin-bottom:14px;">
              <button id="tool-b64" class="btn btn--primary" style="padding:8px 18px; font-size:0.85rem;">Base64 Encode</button>
              <button id="tool-upper" class="btn btn--outline" style="padding:8px 18px; font-size:0.85rem;">UPPERCASE</button>
              <button id="tool-lower" class="btn btn--outline" style="padding:8px 18px; font-size:0.85rem;">lowercase</button>
            </div>
            <div id="tool-output" style="background:#1e1e1e; border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:12px; font-family:monospace; color:var(--accent); font-size:0.85rem; min-height:50px; word-break:break-all;">Transformed output will appear here.</div>
          </div>
        `;
      }

      iframeContainer.innerHTML = `
        <div style="background:#1a1a1a; padding:12px 20px; border-radius:12px 12px 0 0; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1);">
          <span style="color:var(--text-muted); font-size:0.75rem; font-family:monospace; word-break:break-all;">Repository: ${url}</span>
          <a href="${url}" target="_blank" rel="noopener noreferrer" style="color:var(--accent); font-size:0.8rem; font-weight:bold;">View Source Code on GitHub ↗</a>
        </div>
        <div style="padding:24px; background:#0d0d0d; border-radius:0 0 16px 16px;">
          ${demoContent}
        </div>
      `;

      // Attach Interactive Event Handlers
      setTimeout(() => {
        const numBtn = document.getElementById('num-calc-btn');
        if (numBtn) {
          numBtn.addEventListener('click', () => {
            const dateVal = document.getElementById('num-date').value;
            const res = document.getElementById('num-result');
            if (!dateVal) { res.textContent = 'Please select a valid birth date!'; return; }
            const digits = dateVal.replace(/\D/g, '').split('').map(Number);
            let sum = digits.reduce((a, b) => a + b, 0);
            while (sum > 9 && sum !== 11 && sum !== 22) {
              sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0);
            }
            res.innerHTML = `✨ Your Life Path Number is <strong style="font-size:1.5rem; color:#fff;">${sum}</strong><br><span style="font-size:0.9rem; color:#a0a0a0;">Represents leadership, creative energy, and spiritual alignment.</span>`;
          });
        }

        const astroBtn = document.getElementById('astro-btn');
        if (astroBtn) {
          astroBtn.addEventListener('click', () => {
            const sign = document.getElementById('astro-sign').value;
            const res = document.getElementById('astro-result');
            const horoscopes = [
              "Today brings high creative clarity and new strategic opportunities.",
              "Focus on collaborative projects and intuitive decision-making.",
              "Financial and career alignment are highlighted. Trust your vision.",
              "Embrace innovation and take bold action toward your long-term goals."
            ];
            const text = horoscopes[Math.floor(Math.random() * horoscopes.length)];
            res.innerHTML = `<strong style="color:var(--accent);">${sign} Daily Reading:</strong><br>${text}`;
          });
        }

        const salesSend = document.getElementById('sales-ai-send');
        if (salesSend) {
          salesSend.addEventListener('click', () => {
            const input = document.getElementById('sales-ai-input');
            const msgs = document.getElementById('sales-ai-messages');
            if (!input.value.trim()) return;
            const userMsg = input.value;
            msgs.innerHTML += `<div style="color:#fff; text-align:right; margin-bottom:8px;"><strong>You:</strong> ${userMsg}</div>`;
            input.value = '';
            setTimeout(() => {
              const replies = [
                "Our Autonomous Sales AI Agent qualifies leads in under 5 seconds and syncs directly into your CRM!",
                "Great question! We offer custom AI agent development tailored for your exact sales funnel.",
                "Would you like me to schedule a 1-on-1 strategy call with our engineering team?"
              ];
              const reply = replies[Math.floor(Math.random() * replies.length)];
              msgs.innerHTML += `<div style="color:var(--accent); text-align:left; margin-bottom:8px;"><strong>Sales AI Bot:</strong> ${reply}</div>`;
              msgs.scrollTop = msgs.scrollHeight;
            }, 600);
          });
        }

        const chatSend = document.getElementById('chat-send');
        if (chatSend) {
          chatSend.addEventListener('click', () => {
            const input = document.getElementById('chat-input');
            const msgs = document.getElementById('chat-messages');
            if (!input.value.trim()) return;
            const userMsg = input.value;
            msgs.innerHTML += `<div style="color:#fff; text-align:right; margin-bottom:8px;"><strong>You:</strong> ${userMsg}</div>`;
            input.value = '';
            setTimeout(() => {
              const replies = [
                "I can help automate your workflow and integrate custom AI agent capabilities!",
                "That's a great request! Our web development suite specializes in fast, responsive user experiences.",
                "Let's discuss how we can bring your digital project ideas to life!"
              ];
              const reply = replies[Math.floor(Math.random() * replies.length)];
              msgs.innerHTML += `<div style="color:var(--accent); text-align:left; margin-bottom:8px;"><strong>AI Bot:</strong> ${reply}</div>`;
              msgs.scrollTop = msgs.scrollHeight;
            }, 600);
          });
        }

        const b64Btn = document.getElementById('tool-b64');
        if (b64Btn) {
          b64Btn.addEventListener('click', () => {
            const txt = document.getElementById('tool-text').value;
            document.getElementById('tool-output').textContent = btoa(txt || 'Hello World');
          });
          document.getElementById('tool-upper').addEventListener('click', () => {
            const txt = document.getElementById('tool-text').value;
            document.getElementById('tool-output').textContent = txt.toUpperCase();
          });
          document.getElementById('tool-lower').addEventListener('click', () => {
            const txt = document.getElementById('tool-text').value;
            document.getElementById('tool-output').textContent = txt.toLowerCase();
          });
        }
      }, 50);

    } else {
      // Live Iframe View for Vercel Web Applications
      iframeContainer.innerHTML = `
        <div style="width:100%; height:75vh; border-radius:16px; overflow:hidden; border:1px solid rgba(212,168,67,0.3); background:#000; position:relative;">
          <div style="background:#1e1e1e; padding:8px 16px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1);">
            <span style="color:var(--text-muted); font-size:0.75rem; font-family:monospace; word-break:break-all;">${url}</span>
            <a href="${url}" target="_blank" rel="noopener noreferrer" style="color:var(--accent); font-size:0.8rem; font-weight:bold;">Open External Tab ↗</a>
          </div>
          <iframe src="${url}" style="width:100%; height:calc(100% - 37px); border:none; background:#fff;" loading="lazy" title="${title}"></iframe>
        </div>
      `;
    }
  }
}


/* ---------- Playable Games Modal Engine ---------- */
function initPlayableGamesModal() {
  const modal = document.getElementById('game-modal');
  if (!modal) return;

  const modalTitle = document.getElementById('game-modal-title');
  const gameContainer = document.getElementById('game-canvas-container');
  const closeBtn = document.getElementById('game-modal-close');

  const gameTriggers = document.querySelectorAll('[data-play-game]');

  gameTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const gameType = trigger.getAttribute('data-play-game');
      openGameModal(gameType);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeGameModal();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeGameModal();
  });

  let currentGameLoop = null;

  function closeGameModal() {
    modal.style.display = 'none';
    gameContainer.innerHTML = '';
    if (currentGameLoop) cancelAnimationFrame(currentGameLoop);
    document.body.style.overflow = '';
  }

  function openGameModal(gameType) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    gameContainer.innerHTML = '';
    if (currentGameLoop) cancelAnimationFrame(currentGameLoop);

    switch (gameType) {
      case 'tictactoe':
        modalTitle.textContent = '❌⭕ Tic Tac Toe — Play Live';
        startTicTacToe(gameContainer);
        break;
      case 'snake':
        modalTitle.textContent = '🐍 Snake Game — Use Arrow Keys';
        startSnakeGame(gameContainer);
        break;
      case 'snakeladder':
        modalTitle.textContent = '🎲 Snake & Ladder — Roll the Dice';
        startSnakeLadderGame(gameContainer);
        break;
      case 'flappy':
        modalTitle.textContent = '🐤 Flappy Bird — Press Spacebar / Tap';
        startFlappyBird(gameContainer);
        break;
      case 'candycrush':
        modalTitle.textContent = '🍬 Candy Crush — Match 3 Candies Live';
        startCandyCrush(gameContainer);
        break;
      case 'slidingpuzzle':
        modalTitle.textContent = '🧩 Sliding Puzzle — Solve the 3x3 Grid';
        startSlidingPuzzle(gameContainer);
        break;
      case 'dotsgame':
        modalTitle.textContent = '🔴 Dots & Boxes — Connect Dots to Claim Boxes';
        startDotsGame(gameContainer);
        break;
      case 'gamessuite':
        modalTitle.textContent = '🕹️ Games Arcade Suite — Memory Match Challenge';
        startGamesSuite(gameContainer);
        break;
    }
  }

  // 8. GAMES ARCADE SUITE (Memory Card Match Challenge)
  function startGamesSuite(container) {
    const emojis = ['🚀', '👾', '🎮', '💎', '🔥', '⚡'];
    let cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    let flippedCards = [];
    let matchedPairs = 0;
    let score = 0;

    container.innerHTML = `
      <div style="text-align:center;">
        <div style="font-family:var(--font-heading); color:var(--accent); font-size:1.1rem; margin-bottom:10px;">Matched: <span id="gs-score">0</span> / 6 Pairs</div>
        <div id="gs-grid" style="display:grid; grid-template-columns:repeat(4, 70px); gap:8px; margin:0 auto; width:max-content; background:#1a1a1a; padding:14px; border-radius:16px; border:2px solid rgba(212,168,67,0.3);"></div>
        <button id="gs-reset" class="btn btn--outline" style="margin-top:16px; padding:8px 20px; font-size:0.85rem;">Restart Arcade Challenge</button>
      </div>
    `;

    const gridEl = container.querySelector('#gs-grid');
    const scoreEl = container.querySelector('#gs-score');
    const resetBtn = container.querySelector('#gs-reset');

    function renderCards() {
      gridEl.innerHTML = '';
      cards.forEach((emoji, idx) => {
        const btn = document.createElement('button');
        btn.setAttribute('data-idx', idx);
        btn.className = 'gs-card';
        btn.style.cssText = 'width:70px; height:70px; border-radius:12px; background:#282828; border:2px solid rgba(212,168,67,0.3); font-size:1.8rem; cursor:pointer; font-family:sans-serif; transition:transform 0.2s ease;';
        btn.textContent = '❓';

        btn.addEventListener('click', () => flipCard(btn, emoji, idx));
        gridEl.appendChild(btn);
      });
    }

    function flipCard(btn, emoji, idx) {
      if (flippedCards.length === 2 || btn.textContent !== '❓') return;

      btn.textContent = emoji;
      btn.style.background = '#44340d';
      flippedCards.push({ btn, emoji, idx });

      if (flippedCards.length === 2) {
        const [c1, c2] = flippedCards;
        if (c1.emoji === c2.emoji && c1.idx !== c2.idx) {
          c1.btn.style.borderColor = '#22c55e';
          c2.btn.style.borderColor = '#22c55e';
          matchedPairs++;
          scoreEl.textContent = matchedPairs;
          flippedCards = [];
          if (matchedPairs === 6) {
            scoreEl.textContent = '6 (🎉 VICTORY!)';
          }
        } else {
          setTimeout(() => {
            c1.btn.textContent = '❓'; c1.btn.style.background = '#282828';
            c2.btn.textContent = '❓'; c2.btn.style.background = '#282828';
            flippedCards = [];
          }, 800);
        }
      }
    }

    resetBtn.addEventListener('click', () => {
      cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
      flippedCards = [];
      matchedPairs = 0;
      scoreEl.textContent = '0';
      renderCards();
    });

    renderCards();
  }

  // 7. DOTS & BOXES GAME
  function startDotsGame(container) {
    const size = 3; // 3x3 dots = 2x2 boxes
    let hLines = Array(size * (size - 1)).fill(false);
    let vLines = Array((size - 1) * size).fill(false);
    let boxes = Array((size - 1) * (size - 1)).fill(null);
    let p1Score = 0;
    let p2Score = 0;
    let turn = 1;

    container.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-around; font-family:var(--font-heading); margin-bottom:10px; font-size:1.05rem;">
          <span style="color:#d4a843;">Player 1: <span id="p1-score">0</span></span>
          <span style="color:#38bdf8;">Player 2: <span id="p2-score">0</span></span>
        </div>
        <div id="dots-status" style="color:var(--text-secondary); margin-bottom:14px; font-size:0.9rem;">Player 1's Turn (Click lines between dots)</div>
        <div id="dots-grid" style="position:relative; width:220px; height:220px; margin:0 auto; background:#181818; padding:20px; border-radius:16px; border:2px solid rgba(212,168,67,0.3);"></div>
        <button id="dots-reset" class="btn btn--outline" style="margin-top:16px; padding:8px 20px; font-size:0.85rem;">Reset Dots Game</button>
      </div>
    `;

    const gridEl = container.querySelector('#dots-grid');
    const p1El = container.querySelector('#p1-score');
    const p2El = container.querySelector('#p2-score');
    const statusEl = container.querySelector('#dots-status');
    const resetBtn = container.querySelector('#dots-reset');

    function renderDots() {
      gridEl.innerHTML = '';
      // Render 3x3 Dots Grid
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const dot = document.createElement('div');
          dot.style.cssText = `position:absolute; left:${c * 90 + 15}px; top:${r * 90 + 15}px; width:14px; height:14px; background:#fff; border-radius:50%; box-shadow:0 0 8px #fff; z-index:3;`;
          gridEl.appendChild(dot);
        }
      }

      // Render Horizontal Lines
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size - 1; c++) {
          const idx = r * (size - 1) + c;
          const line = document.createElement('button');
          line.style.cssText = `position:absolute; left:${c * 90 + 25}px; top:${r * 90 + 18}px; width:75px; height:8px; border-radius:4px; border:none; cursor:pointer; z-index:2; background:${hLines[idx] ? (turn === 1 ? '#d4a843' : '#38bdf8') : 'rgba(255,255,255,0.15)'};`;
          if (!hLines[idx]) {
            line.addEventListener('click', () => clickHLine(idx));
          }
          gridEl.appendChild(line);
        }
      }

      // Render Vertical Lines
      for (let r = 0; r < size - 1; r++) {
        for (let c = 0; c < size; c++) {
          const idx = r * size + c;
          const line = document.createElement('button');
          line.style.cssText = `position:absolute; left:${c * 90 + 18}px; top:${r * 90 + 25}px; width:8px; height:75px; border-radius:4px; border:none; cursor:pointer; z-index:2; background:${vLines[idx] ? (turn === 1 ? '#d4a843' : '#38bdf8') : 'rgba(255,255,255,0.15)'};`;
          if (!vLines[idx]) {
            line.addEventListener('click', () => clickVLine(idx));
          }
          gridEl.appendChild(line);
        }
      }
    }

    function clickHLine(idx) {
      hLines[idx] = true;
      let scored = checkBoxes();
      if (!scored) turn = turn === 1 ? 2 : 1;
      statusEl.textContent = `Player ${turn}'s Turn`;
      renderDots();
    }

    function clickVLine(idx) {
      vLines[idx] = true;
      let scored = checkBoxes();
      if (!scored) turn = turn === 1 ? 2 : 1;
      statusEl.textContent = `Player ${turn}'s Turn`;
      renderDots();
    }

    function checkBoxes() {
      let scored = false;
      // 2x2 boxes
      const check = [
        { h1: 0, h2: 2, v1: 0, v2: 1, b: 0 },
        { h1: 1, h2: 3, v1: 1, v2: 2, b: 1 },
        { h1: 2, h2: 4, v1: 3, v2: 4, b: 2 },
        { h1: 3, h2: 5, v1: 4, v2: 5, b: 3 }
      ];

      check.forEach(item => {
        if (boxes[item.b] === null && hLines[item.h1] && hLines[item.h2] && vLines[item.v1] && vLines[item.v2]) {
          boxes[item.b] = turn;
          if (turn === 1) p1Score++; else p2Score++;
          scored = true;
        }
      });

      p1El.textContent = p1Score;
      p2El.textContent = p2Score;
      return scored;
    }

    resetBtn.addEventListener('click', () => {
      hLines = Array(6).fill(false);
      vLines = Array(6).fill(false);
      boxes = Array(4).fill(null);
      p1Score = 0; p2Score = 0; turn = 1;
      p1El.textContent = '0'; p2El.textContent = '0';
      statusEl.textContent = "Player 1's Turn";
      renderDots();
    });

    renderDots();
  }

  // 6. SLIDING PUZZLE GAME (3x3 Grid)
  function startSlidingPuzzle(container) {
    let board = [1, 2, 3, 4, 5, 6, 7, 8, ''];
    let moves = 0;

    container.innerHTML = `
      <div style="text-align:center;">
        <div style="font-family:var(--font-heading); color:var(--accent); font-size:1.1rem; margin-bottom:10px;">Moves: <span id="sp-moves">0</span></div>
        <div id="sp-grid" style="display:grid; grid-template-columns:repeat(3, 90px); gap:8px; margin:0 auto; width:max-content; background:#1a1a1a; padding:12px; border-radius:16px; border:2px solid rgba(212,168,67,0.3);"></div>
        <button id="sp-shuffle" class="btn btn--outline" style="margin-top:16px; padding:8px 20px; font-size:0.85rem;">Shuffle Puzzle</button>
      </div>
    `;

    const gridEl = container.querySelector('#sp-grid');
    const movesEl = container.querySelector('#sp-moves');
    const shuffleBtn = container.querySelector('#sp-shuffle');

    function renderBoard() {
      gridEl.innerHTML = '';
      board.forEach((val, idx) => {
        const tile = document.createElement('button');
        tile.textContent = val;
        tile.setAttribute('data-idx', idx);
        tile.className = 'sp-tile';
        tile.style.cssText = val === '' 
          ? 'width:90px; height:90px; border-radius:12px; background:transparent; border:2px dashed rgba(255,255,255,0.1); cursor:default;'
          : 'width:90px; height:90px; border-radius:12px; background:#282828; border:2px solid rgba(212,168,67,0.4); color:#fff; font-size:1.8rem; font-weight:bold; cursor:pointer; font-family:var(--font-heading); transition:transform 0.15s ease;';
        
        tile.addEventListener('click', () => handleTileClick(idx));
        gridEl.appendChild(tile);
      });
    }

    function handleTileClick(idx) {
      const emptyIdx = board.indexOf('');
      const isValidMove = [idx - 1, idx + 1, idx - 3, idx + 3].includes(emptyIdx) &&
        (Math.abs(Math.floor(idx / 3) - Math.floor(emptyIdx / 3)) + Math.abs((idx % 3) - (emptyIdx % 3)) === 1);

      if (isValidMove) {
        board[emptyIdx] = board[idx];
        board[idx] = '';
        moves++;
        movesEl.textContent = moves;
        renderBoard();
        checkWin();
      }
    }

    function checkWin() {
      const winPattern = [1, 2, 3, 4, 5, 6, 7, 8, ''];
      if (board.every((val, i) => val === winPattern[i])) {
        movesEl.textContent = `${moves} 🎉 SOLVED!`;
      }
    }

    function shuffle() {
      for (let i = 0; i < 100; i++) {
        const emptyIdx = board.indexOf('');
        const validIndices = [emptyIdx - 1, emptyIdx + 1, emptyIdx - 3, emptyIdx + 3].filter(i => i >= 0 && i < 9);
        const randomIdx = validIndices[Math.floor(Math.random() * validIndices.length)];
        board[emptyIdx] = board[randomIdx];
        board[randomIdx] = '';
      }
      moves = 0;
      movesEl.textContent = '0';
      renderBoard();
    }

    shuffleBtn.addEventListener('click', shuffle);
    shuffle();
  }

  // 5. CANDY CRUSH MATCH-3 GAME
  function startCandyCrush(container) {
    const width = 6;
    const candyColors = ['🔴', '🟡', '🟢', '🔵', '🟣', '🟠'];
    let board = [];
    let score = 0;

    container.innerHTML = `
      <div style="text-align:center;">
        <div style="font-family:var(--font-heading); color:var(--accent); font-size:1.1rem; margin-bottom:10px;">Score: <span id="cc-score">0</span></div>
        <div id="cc-grid" style="display:grid; grid-template-columns:repeat(6, 46px); gap:6px; margin:0 auto; width:max-content; background:#1e1e1e; padding:12px; border-radius:16px; border:2px solid rgba(212,168,67,0.3);"></div>
        <button id="cc-reset" class="btn btn--outline" style="margin-top:16px; padding:8px 20px; font-size:0.85rem;">New Candy Board</button>
      </div>
    `;

    const gridEl = container.querySelector('#cc-grid');
    const scoreEl = container.querySelector('#cc-score');
    const resetBtn = container.querySelector('#cc-reset');

    function createBoard() {
      board = [];
      gridEl.innerHTML = '';
      for (let i = 0; i < width * width; i++) {
        const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
        board.push(randomColor);
        const tile = document.createElement('button');
        tile.setAttribute('data-id', i);
        tile.className = 'cc-tile';
        tile.textContent = randomColor;
        tile.style.cssText = 'width:46px; height:46px; border-radius:10px; border:1px solid rgba(255,255,255,0.1); background:#282828; font-size:1.4rem; cursor:pointer; font-family:sans-serif;';
        gridEl.appendChild(tile);
      }
      checkMatches();
    }

    let firstSelected = null;

    gridEl.addEventListener('click', (e) => {
      const target = e.target.closest('.cc-tile');
      if (!target) return;
      const index = parseInt(target.getAttribute('data-id'));

      if (firstSelected === null) {
        firstSelected = index;
        target.style.borderColor = '#d4a843';
        target.style.background = '#44340d';
      } else {
        const firstTile = gridEl.children[firstSelected];
        firstTile.style.borderColor = 'rgba(255,255,255,0.1)';
        firstTile.style.background = '#282828';

        const isAdjacent = [firstSelected - 1, firstSelected + 1, firstSelected - width, firstSelected + width].includes(index);

        if (isAdjacent) {
          // Swap
          const temp = board[firstSelected];
          board[firstSelected] = board[index];
          board[index] = temp;

          gridEl.children[firstSelected].textContent = board[firstSelected];
          gridEl.children[index].textContent = board[index];

          score += 15;
          scoreEl.textContent = score;
          checkMatches();
        }
        firstSelected = null;
      }
    });

    function checkMatches() {
      // Row 3-in-a-row match check
      for (let i = 0; i < 36; i++) {
        const rowOfThree = [i, i + 1, i + 2];
        if (i % width < width - 2) {
          const decidedColor = board[i];
          if (decidedColor && rowOfThree.every(idx => board[idx] === decidedColor)) {
            rowOfThree.forEach(idx => {
              board[idx] = candyColors[Math.floor(Math.random() * candyColors.length)];
              gridEl.children[idx].textContent = board[idx];
            });
            score += 30;
            scoreEl.textContent = score;
          }
        }
      }
    }

    resetBtn.addEventListener('click', createBoard);
    createBoard();
  }

  // 1. TIC TAC TOE
  function startTicTacToe(container) {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    container.innerHTML = `
      <div style="text-align:center;">
        <div id="ttt-status" style="font-family:var(--font-heading); font-size:1.2rem; color:var(--accent); margin-bottom:16px;">Player X's Turn</div>
        <div style="display:grid; grid-template-columns:repeat(3, 90px); gap:10px; margin:0 auto; width:max-content;">
          ${board.map((_, i) => `<button class="ttt-cell" data-index="${i}" style="width:90px; height:90px; background:#1e1e1e; border:2px solid rgba(212,168,67,0.3); border-radius:12px; font-size:2.2rem; font-weight:bold; color:#fff; cursor:pointer; font-family:var(--font-heading);"></button>`).join('')}
        </div>
        <button id="ttt-reset" class="btn btn--outline" style="margin-top:20px; padding:10px 24px; font-size:0.9rem;">Restart Game</button>
      </div>
    `;

    const statusDisplay = container.querySelector('#ttt-status');
    const cells = container.querySelectorAll('.ttt-cell');
    const resetBtn = container.querySelector('#ttt-reset');

    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        const index = parseInt(cell.getAttribute('data-index'));
        if (board[index] !== '' || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? '#d4a843' : '#38bdf8';

        checkResult();
      });
    });

    function checkResult() {
      let roundWon = false;
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        statusDisplay.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
      }

      if (!board.includes('')) {
        statusDisplay.textContent = `🤝 Game Draw!`;
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }

    resetBtn.addEventListener('click', () => {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
      statusDisplay.textContent = `Player X's Turn`;
      cells.forEach(cell => { cell.textContent = ''; });
    });
  }

  // 2. SNAKE GAME
  function startSnakeGame(container) {
    container.innerHTML = `
      <div style="text-align:center;">
        <div style="font-family:var(--font-heading); color:var(--accent); font-size:1.1rem; margin-bottom:10px;">Score: <span id="snake-score">0</span></div>
        <canvas id="snake-canvas" width="340" height="340" style="background:#141414; border:2px solid rgba(212,168,67,0.3); border-radius:12px; display:block; margin:0 auto;"></canvas>
        <div style="margin-top:12px; font-size:0.85rem; color:#a0a0a0;">Use Arrow Keys or Swipe to Control Snake</div>
      </div>
    `;

    const canvas = container.querySelector('#snake-canvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = container.querySelector('#snake-score');

    const grid = 17;
    let count = 0;
    let score = 0;

    let snake = { x: 170, y: 170, dx: grid, dy: 0, cells: [], maxCells: 4 };
    let apple = { x: 85, y: 85 };

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function loop() {
      currentGameLoop = requestAnimationFrame(loop);

      if (++count < 6) return; // speed control
      count = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snake.x += snake.dx;
      snake.y += snake.dy;

      // Wrap around walls
      if (snake.x < 0) snake.x = canvas.width - grid;
      else if (snake.x >= canvas.width) snake.x = 0;
      if (snake.y < 0) snake.y = canvas.height - grid;
      else if (snake.y >= canvas.height) snake.y = 0;

      snake.cells.unshift({ x: snake.x, y: snake.y });

      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }

      // Draw Apple
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

      // Draw Snake
      snake.cells.forEach((cell, index) => {
        ctx.fillStyle = index === 0 ? '#d4a843' : '#22c55e';
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
          snake.maxCells++;
          score += 10;
          scoreDisplay.textContent = score;
          apple.x = getRandomInt(0, 20) * grid;
          apple.y = getRandomInt(0, 20) * grid;
        }

        // Self collision check
        for (let i = index + 1; i < snake.cells.length; i++) {
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            snake.x = 170;
            snake.y = 170;
            snake.cells = [];
            snake.maxCells = 4;
            snake.dx = grid;
            snake.dy = 0;
            score = 0;
            scoreDisplay.textContent = score;
            apple.x = getRandomInt(0, 20) * grid;
            apple.y = getRandomInt(0, 20) * grid;
          }
        }
      });
    }

    const handleKeydown = (e) => {
      if (e.key === 'ArrowLeft' && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
      else if (e.key === 'ArrowUp' && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; }
      else if (e.key === 'ArrowRight' && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
      else if (e.key === 'ArrowDown' && snake.dy === 0) { snake.dy = grid; snake.dx = 0; }
    };

    window.addEventListener('keydown', handleKeydown);
    loop();
  }

  // 3. SNAKE & LADDER
  function startSnakeLadderGame(container) {
    let playerPos = 1;
    let computerPos = 1;

    container.innerHTML = `
      <div style="text-align:center;">
        <div style="display:flex; justify-content:space-around; font-family:var(--font-heading); margin-bottom:12px; font-size:1.1rem;">
          <span style="color:#d4a843;">Player: Square <span id="p-pos">1</span></span>
          <span style="color:#ef4444;">AI: Square <span id="c-pos">1</span></span>
        </div>
        <div id="sl-status" style="color:var(--text-secondary); margin-bottom:16px; font-size:0.95rem;">Click 'Roll Dice' to play!</div>
        <div style="font-size:3.5rem; margin-bottom:16px;" id="sl-dice">🎲</div>
        <button id="sl-roll-btn" class="btn btn--primary" style="padding:12px 32px;">Roll Dice</button>
      </div>
    `;

    const pPosEl = container.querySelector('#p-pos');
    const cPosEl = container.querySelector('#c-pos');
    const statusEl = container.querySelector('#sl-status');
    const diceEl = container.querySelector('#sl-dice');
    const rollBtn = container.querySelector('#sl-roll-btn');

    const snakesLadders = {
      4: 14, 9: 31, 17: 7, 20: 38, 28: 84,
      40: 59, 51: 67, 54: 34, 62: 19, 64: 60,
      71: 91, 87: 24, 93: 73, 95: 75, 99: 78
    };

    const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

    rollBtn.addEventListener('click', () => {
      rollBtn.disabled = true;
      const roll = Math.floor(Math.random() * 6) + 1;
      diceEl.textContent = diceFaces[roll - 1];

      playerPos += roll;
      if (snakesLadders[playerPos]) {
        const dest = snakesLadders[playerPos];
        statusEl.textContent = dest > playerPos ? `🪜 Ladder up to ${dest}!` : `🐍 Snake down to ${dest}!`;
        playerPos = dest;
      } else {
        statusEl.textContent = `You moved ${roll} steps forward.`;
      }

      if (playerPos >= 100) {
        playerPos = 100;
        pPosEl.textContent = playerPos;
        statusEl.textContent = '🎉 You Won the Game!';
        return;
      }
      pPosEl.textContent = playerPos;

      // Computer Turn
      setTimeout(() => {
        const aiRoll = Math.floor(Math.random() * 6) + 1;
        computerPos += aiRoll;
        if (snakesLadders[computerPos]) computerPos = snakesLadders[computerPos];
        if (computerPos >= 100) {
          computerPos = 100;
          cPosEl.textContent = computerPos;
          statusEl.textContent = '🤖 Computer Won!';
          return;
        }
        cPosEl.textContent = computerPos;
        rollBtn.disabled = false;
      }, 1000);
    });
  }

  // 4. FLAPPY BIRD
  function startFlappyBird(container) {
    container.innerHTML = `
      <div style="text-align:center;">
        <div style="font-family:var(--font-heading); color:var(--accent); font-size:1.1rem; margin-bottom:10px;">Score: <span id="fb-score">0</span></div>
        <canvas id="fb-canvas" width="320" height="380" style="background:#0e1726; border:2px solid rgba(212,168,67,0.3); border-radius:12px; display:block; margin:0 auto;"></canvas>
        <div style="margin-top:12px; font-size:0.85rem; color:#a0a0a0;">Press Spacebar or Click Canvas to Flap</div>
      </div>
    `;

    const canvas = container.querySelector('#fb-canvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = container.querySelector('#fb-score');

    let birdY = 180;
    let velocity = 0;
    let gravity = 0.45;
    let score = 0;
    let pipes = [];
    let frame = 0;

    function flap() {
      velocity = -7;
    }

    canvas.addEventListener('click', flap);
    const flapKey = (e) => { if (e.code === 'Space') { flap(); e.preventDefault(); } };
    window.addEventListener('keydown', flapKey);

    function loop() {
      currentGameLoop = requestAnimationFrame(loop);
      frame++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      velocity += gravity;
      birdY += velocity;

      // Draw Bird
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(80, birdY, 12, 0, Math.PI * 2);
      ctx.fill();

      // Spawn Pipes
      if (frame % 90 === 0) {
        const pipeGap = 100;
        const pipeTopHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 80)) + 40;
        pipes.push({
          x: canvas.width,
          top: pipeTopHeight,
          bottom: canvas.height - (pipeTopHeight + pipeGap)
        });
      }

      // Update & Draw Pipes
      for (let i = pipes.length - 1; i >= 0; i--) {
        const p = pipes[i];
        p.x -= 2;

        ctx.fillStyle = '#22c55e';
        ctx.fillRect(p.x, 0, 48, p.top);
        ctx.fillRect(p.x, canvas.height - p.bottom, 48, p.bottom);

        // Collision Check
        if (
          80 + 12 > p.x && 80 - 12 < p.x + 48 &&
          (birdY - 12 < p.top || birdY + 12 > canvas.height - p.bottom)
        ) {
          // Game Over Reset
          birdY = 180;
          velocity = 0;
          pipes = [];
          score = 0;
          scoreDisplay.textContent = score;
        }

        // Score increment
        if (p.x + 48 === 80) {
          score++;
          scoreDisplay.textContent = score;
        }

        if (p.x < -48) pipes.splice(i, 1);
      }

      // Floor & Ceiling Collision
      if (birdY > canvas.height - 12 || birdY < 12) {
        birdY = 180;
        velocity = 0;
        pipes = [];
        score = 0;
        scoreDisplay.textContent = score;
      }
    }

    loop();
  }
}


/* ---------- Custom Glowing Mouse Follower Cursor ---------- */
function initCustomCursor() {
  if (window.innerWidth <= 768) return;

  const glow = document.createElement('div');
  glow.className = 'custom-cursor-glow';
  document.body.appendChild(glow);

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  document.body.appendChild(dot);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let glowX = mouseX;
  let glowY = mouseY;
  let dotX = mouseX;
  let dotY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation loop
  function renderCursor() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;

    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover detection over interactive elements
  const interactiveSelectors = 'a, button, input, textarea, select, .glass-card, .value-card, .testimonial-card, .gallery-item, .nav-link';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}


/* ---------- 3D Floating Tech Stack Spheres Physics & Logos ---------- */
function initFloatingSpheres() {
  const canvas = document.getElementById('tech-spheres-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const tooltip = document.getElementById('sphere-tooltip');

  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  // Comprehensive Tool Catalog with Logo Rendering Instructions
  const tools = [
    // Adobe Suite
    { name: 'Adobe Photoshop', type: 'adobe', brand: 'Ps', color: '#31a8ff', bg: '#001e36' },
    { name: 'Adobe Illustrator', type: 'adobe', brand: 'Ai', color: '#ff9a00', bg: '#330000' },
    { name: 'Adobe Premiere Pro', type: 'adobe', brand: 'Pr', color: '#ea77ff', bg: '#00005b' },
    { name: 'Adobe After Effects', type: 'adobe', brand: 'Ae', color: '#cf96fd', bg: '#00005b' },
    { name: 'Adobe XD', type: 'adobe', brand: 'Xd', color: '#ff61f6', bg: '#3b0038' },
    { name: 'Adobe Firefly', type: 'adobe', brand: 'Ff', color: '#ff2a00', bg: '#380900' },

    // Design & 3D
    { name: 'Canva Pro', type: 'canva', brand: 'Canva', color: '#00c4cc', bg: '#00373a' },
    { name: 'Figma', type: 'figma', brand: 'Figma', color: '#f24e1e', bg: '#380e02' },
    { name: 'Framer', type: 'badge', brand: 'Fr', color: '#0055ff', bg: '#001133' },
    { name: 'Blender 3D', type: 'badge', brand: 'Blender', color: '#e87d0d', bg: '#331a00' },
    { name: '3ds Max', type: 'badge', brand: '3ds Max', color: '#06b6d4', bg: '#00252c' },
    { name: 'Autodesk Maya', type: 'badge', brand: 'Maya', color: '#10b981', bg: '#00281b' },
    { name: 'KineMaster', type: 'badge', brand: 'Kine', color: '#ff4949', bg: '#3d0000' },

    // AI Tools
    { name: 'ChatGPT (OpenAI)', type: 'openai', brand: 'GPT', color: '#10a37f', bg: '#03241b' },
    { name: 'Claude AI (Anthropic)', type: 'badge', brand: 'Claude', color: '#d97706', bg: '#331700' },
    { name: 'Google Gemini', type: 'badge', brand: 'Gemini', color: '#4285f4', bg: '#081a3d' },
    { name: 'Midjourney', type: 'badge', brand: 'Midjourney', color: '#8b5cf6', bg: '#1d0b38' },
    { name: 'Suno AI', type: 'badge', brand: 'Suno', color: '#ec4899', bg: '#3b0820' },
    { name: 'NotebookLM', type: 'badge', brand: 'Notebook', color: '#3b82f6', bg: '#0b1d3a' },

    // Languages & Web Tech
    { name: 'HTML5', type: 'html', brand: 'HTML5', color: '#e34f26', bg: '#381005' },
    { name: 'CSS3', type: 'css', brand: 'CSS3', color: '#1572b6', bg: '#041829' },
    { name: 'JavaScript', type: 'js', brand: 'JS', color: '#f7df1e', bg: '#383200' },
    { name: 'Python', type: 'python', brand: 'Python', color: '#3776ab', bg: '#091c2b' },
    { name: 'Node.js', type: 'node', brand: 'Node', color: '#339933', bg: '#0a260a' },
    { name: 'Next.js', type: 'badge', brand: 'NEXT.JS', color: '#ffffff', bg: '#1a1a1a' },
    { name: 'PHP', type: 'badge', brand: 'PHP', color: '#777bb4', bg: '#18192b' },
    { name: 'Java', type: 'badge', brand: 'Java', color: '#007396', bg: '#001a24' },
    { name: 'Go Language', type: 'badge', brand: 'Golang', color: '#00add8', bg: '#002630' },
    { name: 'Kotlin', type: 'badge', brand: 'Kotlin', color: '#7f52ff', bg: '#1c103b' },
    { name: 'Flutter', type: 'badge', brand: 'Flutter', color: '#02569b', bg: '#001324' },

    // Cloud, DB & Platforms
    { name: 'Amazon Web Services', type: 'badge', brand: 'AWS', color: '#ff9900', bg: '#382200' },
    { name: 'Google Cloud (GCP)', type: 'badge', brand: 'GCP', color: '#4285f4', bg: '#061638' },
    { name: 'Microsoft Azure', type: 'badge', brand: 'Azure', color: '#0089d6', bg: '#001d2e' },
    { name: 'Docker', type: 'badge', brand: 'Docker', color: '#2496ed', bg: '#041f33' },
    { name: 'Supabase', type: 'badge', brand: 'Supabase', color: '#3ecf8e', bg: '#072e1e' },
    { name: 'MongoDB', type: 'badge', brand: 'MongoDB', color: '#47a248', bg: '#0d290e' },
    { name: 'MySQL', type: 'badge', brand: 'MySQL', color: '#4479a1', bg: '#0d1e2b' },
    { name: 'Vercel', type: 'badge', brand: 'Vercel', color: '#ffffff', bg: '#111111' },
    { name: 'GitHub', type: 'github', brand: 'GitHub', color: '#ffffff', bg: '#161b22' },
    { name: 'Zapier Automation', type: 'badge', brand: 'Zapier', color: '#ff4a00', bg: '#381000' },
    { name: 'LinkedIn', type: 'linkedin', brand: 'in', color: '#0a66c2', bg: '#01172e' },
    { name: 'Dribbble', type: 'badge', brand: 'Dribbble', color: '#ea4c89', bg: '#380a1d' },
    { name: 'Behance', type: 'badge', brand: 'Behance', color: '#1769ff', bg: '#021538' },
    { name: 'CodePen', type: 'badge', brand: 'CodePen', color: '#ffffff', bg: '#222222' }
  ];

  class Sphere {
    constructor(tool, index, total) {
      this.tool = tool;
      const baseRadius = Math.min(width * 0.04, 34);
      this.radius = Math.max(22, baseRadius + Math.random() * 6); // Responsive sphere size
      
      // Cluster initially around center
      const angle = (index / total) * Math.PI * 2;
      const dist = 30 + Math.random() * (width < 600 ? 90 : 160);
      this.x = width / 2 + Math.cos(angle) * dist;
      this.y = height / 2 + Math.sin(angle) * dist;

      // Initial ambient velocities
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;

      this.mass = this.radius;
      this.isHovered = false;
      this.rotation = (Math.random() - 0.5) * 0.4;
      this.vRot = (Math.random() - 0.5) * 0.02;
    }

    update(spheres, mouse) {
      // Gentle floating gravity pull toward center so spheres don't escape
      const cx = width / 2;
      const cy = height / 2;
      const dxCenter = cx - this.x;
      const dyCenter = cy - this.y;
      
      this.vx += dxCenter * 0.00015;
      this.vy += dyCenter * 0.00015;

      // Mouse contact scatter & impulse physics ("move here and there")
      if (mouse.x !== null) {
        const mdx = this.x - mouse.x;
        const mdy = this.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        const touchRadius = this.radius + 65;

        if (mdist < touchRadius && mdist > 0) {
          // Calculate scatter force based on mouse movement speed and proximity
          const force = (touchRadius - mdist) / touchRadius;
          const pushAngle = Math.atan2(mdy, mdx);

          // Dynamic impulse force - scatter balls away violently when touched!
          const scatterSpeed = 3.5 + Math.hypot(mouse.vx, mouse.vy) * 0.4;
          this.vx += Math.cos(pushAngle) * force * scatterSpeed;
          this.vy += Math.sin(pushAngle) * force * scatterSpeed;
          this.vRot += (Math.random() - 0.5) * 0.1;
        }

        // Check hover
        this.isHovered = mdist < this.radius;
      } else {
        this.isHovered = false;
      }

      // Elastic sphere-to-sphere collision physics
      for (let i = 0; i < spheres.length; i++) {
        const other = spheres[i];
        if (other === this) continue;

        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const dist = Math.hypot(dx, dy);
        const minDist = this.radius + other.radius + 2;

        if (dist < minDist && dist > 0) {
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;

          // Separate spheres
          this.x -= nx * overlap * 0.5;
          this.y -= ny * overlap * 0.5;
          other.x += nx * overlap * 0.5;
          other.y += ny * overlap * 0.5;

          // Elastic bounce momentum transfer
          const kx = this.vx - other.vx;
          const ky = this.vy - other.vy;
          const p = 2 * (nx * kx + ny * ky) / (this.mass + other.mass);

          this.vx -= p * other.mass * nx * 0.85;
          this.vy -= p * other.mass * ny * 0.85;
          other.vx += p * this.mass * nx * 0.85;
          other.vy += p * this.mass * ny * 0.85;
        }
      }

      // Boundary bouncing with dampening
      const padding = this.radius + 5;
      if (this.x < padding) { this.x = padding; this.vx *= -0.85; }
      if (this.x > width - padding) { this.x = width - padding; this.vx *= -0.85; }
      if (this.y < padding) { this.y = padding; this.vy *= -0.85; }
      if (this.y > height - padding) { this.y = height - padding; this.vy *= -0.85; }

      // Air resistance friction
      this.vx *= 0.975;
      this.vy *= 0.975;

      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.vRot;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);

      // 3D Soft Shadow underneath
      ctx.beginPath();
      ctx.ellipse(0, this.radius * 0.88, this.radius * 0.8, this.radius * 0.22, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fill();

      // Base Glossy 3D White Sphere Gradient
      const grad = ctx.createRadialGradient(
        -this.radius * 0.3,
        -this.radius * 0.35,
        this.radius * 0.1,
        0, 0,
        this.radius
      );

      if (this.isHovered) {
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, '#fff4d0');
        grad.addColorStop(0.75, '#d4a843');
        grad.addColorStop(1, '#57410c');
      } else {
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.35, '#f5f2eb');
        grad.addColorStop(0.8, '#ded7ca');
        grad.addColorStop(1, '#9e9687');
      }

      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.shadowColor = this.isHovered ? 'rgba(212, 168, 67, 0.7)' : 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = this.isHovered ? 30 : 12;
      ctx.fill();

      // Specular Highlighting (3D Gloss Reflection)
      ctx.beginPath();
      ctx.arc(-this.radius * 0.25, -this.radius * 0.3, this.radius * 0.42, 0, Math.PI * 2);
      const specGrad = ctx.createRadialGradient(
        -this.radius * 0.25, -this.radius * 0.3, 0,
        -this.radius * 0.25, -this.radius * 0.3, this.radius * 0.42
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specGrad;
      ctx.fill();

      // Render Upright Official Tool Logo Graphics Inside Sphere
      this.drawToolLogo(ctx);

      ctx.restore();
    }

    drawToolLogo(ctx) {
      const type = this.tool.type;
      const brand = this.tool.brand;
      const color = this.tool.color;
      const r = this.radius * 0.55;

      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 4;

      if (type === 'adobe') {
        // Adobe Official Square Badge with Brand Text
        ctx.fillStyle = this.tool.bg;
        ctx.beginPath();
        ctx.roundRect(-r * 0.8, -r * 0.8, r * 1.6, r * 1.6, r * 0.3);
        ctx.fill();

        ctx.font = `900 ${r * 0.8}px "Outfit", sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(brand, 0, 1);
      } 
      else if (type === 'js') {
        // JS Yellow Badge
        ctx.fillStyle = '#f7df1e';
        ctx.beginPath();
        ctx.roundRect(-r * 0.75, -r * 0.75, r * 1.5, r * 1.5, r * 0.2);
        ctx.fill();
        ctx.font = `900 ${r * 0.7}px "Outfit", sans-serif`;
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText('JS', r * 0.65, r * 0.65);
      }
      else if (type === 'html') {
        // HTML5 Shield Emblem
        ctx.fillStyle = '#e34f26';
        ctx.beginPath();
        ctx.moveTo(-r * 0.6, -r * 0.7);
        ctx.lineTo(r * 0.6, -r * 0.7);
        ctx.lineTo(r * 0.5, r * 0.5);
        ctx.lineTo(0, r * 0.8);
        ctx.lineTo(-r * 0.5, r * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.font = `900 ${r * 0.55}px "Outfit", sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('5', 0, 0);
      }
      else if (type === 'css') {
        // CSS3 Shield Emblem
        ctx.fillStyle = '#1572b6';
        ctx.beginPath();
        ctx.moveTo(-r * 0.6, -r * 0.7);
        ctx.lineTo(r * 0.6, -r * 0.7);
        ctx.lineTo(r * 0.5, r * 0.5);
        ctx.lineTo(0, r * 0.8);
        ctx.lineTo(-r * 0.5, r * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.font = `900 ${r * 0.55}px "Outfit", sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('3', 0, 0);
      }
      else if (type === 'figma') {
        // Figma 4-Dot Emblem
        ctx.fillStyle = '#f24e1e';
        ctx.beginPath(); ctx.arc(-r * 0.35, -r * 0.35, r * 0.35, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ff7262';
        ctx.beginPath(); ctx.arc(r * 0.35, -r * 0.35, r * 0.35, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#a259ff';
        ctx.beginPath(); ctx.arc(-r * 0.35, r * 0.35, r * 0.35, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#1abcfe';
        ctx.beginPath(); ctx.arc(r * 0.35, r * 0.35, r * 0.35, 0, Math.PI * 2); ctx.fill();
      }
      else if (type === 'linkedin') {
        // LinkedIn in Square
        ctx.fillStyle = '#0a66c2';
        ctx.beginPath();
        ctx.roundRect(-r * 0.75, -r * 0.75, r * 1.5, r * 1.5, r * 0.25);
        ctx.fill();
        ctx.font = `900 ${r * 0.85}px "Outfit", sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('in', 0, -1);
      }
      else {
        // Clean Stylized Brand Pill Badge
        ctx.fillStyle = color;
        ctx.font = `900 ${Math.min(r * 0.55, 14)}px "Outfit", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(brand, 0, 1);
      }
    }
  }

  const spheres = tools.map((t, i) => new Sphere(t, i, tools.length));

  const mouse = { x: null, y: null, vx: 0, vy: 0, lastX: null, lastY: null };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    if (mouse.lastX !== null) {
      mouse.vx = currentX - mouse.lastX;
      mouse.vy = currentY - mouse.lastY;
    }

    mouse.x = currentX;
    mouse.y = currentY;
    mouse.lastX = currentX;
    mouse.lastY = currentY;

    let hovered = null;
    spheres.forEach(s => {
      if (s.isHovered) hovered = s;
    });

    if (hovered && tooltip) {
      tooltip.textContent = hovered.tool.name;
      tooltip.style.left = `${mouse.x}px`;
      tooltip.style.top = `${mouse.y}px`;
      tooltip.style.opacity = '1';
    } else if (tooltip) {
      tooltip.style.opacity = '0';
    }
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    mouse.lastX = null;
    mouse.lastY = null;
    mouse.vx = 0;
    mouse.vy = 0;
    if (tooltip) tooltip.style.opacity = '0';
  });

  // Touch support for mobile contact & dragging
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.touches[0].clientX - rect.left;
      const currentY = e.touches[0].clientY - rect.top;

      if (mouse.lastX !== null) {
        mouse.vx = currentX - mouse.lastX;
        mouse.vy = currentY - mouse.lastY;
      }

      mouse.x = currentX;
      mouse.y = currentY;
      mouse.lastX = currentX;
      mouse.lastY = currentY;
    }
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
    mouse.lastX = null;
    mouse.lastY = null;
  });

  function loop() {
    ctx.clearRect(0, 0, width, height);

    spheres.forEach(s => s.update(spheres, mouse));
    spheres.forEach(s => s.draw(ctx));

    requestAnimationFrame(loop);
  }

  loop();
}



/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Active link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after revealing to save performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ---------- Animated Counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(start + (target - start) * easedProgress);

      el.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/* ---------- Floating Particles ---------- */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${6 + Math.random() * 6}s`;
    particle.style.width = `${2 + Math.random() * 3}px`;
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/* ---------- Form Validation ---------- */
function initFormValidation() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    let isValid = true;

    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.form-input, .form-textarea').forEach(el => {
      el.style.borderColor = '';
    });

    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        showFieldError(field, 'This field is required');
      }
    });

    // Validate email
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value.trim())) {
        isValid = false;
        showFieldError(emailField, 'Please enter a valid email');
      }
    }

    if (isValid) {
      const fname = document.getElementById('first-name').value.trim();
      const lname = document.getElementById('last-name').value.trim();
      const email = emailField ? emailField.value.trim() : '';
      const subject = document.getElementById('subject').value.trim();
      const msg = document.getElementById('message').value.trim();

      // Send push notification via ntfy.sh
      fetch('https://ntfy.sh/stories_ideas_creator_leads', {
        method: 'POST',
        body: `Name: ${fname} ${lname}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${msg}`,
        headers: {
          'Title': 'New Contact Form Lead!',
          'Tags': 'envelope,sparkles'
        }
      }).catch(err => console.log('Ntfy error', err));

      // Send Email via Web3Forms (Free & Works with ProtonMail)
      // IMPORTANT: Replace "YOUR_WEB3FORMS_ACCESS_KEY" with your actual key from https://web3forms.com/
      const WEB3FORMS_ACCESS_KEY = "66a859b1-1289-4d33-96d7-80fb1071eb4a"; 
      
      if (WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY") {
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            from_name: "Stories Ideas Creator Website",
            subject: `New Lead: ${subject}`,
            name: `${fname} ${lname}`,
            email: email,
            message: msg
          }),
        }).catch(err => console.log('Web3Forms error', err));
      }

      // Show success
      const submitBtn = form.querySelector('.btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = '#22c55e';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        form.reset();
      }, 3000);
    }
  });
}

function showFieldError(field, message) {
  field.style.borderColor = '#ef4444';
  const error = document.createElement('span');
  error.className = 'form-error';
  error.textContent = message;
  error.style.cssText = 'color: #ef4444; font-size: 0.75rem; margin-top: 4px; display: block;';
  field.parentNode.appendChild(error);
}

/* ---------- Live Public Review Submission Engine ---------- */
function initReviewSubmission() {
  const form = document.getElementById('public-review-form');
  const container = document.getElementById('reviews-container');
  if (!container) return;

  // Load existing reviews from localStorage
  const savedReviews = JSON.parse(localStorage.getItem('user_submitted_reviews') || '[]');
  savedReviews.forEach(r => renderReviewCard(container, r));

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('review-name').value.trim();
    const role = document.getElementById('review-role').value.trim();
    const rating = parseInt(document.getElementById('review-rating').value, 10);
    const text = document.getElementById('review-text').value.trim();
    const successMsg = document.getElementById('review-success-msg');

    if (!name || !role || !text) return;

    const newReview = {
      name,
      role,
      rating,
      text,
      date: new Date().toLocaleDateString()
    };

    // Send push notification via ntfy.sh
    fetch('https://ntfy.sh/stories_ideas_creator_leads', {
      method: 'POST',
      body: `Review from: ${name} (${role})\nRating: ${rating} Stars\nReview: ${text}`,
      headers: {
        'Title': 'New Client Review Submitted!',
        'Tags': 'star,speech_balloon'
      }
    }).catch(err => console.log('Ntfy error', err));

    // Send Email via Web3Forms (Free & Works with ProtonMail)
    const WEB3FORMS_ACCESS_KEY = "66a859b1-1289-4d33-96d7-80fb1071eb4a"; 
    
    if (WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY") {
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: "Stories Ideas Creator Website",
          subject: `New 5-Star Review from ${name}!`,
          name: name,
          message: `Role: ${role}\nRating: ${rating} Stars\nReview: ${text}`
        }),
      }).catch(err => console.log('Web3Forms error', err));
    }

    // Render new review live into grid
    renderReviewCard(container, newReview, true);

    // Save to localStorage
    savedReviews.push(newReview);
    localStorage.setItem('user_submitted_reviews', JSON.stringify(savedReviews));

    // Show success message & reset form
    if (successMsg) {
      successMsg.style.display = 'block';
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }

    form.reset();
  });
}

function renderReviewCard(container, reviewData, prepend = false) {
  const starsStr = '★ '.repeat(reviewData.rating) + '☆ '.repeat(5 - reviewData.rating);
  const initial = reviewData.name.charAt(0).toUpperCase();

  const card = document.createElement('div');
  card.className = 'testimonial-card';
  card.style.animation = 'fadeInUp 0.6s ease forwards';
  card.innerHTML = `
    <div class="testimonial-stars" style="color:var(--accent); font-size:1.1rem;">${starsStr.trim()}</div>
    <p class="testimonial-text">"${reviewData.text}"</p>
    <div class="testimonial-author">
      <div style="width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg, var(--accent), #e2b753); color:#000; font-weight:bold; font-size:1.1rem; display:flex; align-items:center; justify-content:center;">${initial}</div>
      <div>
        <div class="testimonial-name">${reviewData.name}</div>
        <div class="testimonial-role">${reviewData.role}</div>
      </div>
    </div>
  `;

  if (prepend && container.firstChild) {
    container.insertBefore(card, container.firstChild);
  } else {
    container.appendChild(card);
  }
}

/* ---------- Mobile Navigation Menu ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-menu .nav-link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    
    // Accessibility
    const isExpanded = toggle.classList.contains('active');
    toggle.setAttribute('aria-expanded', isExpanded);
  });

  // Close menu when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
