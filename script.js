document.addEventListener('DOMContentLoaded', () => {
    const pressBtn = document.getElementById('press-me-btn');
    const scene1 = document.getElementById('scene-1');
    const scene2 = document.getElementById('scene-2');
    const transitionOverlay = document.getElementById('transition-overlay');
    const rosesContainer = document.getElementById('roses-container');
    const mainMessage = document.getElementById('main-message');
    const blimpContainer = document.getElementById('blimp-container');
    const bgMusic = document.getElementById('bg-music');
    const muteBtn = document.getElementById('mute-btn');

    // Mute Button Logic
    muteBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            muteBtn.textContent = '🔊';
        } else {
            bgMusic.pause(); // Or .muted = true
            if (bgMusic.muted) {
                bgMusic.muted = false;
                muteBtn.textContent = '🔊';
            } else {
                bgMusic.muted = true;
                muteBtn.textContent = '🔇';
            }
        }
    });

    pressBtn.addEventListener('click', () => {
        // Start Music (requires user interaction, so this is perfect)
        bgMusic.volume = 0.5; // Start at 50%
        bgMusic.play().catch(e => console.log("Audio play failed:", e));

        // 1. Button fade out
        pressBtn.style.opacity = '0';
        pressBtn.style.transform = 'scale(0.8)';

        // 2. Bright flash overlay
        transitionOverlay.style.opacity = '1';

        setTimeout(() => {
            // 3. Switch Scenes behind the flash
            scene1.classList.remove('active');
            scene2.classList.add('active');

            // Populate roses
            createRoses(20);

            // 4. Reveal Scene 2
            transitionOverlay.style.opacity = '0';

            // 5. Animate Text in
            setTimeout(() => {
                mainMessage.classList.add('message-visible');
            }, 500);

            // 6. Fly Blimp after text is read (approx 3s)
            setTimeout(() => {
                flyBlimp();
            }, 2500);

        }, 1000); // Wait for flash to max out
    });

    function createRoses(count) {
        for (let i = 0; i < count; i++) {
            const rose = document.createElement('div');
            rose.textContent = '🌹'; // Using Emoji as fallback
            rose.classList.add('rose');

            // Random positioning
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            // Bigger roses: 4rem to 8rem
            const size = 4 + Math.random() * 4;
            const delay = Math.random() * 2; // 0 to 2s delay

            rose.style.left = `${left}%`;
            rose.style.top = `${top}%`;
            rose.style.fontSize = `${size}rem`;
            rose.style.animationDelay = `${delay}s`;

            // Random z-index to create depth
            rose.style.zIndex = Math.floor(Math.random() * 3);

            // Avoid center where text is
            if (left > 20 && left < 80 && top > 30 && top < 70) {
                rose.style.opacity = '0.4'; // Make them fainter behind text
                rose.style.filter = 'blur(2px)'; // Optional depth effect
            }

            rosesContainer.appendChild(rose);
        }
    }

    function flyBlimp() {
        // Using JS for animation end detection if needed, or just CSS class
        // Let's us animate via Keyframes by assigning a class that has the animation
        // Blimp moves very slow: 60s duration
        blimpContainer.style.animation = 'flyAcross 60s linear forwards';

        // Add fade out at the very end
        setTimeout(() => {
            blimpContainer.style.transition = 'opacity 2s ease';
            blimpContainer.style.opacity = '0';
        }, 58000); // Start fading before it fully leaves
    }
});
