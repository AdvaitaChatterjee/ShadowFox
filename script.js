document.addEventListener('DOMContentLoaded', () => {
    // --- Initial Page Load Animations ---
    let body = document.querySelector("body");
    let navContent = document.querySelectorAll(".nav-content");
    let introContent = document.querySelectorAll(".intro-content");
    let heading = document.querySelector(".heading");
    let section1 = document.querySelector(".section-1");

    // Initially hide elements for animation
    body.style.visibility = "hidden";
    heading.style.visibility = "hidden";
    introContent.forEach(intro => intro.style.visibility = "hidden");
    navContent.forEach(nav => nav.style.visibility = "hidden");

    // Animation sequence
    setTimeout(() => {
        body.style.overflow = "hidden"; // Hide overflow during initial heading animation
        heading.style.visibility = "visible";
        heading.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { duration: 500, fill: "forwards" }
        );
    }, 0);

    setTimeout(() => {
        heading.classList.add("heading-small");
    }, 1000);

    setTimeout(() => {
        body.style.visibility = "visible";
        section1.animate(
            [
                { opacity: 0 },
                { opacity: 1 }
            ],
            { duration: 1000, fill: "forwards" }
        );
    }, 1000);

    setTimeout(() => {
        body.style.overflow = "visible"; // Re-enable scroll after initial animations

        introContent.forEach((intro, index) => {
            setTimeout(() => {
                intro.style.visibility = "visible";
                intro.animate(
                    [
                        { opacity: 0 },
                        { opacity: 1 }
                    ],
                    { duration: 1000, fill: "forwards" }
                );
            }, index * 500);
        });
    }, 2000);

    setTimeout(() => {
        navContent.forEach(nav => {
            nav.style.visibility = "visible";
            nav.animate(
                [
                    { transform: "rotate3d(0,1,0,-40deg)", opacity: 0 },
                    { transform: "rotate3d(0,1,0,40deg)", opacity: 1 }
                ],
                { duration: 1000, fill: "forwards" }
            );
        });
    }, 4000);

    // --- Skill Bar Animation ---
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const skillLevel = bar.getAttribute('data-skill-level');
            bar.style.width = `${skillLevel}%`;
        });
    };
    // Trigger animation when the skills section comes into view
    const skillsSection = document.querySelector('#skills-section');
    const skillBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible
    skillBarObserver.observe(skillsSection);


    // --- Fading Navigation Panel Logic ---
    const fixedNavPanel = document.querySelector('.fixed-nav-panel');
    const section1Element = document.querySelector('.section-1');

    const toggleFixedNavPanel = () => {
        if (section1Element) {
            const section1Rect = section1Element.getBoundingClientRect();
            // Show the fixed nav panel when the bottom of section-1 is scrolled past the viewport
            if (section1Rect.bottom <= 0) {
                fixedNavPanel.classList.add('show');
            } else {
                fixedNavPanel.classList.remove('show');
            }
        }
    };

    window.addEventListener('scroll', toggleFixedNavPanel);
    toggleFixedNavPanel(); // Call on load to check initial position


    // --- Smooth Scrolling for Navigation Links ---
    const allNavLinks = document.querySelectorAll('.nav-area a, .fixed-nav-panel a');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the calculated scroll position, accounting for fixed header if present
                const headerOffset = fixedNavPanel.offsetHeight; // Get height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Fade-in from Bottom Animation for Sections (About Me, Skills, Projects) ---
    const animatedSections = document.querySelectorAll('.section-2, .section-3, .section-4, .resume-area, footer'); // Also include resume and footer for fade-in

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the section is in view, add the active class
                entry.target.classList.add('fade-in-active');
                // Disconnect the observer for this specific section so it only animates once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each section
    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });
});