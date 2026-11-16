/**
 * HealthPulse Frontend JavaScript (2026 Modern Standard)
 */
document.addEventListener("DOMContentLoaded", function () {
    // -------------------------------------------------------------
    // Landing / Base Navbar Behavior
    // -------------------------------------------------------------
    const nav = document.getElementById("lpNav");
    const toggle = document.getElementById("lpToggle");
    const menu = document.getElementById("lpMenu");

    const isLandingPage = nav?.dataset.page === "landing";

    function handleScroll() {
        if (!nav) return;
        if (isLandingPage) {
            nav.classList.toggle("scrolled", window.scrollY > 30);
        } else {
            nav.classList.add("scrolled");
        }
    }

    if (nav) {
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Mobile menu toggle (public/user navigation)
    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            const isOpen = menu.classList.toggle("active");
            toggle.setAttribute("aria-expanded", isOpen);
            toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

            const icon = toggle.querySelector("i");
            if (icon) {
                icon.className = isOpen ? "bx bx-x" : "bx bx-menu";
            }
        });

        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
                const icon = toggle.querySelector("i");
                if (icon) icon.className = "bx bx-menu";
            });
        });
    }

    // -------------------------------------------------------------
    // Admin Mobile Sidebar Toggle
    // -------------------------------------------------------------
    const adminToggle = document.getElementById("menu_toggle");
    const adminSidebar = document.getElementById("menu");

    if (adminToggle && adminSidebar) {
        adminToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            adminSidebar.classList.toggle("active");
        });

        document.addEventListener("click", function (e) {
            if (adminSidebar.classList.contains("active") && !adminSidebar.contains(e.target) && e.target !== adminToggle) {
                adminSidebar.classList.remove("active");
            }
        });
    }

    // -------------------------------------------------------------
    // Universal Dropdown System ([data-dropdown]) with Smart Dropup
    // -------------------------------------------------------------
    document.addEventListener("click", function (event) {
        const button = event.target.closest("[data-dropdown-button]");
        const currentDropdown = button?.closest("[data-dropdown]");

        // Close other open dropdowns
        document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
            if (dropdown !== currentDropdown) {
                dropdown.classList.remove("active");
                dropdown.classList.remove("dropup");
            }
        });

        if (currentDropdown) {
            event.preventDefault();

            // Calculate vertical clearance to prevent bottom clipping
            const btnRect = button.getBoundingClientRect();
            const spaceBelow = window.innerHeight - btnRect.bottom;
            const menuHeight = 210; // Height of dropdown with margin

            // Also check distance to table container bottom
            const tableContainer = currentDropdown.closest(".datatable-container");
            let spaceInTable = 9999;
            if (tableContainer) {
                const tableRect = tableContainer.getBoundingClientRect();
                spaceInTable = tableRect.bottom - btnRect.bottom;
            }

            // If clearance is tight, flip upwards (dropup)
            if (spaceBelow < menuHeight || spaceInTable < menuHeight) {
                currentDropdown.classList.add("dropup");
            } else {
                currentDropdown.classList.remove("dropup");
            }

            currentDropdown.classList.toggle("active");
        }
    });

    // Close open dropdowns on Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            document.querySelectorAll("[data-dropdown].active").forEach(d => {
                d.classList.remove("active");
                d.classList.remove("dropup");
            });
            const openModal = document.querySelector(".model-wrapper.active");
            if (openModal) openModal.classList.remove("active");
        }
    });
});
