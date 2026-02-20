// Add a simple fade-in effect as the user scrolls
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
    
    // Log message for HR / fellow developers
    console.log("%cHello! Thanks for checking out my portfolio code. Feel free to reach out!", "color: #3498db; font-size: 16px; font-weight: bold;");
});