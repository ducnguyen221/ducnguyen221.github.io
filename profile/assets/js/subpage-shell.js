(function () {
    const root = document.documentElement;
    const body = document.body;
    const currentPage = body.dataset.page || "profile";

    const pageAliases = {
        profile: "profile",
        experience: "experience",
        projects: "projects",
        courses: "courses",
        socials: "socials",
        solutions: "solutions",
        powerbi: "powerbi",
    };

    function getCurrentLang() {
        return localStorage.getItem("profile-lang") || "vi";
    }

    function textFor(lang, en, vi) {
        return lang === "vi" ? vi : en;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function setTheme(theme) {
        root.classList.toggle("dark", theme === "dark");
        localStorage.setItem("profile-theme", theme);
        const toggle = document.getElementById("theme-toggle-btn");
        if (toggle) {
            toggle.textContent = theme === "dark" ? "dark_mode" : "light_mode";
        }
    }

    function applyTranslation(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll(".t-lang").forEach((el) => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                el.innerHTML = translation;
            }
        });

        const langToggle = document.getElementById("lang-toggle-btn");
        if (langToggle) {
            langToggle.textContent = lang === "vi" ? "VI" : "EN";
        }

        localStorage.setItem("profile-lang", lang);
    }

    function markActiveNav() {
        document.querySelectorAll("[data-page-link]").forEach((el) => {
            const isActive = el.getAttribute("data-page-link") === pageAliases[currentPage];
            el.classList.toggle("active", isActive);
        });
    }

    function initCanvas() {
        const canvas = document.getElementById("bgCanvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let width = 0;
        let height = 0;
        let particles = [];

        const rgb = () =>
            root.classList.contains("dark") ? "198,151,73" : "76,107,75";

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            const count = Math.min(Math.floor((width * height) / 10000), 160);
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                size: Math.random() * 2 + 0.7,
                opacity: Math.random() * 0.4 + 0.2,
            }));
        }

        function tick() {
            ctx.clearRect(0, 0, width, height);
            const color = rgb();
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
                ctx.fill();
            });

            ctx.strokeStyle = `rgba(${color}, 0.12)`;
            ctx.lineWidth = 0.6;

            for (let i = 0; i < particles.length; i += 1) {
                for (let j = i + 1; j < particles.length; j += 1) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(tick);
        }

        window.addEventListener("resize", resize);
        resize();
        tick();
    }

    function fallbackCopyText(text) {
        const tempInput = document.createElement("textarea");
        tempInput.value = text;
        tempInput.setAttribute("readonly", "");
        tempInput.style.position = "fixed";
        tempInput.style.opacity = "0";
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, tempInput.value.length);
        const copied = document.execCommand("copy");
        document.body.removeChild(tempInput);
        return copied;
    }

    function copyToClipboard(text, successMessage) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => alert(successMessage))
                .catch(() => {
                    if (fallbackCopyText(text)) {
                        alert(successMessage);
                    }
                });
            return;
        }

        if (fallbackCopyText(text)) {
            alert(successMessage);
        }
    }

    function initOverflowMenu() {
        const headerActions = document.querySelector(".header-actions");
        if (!headerActions || document.getElementById("more-menu-container")) {
            return;
        }

        const shareMenuLabelEn = currentPage === "profile" ? "Share Profile" : "Share Page";
        const shareMenuLabelVi = currentPage === "profile"
            ? "Chia s&#7867; H&#7891; s&#417;"
            : "Chia s&#7867; Trang";

        headerActions.insertAdjacentHTML("beforeend", `
            <div class="header-menu-container" id="more-menu-container">
                <button class="header-icon-btn material-symbols-outlined" id="more-menu-btn" type="button" aria-label="More options" aria-expanded="false">
                    more_vert
                </button>
                <div class="header-menu" id="more-menu">
                    <button class="menu-action" id="share-btn" type="button">
                        <span class="material-symbols-outlined" style="color: var(--accent-color);">share</span>
                        <span class="menu-action-label t-lang" data-en="${shareMenuLabelEn}" data-vi="${shareMenuLabelVi}">${shareMenuLabelEn}</span>
                    </button>
                    <button class="menu-action" id="qr-btn" type="button">
                        <span class="material-symbols-outlined" style="color: var(--primary-color);">qr_code_2</span>
                        <span class="menu-action-label t-lang" data-en="QR Code" data-vi="M&#227; QR">QR Code</span>
                    </button>
                    <button class="menu-action" id="bcard-btn" type="button">
                        <span class="material-symbols-outlined" style="color: #1877F2;">badge</span>
                        <span class="menu-action-label t-lang" data-en="Business Card" data-vi="Danh thi&#7871;p">Business Card</span>
                    </button>
                </div>
            </div>
        `);

        document.body.insertAdjacentHTML("beforeend", `
            <div class="app-modal" id="app-modal" aria-hidden="true">
                <div class="glass-panel modal-panel">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modal-title"></h3>
                        <button class="header-icon-btn material-symbols-outlined" id="close-modal-btn" type="button" aria-label="Close">
                            close
                        </button>
                    </div>
                    <div class="modal-body" id="modal-body"></div>
                </div>
            </div>
        `);

        const moreMenuContainer = document.getElementById("more-menu-container");
        const moreMenuBtn = document.getElementById("more-menu-btn");
        const moreMenu = document.getElementById("more-menu");
        const shareBtn = document.getElementById("share-btn");
        const qrBtn = document.getElementById("qr-btn");
        const bcardBtn = document.getElementById("bcard-btn");
        const appModal = document.getElementById("app-modal");
        const modalTitle = document.getElementById("modal-title");
        const modalBody = document.getElementById("modal-body");
        const closeModalBtn = document.getElementById("close-modal-btn");
        const businessCardUrl = "./assets/images/Business%20Card.png";

        function closeMenu() {
            moreMenu.classList.remove("open");
            moreMenuBtn.setAttribute("aria-expanded", "false");
        }

        function openMenu() {
            moreMenu.classList.add("open");
            moreMenuBtn.setAttribute("aria-expanded", "true");
        }

        function openModal(title, contentHtml) {
            modalTitle.textContent = title;
            modalBody.innerHTML = contentHtml;
            appModal.classList.add("open");
            appModal.setAttribute("aria-hidden", "false");
            closeMenu();
        }

        function closeModal() {
            appModal.classList.remove("open");
            appModal.setAttribute("aria-hidden", "true");
        }

        function bindShareModalActions(url, pageTitle, copiedAlert) {
            const copyButton = modalBody.querySelector("[data-modal-action='copy-link']");
            if (copyButton) {
                copyButton.addEventListener("click", () => {
                    copyToClipboard(url, copiedAlert);
                });
            }

            const shareButton = modalBody.querySelector("[data-modal-action='native-share']");
            if (shareButton) {
                shareButton.addEventListener("click", () => {
                    navigator.share({ title: pageTitle, url }).catch(() => { });
                });
            }
        }

        function openShareModal() {
            const lang = getCurrentLang();
            const url = window.location.href;
            const pageTitle = document.title;
            const encodedUrl = encodeURIComponent(url);
            const encodedTitle = encodeURIComponent(pageTitle);
            const title = textFor(lang, "Share Page", "Chia s\u1ebb Trang");
            const description = textFor(
                lang,
                "Share this page with partners, students, or colleagues.",
                "Chia s\u1ebb trang n\u00e0y v\u1edbi \u0111\u1ed1i t\u00e1c, h\u1ecdc vi\u00ean ho\u1eb7c \u0111\u1ed3ng nghi\u1ec7p."
            );
            const copyText = textFor(lang, "Copy link", "Sao ch\u00e9p link");
            const shareText = textFor(lang, "Quick share", "Chia s\u1ebb nhanh");
            const copiedAlert = textFor(lang, "Copied!", "\u0110\u00e3 sao ch\u00e9p!");
            const socialTitle = textFor(lang, "Share on social media", "Chia s\u1ebb qua m\u1ea1ng x\u00e3 h\u1ed9i");
            const socialTargets = [
                {
                    label: "Facebook",
                    icon: "f",
                    color: "#1877F2",
                    href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                },
                {
                    label: "LinkedIn",
                    icon: "in",
                    color: "#0A66C2",
                    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
                },
                {
                    label: "X",
                    icon: "X",
                    color: "#111827",
                    href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
                },
                {
                    label: "WhatsApp",
                    icon: "WA",
                    color: "#25D366",
                    href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
                },
                {
                    label: "Telegram",
                    icon: "TG",
                    color: "#229ED9",
                    href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
                },
            ];

            const socialButtons = socialTargets.map(({ label, icon, color, href }) => `
                <a class="social-share-link" href="${href}" target="_blank" rel="noopener noreferrer">
                    <span class="social-share-badge" style="background:${color};">${icon}</span>
                    <span class="social-share-text">${label}</span>
                </a>
            `).join("");

            const nativeShareButton = navigator.share ? `
                <button class="modal-action-btn accent" data-modal-action="native-share" type="button">
                    <span class="material-symbols-outlined">share</span>
                    <span>${shareText}</span>
                </button>
            ` : "";

            openModal(title, `
                <div class="modal-stack">
                    <span class="material-symbols-outlined modal-icon">share</span>
                    <p class="section-subtitle" style="margin:0; text-align:center; max-width:36rem;">${escapeHtml(description)}</p>
                    <div class="modal-copy">
                        <div class="modal-link-box">
                            <span class="material-symbols-outlined">link</span>
                            <span>${escapeHtml(url)}</span>
                        </div>
                        <div class="modal-actions">
                            <button class="modal-action-btn primary" data-modal-action="copy-link" type="button">
                                <span class="material-symbols-outlined">content_copy</span>
                                <span>${escapeHtml(copyText)}</span>
                            </button>
                            ${nativeShareButton}
                        </div>
                    </div>
                    <div class="modal-share-group">
                        <p class="modal-share-label">${escapeHtml(socialTitle)}</p>
                        <div class="social-share-grid">${socialButtons}</div>
                    </div>
                </div>
            `);

            bindShareModalActions(url, pageTitle, copiedAlert);
        }

        function openQrModal() {
            const lang = getCurrentLang();
            const url = window.location.href;
            const encodedUrl = encodeURIComponent(url);
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodedUrl}&margin=10`;
            const title = textFor(lang, "Page QR Code", "M\u00e3 QR Trang");
            const copyText = textFor(lang, "Copy link", "Sao ch\u00e9p link");
            const copiedAlert = textFor(lang, "Copied!", "\u0110\u00e3 sao ch\u00e9p!");

            openModal(title, `
                <div class="modal-stack">
                    <img class="qr-image" src="${qrUrl}" alt="QR Code" />
                    <div class="modal-link-box">
                        <span class="material-symbols-outlined">link</span>
                        <span>${escapeHtml(url)}</span>
                    </div>
                    <div class="modal-actions">
                        <button class="modal-action-btn primary" data-modal-action="copy-link" type="button">
                            <span class="material-symbols-outlined">content_copy</span>
                            <span>${escapeHtml(copyText)}</span>
                        </button>
                    </div>
                </div>
            `);

            const copyButton = modalBody.querySelector("[data-modal-action='copy-link']");
            if (copyButton) {
                copyButton.addEventListener("click", () => {
                    copyToClipboard(url, copiedAlert);
                });
            }
        }

        function openBusinessCardModal() {
            const lang = getCurrentLang();
            const title = textFor(lang, "Business Card", "Danh thi\u1ebfp");
            const downloadText = textFor(lang, "Download Card", "T\u1ea3i Danh thi\u1ebfp");

            openModal(title, `
                <div class="modal-stack">
                    <div class="business-card-frame">
                        <img src="${businessCardUrl}" alt="Business Card" />
                    </div>
                    <div class="modal-actions">
                        <a class="modal-action-btn accent" href="${businessCardUrl}" download>
                            <span class="material-symbols-outlined">download</span>
                            <span>${escapeHtml(downloadText)}</span>
                        </a>
                    </div>
                </div>
            `);
        }

        moreMenuBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            if (moreMenu.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        moreMenu.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        shareBtn.addEventListener("click", openShareModal);
        qrBtn.addEventListener("click", openQrModal);
        bcardBtn.addEventListener("click", openBusinessCardModal);
        closeModalBtn.addEventListener("click", closeModal);

        document.addEventListener("click", (event) => {
            if (!moreMenuContainer.contains(event.target)) {
                closeMenu();
            }

            if (event.target === appModal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
                closeModal();
            }
        });
    }

    function initPage() {
        const savedTheme = localStorage.getItem("profile-theme") || "dark";
        const savedLang = getCurrentLang();

        setTheme(savedTheme);
        initOverflowMenu();
        applyTranslation(savedLang);
        markActiveNav();
        initCanvas();

        const themeToggle = document.getElementById("theme-toggle-btn");
        if (themeToggle) {
            themeToggle.addEventListener("click", () => {
                const nextTheme = root.classList.contains("dark") ? "light" : "dark";
                setTheme(nextTheme);
            });
        }

        const langToggle = document.getElementById("lang-toggle-btn");
        if (langToggle) {
            langToggle.addEventListener("click", () => {
                const nextLang = getCurrentLang() === "vi" ? "en" : "vi";
                applyTranslation(nextLang);
            });
        }
    }

    document.addEventListener("DOMContentLoaded", initPage);
})();
