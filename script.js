document.addEventListener('DOMContentLoaded', () => {
    // Custom heart shape for confetti
    const heartShape = {
        type: 'path',
        path: 'M167 72c19,-38 37,-56 75,-56 74,0 87,75 87,94 0,24 -31,60 -64,82 -42,27 -89,45 -94,70 -4,-24 -55,-42 -92,-70 -33,-21 -64,-58 -64,-82 0,-18 14,-94 87,-94 38,0 55,18 75,56z',
        matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.533333333333333, -2.0666666666666664]
    };

    // Initialize particles.js with more particles and faster movement
    particlesJS('particles-js', {
        particles: {
            number: { value: 250, density: { enable: true, value_area: 800 } },
            color: { value: ['#00FF00', '#00FFFF', '#C0C0C0', '#333333'] },
            shape: { type: 'star', stroke: { width: 0 } },
            opacity: { value: 0.7, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.3 } },
            size: { value: 4, random: true, anim: { enable: true, speed: 2, size_min: 1 } },
            line_linked: { enable: false },
            move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
            modes: { grab: { distance: 300, line_linked: { opacity: 0.5 } }, push: { particles_nb: 10 } }
        }
    });

    // Gift toggle with enhanced GSAP timeline
    const giftToggle = document.getElementById('giftToggle');
    const giftMessage = document.getElementById('giftMessage');
    giftToggle.addEventListener('click', () => {
        const isHidden = giftMessage.classList.contains('hidden');
        giftMessage.classList.toggle('hidden');
        giftToggle.textContent = isHidden ? 'Close Gift' : 'Open Friendship Gift';
        giftToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        giftMessage.setAttribute('aria-hidden', isHidden ? 'false' : 'true');

        const tl = gsap.timeline();
        if (isHidden) {
            tl.fromTo(giftMessage, 
                { scale: 0.5, opacity: 0, y: 30, rotation: -10 },
                { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' }
            )
            .to('.container', { scale: 1.05, duration: 0.5, ease: 'power2.out' }, '-=1.0');
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#00FF00', '#00FFFF', '#C0C0C0'],
                shapes: [heartShape],
                scalar: 0.6
            });
        } else {
            tl.to(giftMessage, {
                scale: 0.5,
                opacity: 0,
                y: 30,
                rotation: 10,
                duration: 1.2,
                ease: 'back.in(1.2)'
            })
            .to('.container', { scale: 1, duration: 0.5, ease: 'power2.out' }, '-=1.0');
        }
    });

    // Music control with enhanced animation
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    bgMusic.src = './blue.mp3';

    musicControl.addEventListener('click', () => {
        const tl = gsap.timeline();
        if (isPlaying) {
            bgMusic.pause();
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
            tl.to(musicControl, { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
        } else {
            bgMusic.play().catch(e => console.error('Audio play failed:', e));
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
            tl.to(musicControl, { scale: 1.3, rotation: 360, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
            confetti({
                particleCount: 50,
                spread: 30,
                origin: { x: 0.95, y: 0.95 },
                colors: ['#00FF00', '#00FFFF', '#C0C0C0'],
                shapes: [heartShape],
                scalar: 0.5
            });
        }
        isPlaying = !isPlaying;
    });

    // Celebrate button with enhanced timeline
    const celebrateButton = document.getElementById('celebrateButton');
    const celebrateMessage = document.getElementById('celebrateMessage');
    celebrateButton.addEventListener('click', () => {
        const isHidden = celebrateMessage.classList.contains('hidden');
        if (isHidden) {
            celebrateMessage.classList.remove('hidden');
            const tl = gsap.timeline({
                onComplete: () => {
                    confetti({
                        particleCount: 200,
                        spread: 90,
                        origin: { y: 0.5 },
                        colors: ['#00FF00', '#00FFFF', '#C0C0C0', '#333333'],
                        shapes: [heartShape, 'star', 'circle'],
                        scalar: 0.7,
                        gravity: 0.3
                    });
                    setTimeout(() => confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } }), 1000);
                }
            });
            tl.to(celebrateButton, {
                y: -40,
                scale: 1.2,
                rotation: 360,
                duration: 0.7,
                ease: 'back.out(1.7)'
            })
            .to(celebrateButton, {
                y: -140,
                opacity: 0,
                duration: 1.8,
                ease: 'expo.inOut'
            })
            .fromTo(celebrateMessage, 
                { opacity: 0, y: 40, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' }, '-=1.5'
            )
            .fromTo('.friendship-celebration', 
                { scale: 1, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' },
                { scale: 1.1, boxShadow: '0 20px 40px rgba(0, 255, 255, 0.6)', duration: 1.5, ease: 'expo.out' }, '-=1.5'
            )
            .to('.celebration-title', { color: '#00FFFF', duration: 0.5, ease: 'power2.out' }, '-=1.0');
        }
    });

    // Enhanced raining hearts effect with more frequency
    function rainHearts() {
        confetti({
            particleCount: 5,
            spread: 20,
            origin: { y: -0.1, x: Math.random() },
            colors: ['#00FF00', '#00FFFF', '#C0C0C0'],
            shapes: [heartShape],
            scalar: 0.5,
            gravity: 0.25,
            ticks: 600
        });
    }

    setInterval(rainHearts, 2000);

    // Enhanced initial animations with stagger and more effects
    const tl = gsap.timeline();
    tl.from('.container', {
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 2.0,
        ease: 'elastic.out(1, 0.5)'
    })
    .from('h1', {
        opacity: 0,
        x: -100,
        scale: 0.8,
        rotation: -10,
        duration: 2.2,
        ease: 'back.out(1.7)',
        delay: 0.5
    }, '-=1.8')
    .from('.friendship-banner', {
        opacity: 0,
        y: 50,
        scale: 0.7,
        duration: 1.8,
        ease: 'back.out(1.6)',
        delay: 0.7
    }, '-=1.5')
    .from('.friendship-gift', {
        opacity: 0,
        scale: 0.5,
        stagger: 0.3,
        duration: 1.6,
        ease: 'back.out(1.5)'
    }, '-=1.2')
    .from('.friendship-celebration', {
        opacity: 0,
        y: 70,
        scale: 0.9,
        duration: 1.8,
        ease: 'elastic.out(1, 0.5)'
    }, '-=1.0');
});
