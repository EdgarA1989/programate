const BRAND_CONFIG = {
  whatsappNumber: "549XXXXXXXXXX",
  whatsappMessage: "Hola, quiero consultar por un dashboard, sistema de gestión o integración de datos.",
};

const ICONS = {
  shield: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v5c0 4.6-2.9 8-7 10-4.1-2-7-5.4-7-10V6l7-3z" stroke="currentColor" stroke-width="2"/><path d="M9 12l2 2 4-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  plug: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 3v5M16 3v5M7 8h10v4a5 5 0 0 1-10 0V8zM12 17v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="2" stroke="currentColor" stroke-width="2"/><rect x="4" y="14" width="16" height="6" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 7h.01M8 17h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  api: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 8H5a3 3 0 0 0 0 6h2M17 8h2a3 3 0 0 1 0 6h-2M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 8l-2 8M16 8l-2 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  secure: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11V8a8 8 0 0 1 16 0v3" stroke="currentColor" stroke-width="2"/><rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M12 15v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V5M4 19h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 15l3-3 3 2 5-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V5M4 19h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 15l3-4 3 2 5-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  report: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="2"/><path d="M14 3v5h5M8 14h8M8 18h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  kpi: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V9M12 19V5M19 19v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 19h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};

document.addEventListener("DOMContentLoaded", () => {
  renderIcons();
  initTheme();
  const heroBackground = document.querySelector("[data-ambient-hero-background]");
  if (heroBackground) {
    const ambientHeroBackground = AmbientHeroBackground(heroBackground);
    window.addEventListener("pagehide", ambientHeroBackground.destroy, { once: true });
  }
  initMenu();
  initWhatsappLinks();
  initHomeLinks();
  initContactForm();
  initImageModal();
  initReveal();
});

function AmbientHeroBackground(root) {
  const canvas = root.querySelector("canvas");
  const ctx = canvas?.getContext("2d", { alpha: true });
  if (!canvas || !ctx) return { destroy() {} };

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrame = 0;
  let nodes = [];
  let packets = [];
  let time = 0;
  let reducedMotion = reducedMotionQuery.matches;

  const resizeObserver = new ResizeObserver(resize);
  const themeObserver = new MutationObserver(handleThemeChange);
  resizeObserver.observe(root);
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  reducedMotionQuery.addEventListener?.("change", handleReducedMotionChange);
  window.addEventListener("resize", resize);

  resize();
  animationFrame = window.requestAnimationFrame(draw);

  function resize() {
    const rect = root.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createNetwork();
  }

  function createNetwork() {
    const isMobile = width < 680;
    const nodeCount = isMobile ? 30 : 34;
    const packetCount = isMobile ? 16 : 16;

    nodes = Array.from({ length: nodeCount }, (_, index) => ({
      x: (isMobile ? .06 + seededRandom(index + 3) * .88 : .16 + seededRandom(index + 3) * .78) * width,
      y: (.1 + seededRandom(index + 19) * .78) * height,
      radius: (isMobile ? 1.8 : 2) + seededRandom(index + 41) * 2.4,
      phase: seededRandom(index + 83) * Math.PI * 2,
      drift: .7 + seededRandom(index + 101) * 1.4,
    }));

    packets = Array.from({ length: packetCount }, (_, index) => ({
      from: Math.floor(seededRandom(index + 211) * nodeCount),
      to: Math.floor(seededRandom(index + 307) * nodeCount),
      speed: .08 + seededRandom(index + 401) * .18,
      phase: seededRandom(index + 503),
    }));

    packets.forEach(packet => {
      if (packet.from === packet.to) {
        packet.to = (packet.to + 3) % nodeCount;
      }
    });
  }

  function draw() {
    const palette = getAmbientPalette();
    const speed = reducedMotion ? .003 : width < 680 ? .024 : .018;
    time += speed;

    ctx.clearRect(0, 0, width, height);
    drawBase(palette);
    drawGrid(palette);
    drawNetwork(palette);
    drawPackets(palette);
    drawCodeRain(palette);

    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(draw);
    }
  }

  function drawBase(palette) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, palette.base);
    gradient.addColorStop(.58, palette.mid);
    gradient.addColorStop(1, palette.end);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  function drawGrid(palette) {
    ctx.save();
    ctx.globalAlpha = palette.gridAlpha;
    ctx.strokeStyle = palette.grid;
    ctx.lineWidth = 1;

    const spacing = width < 680 ? 56 : 72;
    const offset = reducedMotion ? 0 : (time * 18) % spacing;

    for (let x = -spacing + offset; x < width + spacing; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = -spacing + offset * .55; y < height + spacing; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawNetwork(palette) {
    ctx.save();
    ctx.globalCompositeOperation = palette.composite;
    const visibleNodes = getAnimatedNodes();
    const maxDistance = width < 680 ? 225 : 250;

    for (let i = 0; i < visibleNodes.length; i += 1) {
      for (let j = i + 1; j < visibleNodes.length; j += 1) {
        const from = visibleNodes[i];
        const to = visibleNodes[j];
        const distance = Math.hypot(from.x - to.x, from.y - to.y);
        if (distance > maxDistance) continue;

        const alpha = (1 - distance / maxDistance) * palette.lineAlpha;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = palette.line;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }
    }

    visibleNodes.forEach((node, index) => {
      const pulse = reducedMotion ? 1 : 1 + Math.sin(time * 3 + node.phase) * .22;
      const radius = node.radius * pulse;
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 8);
      glow.addColorStop(0, palette.nodeGlow[index % palette.nodeGlow.length]);
      glow.addColorStop(1, "rgba(255,255,255,0)");

      ctx.globalAlpha = palette.nodeAlpha;
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius * 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = palette.node;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawPackets(palette) {
    const visibleNodes = getAnimatedNodes();
    ctx.save();
    ctx.globalCompositeOperation = palette.composite;

    packets.forEach((packet, index) => {
      const from = visibleNodes[packet.from];
      const to = visibleNodes[packet.to];
      if (!from || !to) return;

      const progress = reducedMotion
        ? packet.phase
        : (packet.phase + time * packet.speed) % 1;
      const x = from.x + (to.x - from.x) * progress;
      const y = from.y + (to.y - from.y) * progress;
      const radius = width < 680 ? 2.1 : 2.8;

      ctx.globalAlpha = palette.packetAlpha;
      ctx.fillStyle = palette.packet[index % palette.packet.length];
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  function drawCodeRain(palette) {
    const snippets = ["API", "DB", "JWT", "GET", "POST", "200", "SQL", "SYNC"];
    const count = width < 680 ? 14 : 14;
    ctx.save();
    ctx.font = `${width < 680 ? 10 : 12}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    ctx.fillStyle = palette.code;
    ctx.globalAlpha = palette.codeAlpha;

    for (let index = 0; index < count; index += 1) {
      const seed = index * 37;
      const x = (.28 + seededRandom(seed) * .68) * width;
      const baseY = seededRandom(seed + 9) * height;
      const y = reducedMotion ? baseY : (baseY + time * (28 + seededRandom(seed + 2) * 36)) % height;
      ctx.fillText(snippets[index % snippets.length], x, y);
    }

    ctx.restore();
  }

  function getAnimatedNodes() {
    const drift = reducedMotion ? .12 : 1;
    return nodes.map(node => ({
      ...node,
      x: node.x + Math.sin(time * node.drift + node.phase) * 18 * drift,
      y: node.y + Math.cos(time * node.drift * .86 + node.phase) * 14 * drift,
    }));
  }

  function getAmbientPalette() {
    const isLight = document.body.classList.contains("light");
    if (isLight) {
      return {
        base: "#e8f7ee",
        mid: "#d8f4e3",
        end: "#f8faf9",
        composite: "multiply",
        grid: "rgba(22,163,74,.26)",
        gridAlpha: .62,
        line: "rgba(22,163,74,.48)",
        lineAlpha: .78,
        node: "rgba(22,101,52,.88)",
        nodeAlpha: .9,
        nodeGlow: ["rgba(34,197,94,.32)", "rgba(74,222,128,.26)", "rgba(20,184,166,.2)"],
        packet: ["rgba(22,163,74,.95)", "rgba(34,197,94,.88)", "rgba(20,184,166,.76)"],
        packetAlpha: .9,
        code: "rgba(22,101,52,.52)",
        codeAlpha: .62,
      };
    }

    return {
      base: "#07110d",
      mid: "#0d1a14",
      end: "#07110d",
      composite: "screen",
      grid: "rgba(74,222,128,.16)",
      gridAlpha: .48,
      line: "rgba(74,222,128,.34)",
      lineAlpha: .64,
      node: "rgba(74,222,128,.86)",
      nodeAlpha: .86,
      nodeGlow: ["rgba(34,197,94,.32)", "rgba(74,222,128,.26)", "rgba(20,184,166,.2)"],
      packet: ["rgba(74,222,128,.95)", "rgba(34,197,94,.86)", "rgba(20,184,166,.76)"],
      packetAlpha: .82,
      code: "rgba(187,247,208,.36)",
      codeAlpha: .46,
    };
  }

  function handleReducedMotionChange(event) {
    reducedMotion = event.matches;
    window.cancelAnimationFrame(animationFrame);
    animationFrame = window.requestAnimationFrame(draw);
  }

  function handleThemeChange() {
    if (!reducedMotion) return;
    window.cancelAnimationFrame(animationFrame);
    animationFrame = window.requestAnimationFrame(draw);
  }

  function destroy() {
    window.cancelAnimationFrame(animationFrame);
    resizeObserver.disconnect();
    themeObserver.disconnect();
    reducedMotionQuery.removeEventListener?.("change", handleReducedMotionChange);
    window.removeEventListener("resize", resize);
  }

  return { destroy };
}

function seededRandom(seed) {
  const value = Math.sin(seed * 9301 + 49297) * 233280;
  return value - Math.floor(value);
}

function renderIcons() {
  document.querySelectorAll("[data-icon]").forEach(icon => {
    icon.innerHTML = ICONS[icon.dataset.icon] || "";
  });
}

function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const label = toggle?.querySelector(".theme-toggle__text");
  const savedTheme = localStorage.getItem("programate-theme") || "dark";

  applyTheme(savedTheme, { immediateImages: true });

  toggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
    localStorage.setItem("programate-theme", nextTheme);
    applyTheme(nextTheme);
  });

  function applyTheme(theme, { immediateImages = false } = {}) {
    const isLight = theme === "light";
    document.body.classList.toggle("light", isLight);
    toggle?.setAttribute("aria-pressed", String(isLight));
    if (label) label.textContent = isLight ? "Oscuro" : "Claro";
    updateThemeImages(theme, { immediate: immediateImages });
  }
}

function updateThemeImages(theme, { immediate = false } = {}) {
  const imageKey = theme === "light" ? "imageLight" : "imageDark";
  document.querySelectorAll("[data-image-dark][data-image-light]").forEach(image => {
    const nextSrc = image.dataset[imageKey];
    if (!nextSrc || image.getAttribute("src") === nextSrc) return;

    if (immediate) {
      image.setAttribute("src", nextSrc);
      return;
    }

    image.style.opacity = "0";
    window.setTimeout(() => {
      image.setAttribute("src", nextSrc);
      image.style.opacity = "1";
    }, 120);
  });
}

function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const panel = document.getElementById("nav-panel");
  if (!toggle || !panel) return;

  const closeMenu = () => {
    toggle.classList.remove("is-open");
    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  panel.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
}

function initHomeLinks() {
  document.querySelectorAll('.brand[href="#inicio"]').forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      history.replaceState(null, "", "#inicio");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function initWhatsappLinks() {
  const url = getWhatsappUrl(BRAND_CONFIG.whatsappMessage);
  ["hero-whatsapp", "contact-whatsapp", "instant-whatsapp", "footer-whatsapp"].forEach(id => {
    const link = document.getElementById(id);
    if (link) link.href = url;
  });
}

function getWhatsappUrl(message) {
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("input, select, textarea")];
    const invalidFields = fields.filter(field => !field.checkValidity());

    fields.forEach(field => {
      field.closest("label")?.classList.toggle("field-error", invalidFields.includes(field));
    });

    if (invalidFields.length) {
      status.textContent = "Revisa los campos marcados para enviar la consulta.";
      status.style.color = "var(--danger)";
      invalidFields[0].focus();
      return;
    }

    status.textContent = "Consulta recibida. Te responderemos a la brevedad.";
    status.style.color = "var(--success)";
    form.reset();
  });
}

function initImageModal() {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  if (!modal || !modalImage) return;

  const closeButtons = modal.querySelectorAll("[data-close-modal]");
  let lastFocusedElement = null;
  let modalHistoryActive = false;
  let modalScrollY = 0;
  const setModalOpen = isOpen => {
    modal.classList.toggle("is-open", isOpen);
    modal.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("modal-open", isOpen);
  };

  document.querySelectorAll("[data-open-image]").forEach(button => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      if (!image) return;

      const wasOpen = modal.classList.contains("is-open");
      lastFocusedElement = document.activeElement;
      modalScrollY = window.scrollY;
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
      setModalOpen(true);

      if (!wasOpen && !modalHistoryActive) {
        history.pushState({ programateImageModal: true }, "", window.location.href);
        modalHistoryActive = true;
      }

      modal.querySelector(".image-modal__close")?.focus();
    });
  });

  closeButtons.forEach(button => button.addEventListener("click", closeModal));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  window.addEventListener("popstate", () => {
    if (modal.classList.contains("is-open")) {
      closeModal({ fromHistory: true });
    }
  });

  function closeModal({ fromHistory = false } = {}) {
    setModalOpen(false);
    modalImage.removeAttribute("src");
    modalImage.alt = "";

    window.scrollTo({ top: modalScrollY, behavior: "auto" });

    if (modalHistoryActive) {
      modalHistoryActive = false;
      if (!fromHistory) history.back();
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }
}

function initReveal() {
  const sections = document.querySelectorAll(".section-reveal");
  if (!sections.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sections.forEach(section => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });

  sections.forEach(section => observer.observe(section));
}
