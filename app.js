/* =========================================================================
   APP — логика сайта. Обычно тут ничего менять не нужно.
   Весь контент лежит в content.js
   ========================================================================= */

(function () {
  "use strict";

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  /* ----------------------------------------------------------------- lang */
  const LANGS = ["en", "pl"];
  let lang = (function () {
    // ?lang=pl — можно давать прямую ссылку на нужную версию
    const q = (location.search.match(/[?&]lang=([a-z]{2})/i) || [])[1];
    if (q && LANGS.includes(q.toLowerCase())) return q.toLowerCase();
    let saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) {}
    if (LANGS.includes(saved)) return saved;
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : "en";
  })();

  const t = (key) => (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || "";
  const L = (obj) => (obj && (obj[lang] != null ? obj[lang] : obj.en)) || "";

  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}

    $$("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
    $$("[data-setlang]").forEach((b) => b.classList.toggle("is-active", b.dataset.setlang === lang));

    renderMarquee();
    renderWork();
    renderApproach();
    renderContact();
    updateClock();
    observeReveals();
  }

  /* ---------------------------------------------------------------- brand */
  function renderStatic() {
    $("#brandName").textContent = SITE.name;
    $("#brandMark").textContent = SITE.mark || "";
    $("#introName").textContent = SITE.name;
    $("#footName").textContent = SITE.name;
    $("#footYear").textContent = "© " + new Date().getFullYear();
    document.title = SITE.name.replace(/\s+/g, " ") + " — Film Director";

    // hero background
    const box = $("#heroMedia");
    const m = SITE.heroMedia || {};
    box.innerHTML = "";
    if (m.kind === "video" && m.src) {
      const v = el("video");
      v.src = m.src;
      if (m.poster) v.poster = m.poster;
      v.autoplay = true; v.muted = true; v.loop = true;
      v.playsInline = true; v.setAttribute("playsinline", "");
      box.appendChild(v);
    } else if (m.src) {
      const i = el("img");
      i.src = m.src; i.alt = ""; i.decoding = "async";
      i.onerror = () => { i.remove(); };
      box.appendChild(i);
    }
  }

  /* -------------------------------------------------------------- marquee */
  function renderMarquee() {
    const track = $("#marqueeTrack");
    const items = (SITE.marquee || []).map((x) => `<span>${esc(x)}</span>`).join("");
    track.innerHTML = items + items; // дублируем для бесшовной прокрутки
  }

  /* ----------------------------------------------------------------- work */
  function renderWork() {
    const grid = $("#workGrid");
    grid.innerHTML = "";

    PROJECTS.forEach((p, i) => {
      const card = el("article", "card reveal" + (p.featured ? " card--featured" : ""));
      const hasVideo = !!(p.video && (p.video.id || p.video.src));

      const thumb = el("button", "card__thumb");
      thumb.type = "button";
      thumb.setAttribute("aria-label", p.title);

      if (p.poster) {
        const img = el("img");
        img.src = p.poster; img.alt = p.title;
        img.loading = i > 1 ? "lazy" : "eager";
        img.decoding = "async";
        img.onerror = () => { img.style.display = "none"; };
        thumb.appendChild(img);
      }

      if (hasVideo) {
        thumb.appendChild(
          el("span", "card__play",
            '<svg viewBox="0 0 12 14" fill="currentColor"><path d="M12 7 0 14V0z"/></svg>')
        );
      } else {
        thumb.appendChild(el("span", "card__soon", esc(t("work.soon"))));
      }

      thumb.addEventListener("click", () => openModal(p));
      card.appendChild(thumb);

      card.appendChild(
        el("div", "card__meta",
          '<div><h3 class="card__title">' + esc(p.title) + "</h3>" +
          (p.client ? '<span class="card__client">' + esc(p.client) + "</span>" : "") +
          "</div>" +
          '<div class="card__right"><span class="card__type">' + esc(L(p.type)) + "</span>" +
          (p.year ? '<span class="card__year">' + esc(p.year) + "</span>" : "") +
          "</div>")
      );

      grid.appendChild(card);
    });
  }

  /* ------------------------------------------------------------- approach */
  function renderApproach() {
    const img = $("#approachPortrait");
    if (APPROACH.portrait) {
      img.src = APPROACH.portrait;
      img.alt = SITE.name;
      img.onerror = () => { img.style.display = "none"; };
    }

    const st = $("#approachStatement");
    st.innerHTML = "";
    (L(APPROACH.statement) || []).forEach((para) => {
      st.appendChild(el("p", "reveal", esc(para)));
    });

    const pr = $("#principles");
    pr.innerHTML = "";
    (APPROACH.principles || []).forEach((item, i) => {
      pr.appendChild(
        el("li", "reveal",
          '<span class="principles__n">' + String(i + 1).padStart(2, "0") + "</span>" +
          "<h4>" + esc(L(item.title)) + "</h4>" +
          "<p>" + esc(L(item.text)) + "</p>")
      );
    });

    const fx = $("#facts");
    fx.innerHTML = "";
    (APPROACH.facts || []).forEach((f) => {
      fx.appendChild(
        el("div", "row reveal",
          "<dt>" + esc(L(f.k)) + "</dt><dd>" + esc(L(f.v)) + "</dd>")
      );
    });
  }

  /* -------------------------------------------------------------- contact */
  function renderContact() {
    const mail = $("#contactEmail");
    mail.textContent = SITE.email;
    mail.href = "mailto:" + SITE.email;

    const phoneBlock = $("#phoneBlock");
    if (SITE.phone) {
      phoneBlock.hidden = false;
      const a = $("#contactPhone");
      a.textContent = SITE.phone;
      a.href = "tel:" + SITE.phone.replace(/[^\d+]/g, "");
    } else {
      phoneBlock.hidden = true;
    }

    const cv = $("#resumeBtn");
    if (SITE.resumeUrl) { cv.hidden = false; cv.href = SITE.resumeUrl; cv.target = "_blank"; cv.rel = "noopener"; }
    else { cv.hidden = true; }

    const s = $("#socials");
    s.innerHTML = "";
    (SITE.socials || []).forEach((so) => {
      const li = el("li");
      li.innerHTML =
        '<a href="' + esc(so.url) + '" target="_blank" rel="noopener">' +
        esc(so.label) + "<span>" + esc(so.handle || "") + "</span></a>";
      s.appendChild(li);
    });
  }

  /* ---------------------------------------------------------------- clock */
  function updateClock() {
    const cityEl = $("#clockCity");
    if (cityEl) cityEl.textContent = L(SITE.city);
    const timeEl = $("#clockTime");
    if (!timeEl) return;
    try {
      timeEl.textContent = new Intl.DateTimeFormat(lang === "pl" ? "pl-PL" : "en-GB", {
        hour: "2-digit", minute: "2-digit", hour12: false, timeZone: SITE.timezone,
      }).format(new Date());
    } catch (e) {
      timeEl.textContent = new Date().toTimeString().slice(0, 5);
    }
  }

  /* --------------------------------------------------------------- modal */
  const modal = $("#modal");
  const stage = $("#modalStage");
  let lastFocus = null;

  function openModal(p) {
    lastFocus = document.activeElement;
    stage.innerHTML = "";

    const v = p.video || {};
    if (v.kind === "youtube" && v.id) {
      const f = el("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.id) +
              "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true;
      f.title = p.title;
      stage.appendChild(f);
    } else if (v.kind === "mp4" && v.src) {
      const vid = el("video");
      vid.src = v.src; vid.controls = true; vid.autoplay = true;
      vid.playsInline = true; vid.setAttribute("playsinline", "");
      if (p.poster) vid.poster = p.poster;
      stage.appendChild(vid);
    } else {
      stage.appendChild(el("div", "placeholder", esc(t("work.soon"))));
    }

    const credits = (p.credits || [])
      .map((c) => "<span>" + esc(L(c.role)) + " — " + esc(c.name) + "</span>")
      .join("");

    $("#modalMeta").innerHTML =
      "<div><h3>" + esc(p.title) + "</h3>" +
      (L(p.description) ? "<p>" + esc(L(p.description)) + "</p>" : "") +
      "</div>" +
      '<div class="side"><span class="micro">' + esc(L(p.type)) + " · " + esc(p.year || "") + "</span>" +
      (credits ? '<div class="modal__credits">' + credits + "</div>" : "") +
      "</div>";

    modal.hidden = false;
    document.body.classList.add("is-locked");
    $("#modalClose").focus();
  }

  function closeModal() {
    modal.hidden = true;
    stage.innerHTML = "";
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }

  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (!modal.hidden) closeModal(); }
  });

  /* --------------------------------------------------------------- reveal */
  let io = null;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((n) => n.classList.add("is-in"));
      return;
    }
    if (!io) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            const n = entry.target;
            const delay = Number(n.dataset.delay || 0);
            setTimeout(() => n.classList.add("is-in"), delay);
            io.unobserve(n);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
      );
    }
    $$(".reveal:not(.is-in)").forEach((n, i) => {
      // лёгкая каскадная задержка внутри одного контейнера
      if (!n.dataset.delay) {
        const sibs = Array.from(n.parentElement ? n.parentElement.children : []);
        const idx = sibs.indexOf(n);
        n.dataset.delay = String(Math.min(idx, 5) * 70);
      }
      io.observe(n);
    });
  }

  /* ------------------------------------------------------------------ nav */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  const burger = $("#burger");

  function onScroll() {
    nav.classList.toggle("is-stuck", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("is-locked", open);
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-locked");
    }
  });

  $$("[data-setlang]").forEach((b) =>
    b.addEventListener("click", () => {
      if (b.dataset.setlang === lang) return;
      lang = b.dataset.setlang;
      applyLang();
    })
  );

  /* -------------------------------------------------------------- actions */
  $("#reelBtn").addEventListener("click", () =>
    openModal({
      title: SITE.name,
      video: SITE.reel,
      year: String(new Date().getFullYear()),
      type: { en: "Showreel", pl: "Showreel" },
      description: { en: "", pl: "" },
      credits: [],
    })
  );

  $("#copyEmail").addEventListener("click", async (e) => {
    const span = e.currentTarget.querySelector("span");
    try {
      await navigator.clipboard.writeText(SITE.email);
      span.textContent = t("contact.copied");
      setTimeout(() => { span.textContent = t("contact.copy"); }, 1800);
    } catch (err) {
      window.location.href = "mailto:" + SITE.email;
    }
  });

  /* ----------------------------------------------------------------- boot */
  renderStatic();
  applyLang();
  onScroll();
  setInterval(updateClock, 15000);

  // ?noanim=1 — мгновенно показать всё без анимаций (удобно для скриншотов)
  if (/[?&]noanim/.test(location.search)) {
    $("#intro").classList.add("is-done");
    $$(".reveal").forEach((n) => n.classList.add("is-in"));
    document.documentElement.style.scrollBehavior = "auto";
    document.documentElement.classList.add("is-shot");
    return;
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      $("#intro").classList.add("is-done");
      observeReveals();
    }, 900);
  });
  // страховка, если load не сработал
  setTimeout(() => $("#intro").classList.add("is-done"), 3500);
})();
