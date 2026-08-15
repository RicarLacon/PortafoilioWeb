(() => {
    "use strict";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
        return;
    }

    const revealItems = new Map();

    const addRevealItem = (element, options = {}) => {
        if (!element || revealItems.has(element)) {
            return;
        }

        const { direction = "up", delay = 0 } = options;

        revealItems.set(element, { direction, delay });
    };

    const addRevealGroup = (selector, options = {}) => {
        const { direction = "up", stagger = 90 } = options;

        document.querySelectorAll(selector).forEach((element, index) => {
            addRevealItem(element, {
                direction,
                delay: Math.min(index * stagger, 240)
            });
        });
    };

    const initializeReveals = () => {
        document.querySelectorAll(".hero-copy > *").forEach((element, index) => {
            addRevealItem(element, { delay: index * 70 });
        });

        addRevealItem(document.querySelector(".hero-media"), {
            direction: "right",
            delay: 140
        });

        addRevealGroup(".section-heading", { stagger: 0 });
        addRevealGroup(".about-grid .card");
        addRevealGroup(".mission-vision-grid .card");
        addRevealGroup(".values-grid .card", { stagger: 75 });
        addRevealGroup(".timeline .timeline-item", { stagger: 110 });
        addRevealGroup(".projects-grid .project-card");

        document.querySelectorAll(".contact-panel > *").forEach((element, index) => {
            addRevealItem(element, {
                direction: index === 0 ? "left" : "right",
                delay: index * 100
            });
        });

        addRevealItem(document.querySelector(".footer"));

        if (revealItems.size === 0) {
            return;
        }

        document.documentElement.classList.add("reveal-enabled");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element = entry.target;
                    element.classList.add("is-visible");
                    observer.unobserve(element);

                    const removeRevealStyles = (event) => {
                        if (event.propertyName !== "transform") {
                            return;
                        }

                        element.classList.remove(
                            "reveal-item",
                            "reveal-from-left",
                            "reveal-from-right",
                            "reveal-pop",
                            "is-visible"
                        );
                        element.style.removeProperty("--reveal-delay");
                        element.removeEventListener("transitionend", removeRevealStyles);
                    };

                    element.addEventListener("transitionend", removeRevealStyles);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        revealItems.forEach(({ direction, delay }, element) => {
            element.classList.add("reveal-item");
            element.style.setProperty("--reveal-delay", `${delay}ms`);

            if (direction !== "up") {
                const directionClass = {
                    left: "reveal-from-left",
                    right: "reveal-from-right",
                    pop: "reveal-pop"
                }[direction];

                if (directionClass) {
                    element.classList.add(directionClass);
                }
            }

            observer.observe(element);
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeReveals, { once: true });
    } else {
        initializeReveals();
    }
})();
