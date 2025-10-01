document.addEventListener('DOMContentLoaded', () => {

    /**
     * =================================================================
     * SMOOTH SCROLLING FOR ANCHOR LINKS
     * =================================================================
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if a link is clicked
            if (mobileMenu.classList.contains('is-active')) {
                toggleMobileMenu();
            }
        });
    });

    /**
     * =================================================================
     * MOBILE MENU TOGGLE
     * =================================================================
     */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    const toggleMobileMenu = () => {
        const isActive = mobileMenu.classList.contains('is-active');
        if (isActive) {
            mobileMenu.classList.remove('is-active');
            document.body.classList.remove('body-no-scroll');
            menuOpenIcon.classList.remove('hidden');
            menuCloseIcon.classList.add('hidden');
        } else {
            mobileMenu.classList.add('is-active');
            document.body.classList.add('body-no-scroll');
            menuOpenIcon.classList.add('hidden');
            menuCloseIcon.classList.remove('hidden');
        }
    };
    
    if (mobileMenuBtn && mobileMenu) {
        // Toggle menu with the button
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Add Tap-away-to-close functionality
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                toggleMobileMenu();
            }
        });
    }

    /**
     * =================================================================
     * CUSTOM CURSOR
     * =================================================================
     */
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (window.matchMedia('(pointer: fine)').matches) {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            followerX += (mouseX - followerX) * 0.2;
            followerY += (mouseY - followerY) * 0.2;

            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        document.querySelectorAll('a, button, .portfolio-card-container').forEach(el => {
            el.addEventListener('mouseenter', () => cursorFollower.classList.add('cursor-grow'));
            el.addEventListener('mouseleave', () => cursorFollower.classList.remove('cursor-grow'));
        });
    }

    /**
     * =================================================================
     * HEADER STYLE CHANGE ON SCROLL
     * =================================================================
     */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-black/50', 'backdrop-blur-lg', 'border-b', 'border-gray-900');
        } else {
            header.classList.remove('bg-black/50', 'backdrop-blur-lg', 'border-b', 'border-gray-900');
        }
    });

    /**
     * =================================================================
     * HERO SECTION TEXT REVEAL ANIMATION
     * =================================================================
     */
    const animateHeroText = () => {
        const lineChildren = document.querySelectorAll('.line-child');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');

        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        heroCta.style.opacity = '0';
        heroCta.style.transform = 'translateY(20px)';

        lineChildren.forEach((child, index) => {
            setTimeout(() => {
                child.style.transition = `transform 1s cubic-bezier(0.2, 1, 0.4, 1)`;
                child.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        setTimeout(() => {
            const commonTransition = 'opacity 1s ease, transform 1s ease';
            heroSubtitle.style.transition = commonTransition;
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
            heroCta.style.transition = commonTransition;
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 400);
    };
    animateHeroText();

    /**
     * =================================================================
     * REVEAL ELEMENTS ON SCROLL (INTERSECTION OBSERVER)
     * =================================================================
     */
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    /**
     * =================================================================
     * ABOUT SECTION PARALLAX IMAGE
     * =================================================================
     */
    const parallaxImg = document.querySelector('.parallax-img');
    const aboutSection = document.getElementById('about');

    if (parallaxImg && aboutSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const sectionTop = aboutSection.offsetTop;
            const sectionHeight = aboutSection.offsetHeight;

            if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
                let offset = (scrollPosition - sectionTop) * 0.1;
                parallaxImg.style.transform = `translateY(${offset}px)`;
            }
        });
    }

    /**
     * =================================================================
     * PORTFOLIO CARD 3D TILT EFFECT
     * =================================================================
     */
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
        });
    });

    /**
     * =================================================================
     * PORTFOLIO MODAL
     * =================================================================
     */
    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const closeModalBtn = document.getElementById('modal-close-btn');

    document.querySelectorAll('.portfolio-card-container').forEach(card => {
        card.addEventListener('click', () => {
            modalTitle.textContent = card.dataset.title;
            modalCategory.textContent = card.dataset.category;
            modalDescription.textContent = card.dataset.description;
            modalImg.src = card.dataset.img;
            modalImg.alt = `Detailed view of ${card.dataset.title}`;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    /**
     * =================================================================
     * CONTACT FORM - NETLIFY AJAX SUBMISSION
     * =================================================================
     */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            try {
                const response = await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    formStatus.textContent = "✅ Thank you! Your message has been sent.";
                    formStatus.classList.remove('text-red-400');
                    formStatus.classList.add('text-green-400');
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                formStatus.textContent = "❌ Oops! Something went wrong. Please try again.";
                formStatus.classList.remove('text-green-400');
                formStatus.classList.add('text-red-400');
                console.error(error);
            }

            setTimeout(() => { formStatus.textContent = ""; }, 5000);
        });
    }

    /**
     * =================================================================
     * FOOTER: SET CURRENT YEAR
     * =================================================================
     */
    document.getElementById('current-year').textContent = new Date().getFullYear();

    /**
     * =================================================================
     * CANVAS PARTICLE ANIMATION
     * =================================================================
     */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim();

        let particles = [];
        let particleCount = window.innerWidth < 768 ? 500 : 1000;
        let flowField = [];
        const resolution = 15;
        let cols, rows;
        let time = 0;

        const noise = (function() {
            let p = new Uint8Array(512);
            for (let i = 0; i < 256; i++) p[i] = i;
            for (let i = 255; i > 0; i--) { let j = Math.floor(Math.random() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
            for (let i = 0; i < 256; i++) p[i + 256] = p[i];
            const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
            const lerp = (a, b, t) => a + t * (b - a);
            const grad = (hash, x, y, z) => {
                let h = hash & 15;
                let u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z;
                return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
            };
            return {
                perlin3: (x, y, z) => {
                    let X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
                    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
                    let u = fade(x), v = fade(y), w = fade(z);
                    let A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z;
                    let B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
                    return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)), lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))),
                                  lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)), lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))));
                }
            };
        })();

        class Particle {
            constructor() { this.reset(); this.color = Math.random() > 0.5 ? primaryColor : secondaryColor; }
            reset() { this.pos = { x: Math.random() * canvas.width, y: Math.random() * canvas.height }; this.vel = { x: 0, y: 0 }; this.acc = { x: 0, y: 0 }; this.maxSpeed = 2; this.prevPos = { ...this.pos }; }
            update() { this.vel.x += this.acc.x; this.vel.y += this.acc.y; const speed = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y); if (speed > this.maxSpeed) { this.vel.x = this.vel.x / speed * this.maxSpeed; this.vel.y = this.vel.y / speed * this.maxSpeed; } this.pos.x += this.vel.x; this.pos.y += this.vel.y; this.acc.x = 0; this.acc.y = 0; }
            applyForce(force) { this.acc.x += force.x; this.acc.y += force.y; }
            follow(vectors) { const x = Math.floor(this.pos.x / resolution); const y = Math.floor(this.pos.y / resolution); const index = x + y * cols; const force = vectors[index]; if (force) this.applyForce(force); }
            edges() { if (this.pos.x > canvas.width || this.pos.x < 0 || this.pos.y > canvas.height || this.pos.y < 0) { this.reset(); } }
            draw() { ctx.strokeStyle = this.color; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(this.prevPos.x, this.prevPos.y); ctx.lineTo(this.pos.x, this.pos.y); ctx.stroke(); this.prevPos = { ...this.pos }; }
        }

        const initCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            cols = Math.floor(canvas.width / resolution);
            rows = Math.floor(canvas.height / resolution);
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
            ctx.globalAlpha = 0.8;
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            let yoff = 0;
            for (let y = 0; y < rows; y++) {
                let xoff = 0;
                for (let x = 0; x < cols; x++) {
                    const index = x + y * cols;
                    const angle = noise.perlin3(xoff, yoff, time) * Math.PI * 4;
                    flowField[index] = { x: Math.cos(angle) * 0.3, y: Math.sin(angle) * 0.3 };
                    xoff += 0.1;
                }
                yoff += 0.1;
            }
            time += 0.003;
            particles.forEach(p => { p.follow(flowField); p.update(); p.edges(); p.draw(); });
            requestAnimationFrame(animate);
        };

        initCanvas();
        animate();
        window.addEventListener('resize', () => {
            clearTimeout(window.resizeTimeout);
            window.resizeTimeout = setTimeout(initCanvas, 250);
        });
    }

});
