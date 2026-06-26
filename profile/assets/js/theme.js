const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const copyButtons = document.querySelectorAll('[data-copy]');
const tabs = document.querySelectorAll('.integration-tab');
const panels = document.querySelectorAll('.integration-panel');
const navLinks = document.querySelectorAll('.site-nav a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');
const yearNode = document.getElementById('current-year');

function showToast(message) {
  if (!toast || !toastMessage) return;
  toastMessage.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy || '');
      showToast('Email copied');
    } catch (error) {
      showToast('Copy failed');
    }
  });
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.panel;

    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });

    panels.forEach((panel) => {
      const active = panel.dataset.panel === target;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => sectionObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('is-current', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 }
);

sections.forEach((section) => navObserver.observe(section));

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
