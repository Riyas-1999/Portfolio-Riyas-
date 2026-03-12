document.addEventListener("DOMContentLoaded", function() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error("GSAP library not loaded. Check internet connection or CDN links.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // --- Theme Toggle Logic ---
    const body = document.body;
    const themeBtn = document.getElementById("theme-btn");
    
    function toggleTheme() {
        body.classList.toggle("day-mode");
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", toggleTheme);
    }

    // Make the visual lamp clickable as well (optional)
    const visualLamp = document.querySelector(".lamp-wrapper");
    if (visualLamp) {
        visualLamp.addEventListener("click", toggleTheme);
    }

    // --- Create Night Sky Stars ---
    const starContainer = document.getElementById("star-container");
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        
        // Random positioning
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1; // 1px to 3px
        const duration = Math.random() * 3 + 2; // 2s to 5s animation

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        
        starContainer.appendChild(star);
    }

    // Hero Section Animation
    const tl = gsap.timeline();

    tl.from(".logo", { duration: 1, opacity: 0, y: -20, ease: "power3.out" })
      .from(".nav-links li", { duration: 0.8, opacity: 0, y: -20, stagger: 0.1, ease: "power3.out" }, "-=0.5")
      .from("#theme-btn", { duration: 0.5, opacity: 0, scale: 0, ease: "back.out(1.7)" }, "-=0.5")
      .from(".hero-content h1", { duration: 1, opacity: 0, y: 30, ease: "power3.out" }, "-=0.5")
      .to(".typing-text", { duration: 2, text: "Python Full Stack Developer", ease: "none" })
      .from(".hero-content p", { duration: 1, opacity: 0, y: 20, ease: "power3.out" }, "-=1")
      .from(".hero-buttons a", { duration: 0.8, opacity: 0, y: 20, stagger: 0.2, ease: "power3.out" }, "-=0.5")
      .from(".visual-content", { duration: 1.5, opacity: 0, scale: 0.8, ease: "back.out(1.7)" }, "-=1.5");

    // Scroll Animations for Sections
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        const heading = section.querySelector(".section-title");
        const cards = section.querySelectorAll(".timeline-item, .about-card, .contact-info-card, .contact-form");

        if (heading) {
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out"
            });
        }

        if (cards.length > 0) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }

        // Animate skill items and progress bars
        if (section.id === 'skills') {
            const skillItems = section.querySelectorAll('.skill-progress-item');
            const progressBars = section.querySelectorAll('.progress-bar');
            const percentTexts = section.querySelectorAll('.skill-percent');

            // Animate the container items
            gsap.from(skillItems, {
                scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
                opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: "power2.out"
            });

            // Fade in percent text
            gsap.to(percentTexts, {
                scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
                opacity: 1, duration: 1, delay: 0.5
            });

            // Animate the progress bar width
            gsap.to(progressBars, {
                scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
                width: (i, el) => `${el.dataset.percent}%`,
                duration: 1.2, stagger: 0.1, ease: "power2.inOut"
            });
        }
    });
    
    // Standalone Project Cards Animation (Fix for visibility)
    // const projectCards = document.querySelectorAll(".project-card");
    // if (projectCards.length > 0) {
    //     gsap.from(projectCards, {
    //         scrollTrigger: {
    //             trigger: "#projects", // Triggers when the #projects section enters view
    //             start: "top 95%",     // Start animation almost immediately when section appears
    //             toggleActions: "play none none none"
    //         },
    //         opacity: 0,
    //         y: 50,
    //         duration: 0.8,
    //         stagger: 0.2,
    //         ease: "power3.out"
    //     });
    // }

    // Log message for HR / fellow developers
    console.log("%cHello! Thanks for checking out my portfolio code. Feel free to reach out!", "color: #64ffda; font-size: 16px; font-weight: bold; background: #0a192f; padding: 10px; border-radius: 5px;");
});