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

    // --- Mobile Menu Logic ---
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    
    if (menuBtn && navLinks) {
        // Toggle Menu
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            // Toggle icon between bars and times (close)
            const icon = menuBtn.querySelector("i");
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = menuBtn.querySelector("i");
                if(icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-times");
                }
            });
        });
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
      .from(".hero-content p", { duration: 1, opacity: 0, y: 20, ease: "power3.out" }, "-=1")
      .from(".hero-buttons a", { duration: 0.8, opacity: 0, y: 20, stagger: 0.2, ease: "power3.out" }, "-=0.5")
      .from(".visual-content", { duration: 1.5, opacity: 0, scale: 0.8, ease: "back.out(1.7)" }, "-=1.5");

    // --- Infinite Typing Animation ---
    // Start typing after the hero animation is mostly complete
    setTimeout(() => {
        const roles = ["Python Full Stack Developer", "Django Specialist", "Problem Solver", "Tech Enthusiast","Mathematician"];
        let roleIndex = 0;
        
        function typeRole() {
            if (document.querySelector(".typing-text")) {
                let typeTl = gsap.timeline({
                    onComplete: () => {
                        // Pause before deleting
                        gsap.delayedCall(2, () => {
                            roleIndex = (roleIndex + 1) % roles.length;
                            typeRole();
                        });
                    }
                });
                
                // Type
                typeTl.to(".typing-text", { duration: 2, text: roles[roleIndex], ease: "none" });
            }
        }
        // Initial empty to first role
        typeRole();
    }, 2500);

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
    
    // --- 3D Tilt Effect for Cards ---
    const tiltCards = document.querySelectorAll('.project-card, .about-card, .contact-info-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on cursor position
            // Max rotation: 10 degrees
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; 
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                duration: 0.5,
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                rotateX: 0,
                rotateY: 0,
                ease: "power2.out"
            });
        });
    });

    // --- Scroll Features (Progress Bar & Active Link & Back to Top) ---
    const progressBar = document.querySelector(".scroll-progress-bar");
    const backToTopBtn = document.getElementById("backToTop");
    const navLinksItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY;
        let docHeight = document.body.scrollHeight - window.innerHeight;
        let scrollPercent = (scrollTop / docHeight) * 100;

        // Update Progress Bar
        if (progressBar) progressBar.style.width = `${scrollPercent}%`;

        // Show/Hide Back to Top
        if (backToTopBtn) {
            if (scrollTop > 300) backToTopBtn.classList.add("show");
            else backToTopBtn.classList.remove("show");
        }

        // Active Nav Link
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection) && currentSection !== "") {
                link.classList.add("active");
            }
        });
    });
    
    // Log message for HR / fellow developers
    console.log("%cHello! Thanks for checking out my portfolio code. Feel free to reach out!", "color: #64ffda; font-size: 16px; font-weight: bold; background: #0a192f; padding: 10px; border-radius: 5px;");

    const successPopup = document.getElementById("successPopup");
    const successPopupClose = document.getElementById("successPopupClose");

    function hideSuccessPopup() {
        if (successPopup) {
            successPopup.classList.remove("show");
        }
    }

    if (successPopupClose) {
        successPopupClose.addEventListener("click", hideSuccessPopup);
    }

    if (successPopup) {
        successPopup.addEventListener("click", (event) => {
            if (event.target === successPopup) {
                hideSuccessPopup();
            }
        });
    }

});

emailjs.init("Wp-DppEbhT9SYmfG3");

    document
      .getElementById("contact-form")
      .addEventListener("submit", function(event){

        event.preventDefault();

        emailjs.sendForm(
          "service_epocnub",
          "template_y345yfp",
          this
        )

        .then(() => {

          const popup = document.getElementById("successPopup");
          if (popup) {
              popup.classList.add("show");
              window.setTimeout(() => popup.classList.remove("show"), 5000);
          }

          document.getElementById("contact-form").reset();

        })

        .catch((error) => {

          alert("❌ Failed To Send");
          console.log(error);

        });

      });

