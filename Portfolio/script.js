document.addEventListener('DOMContentLoaded', () => {
    let body = document.querySelector("body");
    let navContent = document.querySelectorAll(".nav-content");
    let introContent = document.querySelectorAll(".intro-content");
    let heading = document.querySelector(".heading");
    let section1 = document.querySelector(".section-1");

    body.style.visibility = "hidden";
    heading.style.visibility = "hidden";
    introContent.forEach(intro => intro.style.visibility = "hidden");
    navContent.forEach(nav => nav.style.visibility = "hidden");

    setTimeout(() => {
        body.style.overflow = "hidden";
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
        body.style.overflow = "visible";

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

    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const skillLevel = bar.getAttribute('data-skill-level');
            bar.style.width = `${skillLevel}%`;
        });
    };
    const skillsSection = document.querySelector('#skills-section');
    const skillBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillBarObserver.observe(skillsSection);


    const fixedNavPanel = document.querySelector('.fixed-nav-panel');
    const section1Element = document.querySelector('.section-1');

    const toggleFixedNavPanel = () => {
        if (section1Element) {
            const section1Rect = section1Element.getBoundingClientRect();
            if (section1Rect.bottom <= 0) {
                fixedNavPanel.classList.add('show');
            } else {
                fixedNavPanel.classList.remove('show');
            }
        }
    };

    window.addEventListener('scroll', toggleFixedNavPanel);
    toggleFixedNavPanel();


    const allNavLinks = document.querySelectorAll('.nav-area a, .fixed-nav-panel a');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = fixedNavPanel.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const animatedSections = document.querySelectorAll('.section-2, .section-3, .section-4, .resume-area, footer');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });
});