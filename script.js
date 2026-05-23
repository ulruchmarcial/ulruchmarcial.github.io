/* ============================================================
   script.js — Ulruch Marcial Ngomen
   Tous les scripts du portfolio
   ============================================================ */

/* ============================================================
   1. ANNÉE FOOTER — Mise à jour automatique
   Plus besoin de changer manuellement chaque année
   ============================================================ */
const footerYear = document.getElementById('footerYear');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

/* ============================================================
   2. THÈME CLAIR / SOMBRE
   Persisté dans localStorage pour se souvenir du choix
   ============================================================ */
const themeBtn = document.getElementById('theme-toggle');
const tIcon    = themeBtn.querySelector('.toggle-icon');
const tText    = themeBtn.querySelector('.toggle-text');

// Mode clair par défaut. Si l'utilisateur a choisi le mode sombre, on l'applique.
try {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.remove('light-mode');
        tIcon.textContent = '☀️';
        if (tText) tText.textContent = 'Mode Clair';
    }
} catch (_) { /* localStorage inaccessible en navigation privée */ }

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    tIcon.textContent = isLight ? '🌙' : '☀️';
    if (tText) tText.textContent = isLight ? 'Mode Sombre' : 'Mode Clair';
    // Sauvegarde le choix dans le navigateur
    try { localStorage.setItem('theme', isLight ? 'light' : 'dark'); } catch (_) {}
});

/* ============================================================
   3. MENU HAMBURGER — Navigation mobile
   Ouvre/ferme le menu sur mobile et ferme au clic d'un lien
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
    // Ouvre/ferme au clic du bouton hamburger
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        // Met à jour l'attribut d'accessibilité (lecteurs d'écran)
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Ferme le menu quand on clique sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Ferme le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ============================================================
   4. CURSOR GLOW — Cercle lumineux qui suit la souris
   Désactivé sur mobile (pas de souris)
   ============================================================ */
const glow = document.getElementById('cursorGlow');

if (glow && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', e => {
        // requestAnimationFrame = mouvement plus fluide
        requestAnimationFrame(() => {
            glow.style.left = e.clientX + 'px';
            glow.style.top  = e.clientY + 'px';
        });
    });
} else if (glow) {
    // Sur mobile : cache le cercle lumineux (inutile sans souris)
    glow.style.display = 'none';
}

/* ============================================================
   5. SCROLL REVEAL + ANIMATION DES BARRES DE COMPÉTENCES
   Les éléments apparaissent progressivement lors du scroll
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Ajoute la classe visible pour déclencher l'animation CSS
            entry.target.classList.add('visible');

            // Si la carte contient des barres de compétences, les anime
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.classList.add('animated');
            });

            // Arrête d'observer cet élément (animation uniquement à la première vue)
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 }); // 12% de l'élément visible = déclencher

// Enregistre tous les éléments à révéler
document.querySelectorAll(
    '.skill-card, .timeline-item, .stat, .about-grid, .contact-wrapper, .project-card'
).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

/* ============================================================
   6. LIEN ACTIF DANS LA NAV (selon la section visible)
   Surligne le lien correspondant à la section visible
   ============================================================ */
const sections     = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinkItems.forEach(link => {
                // Active le lien dont le href correspond à l'id de la section
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.4 }); // 40% de la section visible = considérée "active"

sections.forEach(s => navObserver.observe(s));

/* ============================================================
   7. FORMULAIRE DE CONTACT
   Gère l'envoi via Formspree et affiche un message de confirmation
   ============================================================ */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        // Indique que l'envoi est en cours
        btn.innerHTML = 'Envoi en cours... ⏳';
        btn.disabled = true;

        try {
            // Envoie les données au service Formsubmit
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            let data = {};
            try { data = await response.json(); } catch (_) {}

            if (response.ok && data.success != false) {
                // Succès : affiche le message de confirmation
                if (formSuccess) formSuccess.classList.add('visible');
                form.reset(); // Vide le formulaire
                btn.innerHTML = '✅ Envoyé !';
                btn.style.background = 'var(--success)';
                btn.style.color = '#fff';

                // Remet le bouton à l'état normal après 4 secondes
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.color = '';
                    if (formSuccess) formSuccess.classList.remove('visible');
                }, 4000);
            } else {
                throw new Error(data.message || 'Erreur serveur');
            }
        } catch {
            // Erreur réseau ou autre
            btn.innerHTML = '❌ Erreur — réessayez';
            btn.style.background = '#ef4444';
            btn.style.color = '#fff';
            btn.disabled = false;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        }
    });
}

/* ============================================================
   8. SCROLL FLUIDE — Compatibilité Safari
   Safari ne supporte pas bien scroll-behavior: smooth en CSS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ============================================================
   9. FILTRAGE DES PROJETS — Boutons de catégorie
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Met à jour le bouton actif
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Affiche ou cache les cartes selon la catégorie
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                // Re-déclenche l'animation d'apparition
                card.classList.remove('visible');
                setTimeout(() => card.classList.add('visible'), 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/* ============================================================
   10. TYPING EFFECT — Texte animé dans le hero
   Correction du bug : la variable deleting était mal scopée
   ============================================================ */
const roleEl = document.getElementById('heroRole');

if (roleEl) {
    // Les textes qui vont défiler — modifie-les comme tu veux !
    const roles = [
        'Systèmes Embarqués // IA // Réseaux',
        'C · VHDL · CUDA · Python',
        'Edge AI · RTOS · TinyML',
        'OFDM · SDR · Télécommunications',
        'VLAN · DMZ · Juniper · TCP/IP',
        'Ladder · GRAFCET · Automatisation',
        'B.ing. Génie Informatique · UQTR',
    ];

    // État de l'animation — tout dans un objet pour éviter les bugs de scope
    const state = {
        roleIndex: 0,   // Quel texte on affiche
        charIndex: 0,   // Jusqu'où on a tapé
        deleting: false // Est-on en train d'effacer ?
    };

    // Délais en millisecondes — ajuste pour changer la vitesse
    const TYPING_SPEED  = 80;  // Vitesse d'écriture (ms par lettre)
    const DELETING_SPEED = 40; // Vitesse d'effacement
    const PAUSE_END     = 1800; // Pause quand le texte est complet (ms)
    const PAUSE_START   = 300;  // Pause avant de retaper

    function typeEffect() {
        const currentRole = roles[state.roleIndex];

        if (!state.deleting) {
            // Mode écriture : on ajoute une lettre
            state.charIndex++;

            if (state.charIndex > currentRole.length) {
                // Texte complet : on attend avant d'effacer
                state.deleting = true;
                setTimeout(typeEffect, PAUSE_END);
                return;
            }
        } else {
            // Mode effacement : on retire une lettre
            state.charIndex--;

            if (state.charIndex <= 0) {
                // Tout effacé : on passe au texte suivant
                state.deleting = false;
                state.roleIndex = (state.roleIndex + 1) % roles.length;
                setTimeout(typeEffect, PAUSE_START);
                return;
            }
        }

        // Affiche le texte avec le curseur clignotant
        const displayed = currentRole.slice(0, state.charIndex);
        roleEl.textContent = displayed;
        const cursor = document.createElement('span');
        cursor.className = 't-cursor';
        cursor.setAttribute('aria-hidden', 'true');
        cursor.style.fontSize = '1rem';
        cursor.textContent = '|';
        roleEl.appendChild(cursor);

        // Planifie la prochaine itération
        const speed = state.deleting ? DELETING_SPEED : TYPING_SPEED;
        setTimeout(typeEffect, speed);
    }

    // Démarre après 2 secondes (laisse le temps à la page de charger)
    setTimeout(typeEffect, 2000);
}
