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

    renderWork();
    renderFrames();
    renderAbout();
    renderContact();
    renderFooter();
    observeReveals();
  }

  /* ---------------------------------------------------------------- static */
  function renderStatic() {
    $("#brandName").textContent = SITE.name;
    document.title = SITE.name.replace(/\s+/g, " ") + " — Film Director";

    const r = SITE.reel || {};
    $("#reelYear").textContent = r.year || "";
    $("#reelDuration").textContent = r.duration || "";

    const poster = $("#reelPoster");
    if (r.poster) {
      poster.src = r.poster;
      poster.onerror = () => { poster.style.display = "none"; };
    }
  }

  /* ------------------------------------------------------------- footer */
  function renderFooter() {
    $("#footCopy").textContent = "© " + new Date().getFullYear() + " " + SITE.name;
    $("#footCity").textContent = L(SITE.city);
  }

  /* ----------------------------------------------------------------- work */
  let openRow = -1;

  function renderWork() {
    const idx = $("#workIndex");
    idx.innerHTML = "";
    openRow = -1;

    const n = PROJECTS.length;
    $("#workCount").textContent =
      t("work.label") + " — " + String(n).padStart(2, "0") + " " + t("work.projects");

    PROJECTS.forEach((p, i) => {
      const row = el("div", "idx__row reveal");

      const head = el("button", "idx__head");
      head.type = "button";
      head.innerHTML =
        '<span class="idx__num">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="idx__title">' + esc(p.title) + "</span>" +
        '<span class="idx__client">' + esc(L(p.client)) + "</span>" +
        '<span class="idx__format">' + esc(L(p.format)) + "</span>" +
        '<span class="idx__year">' + esc(p.year || "") + "</span>";

      const panel = el("div", "idx__panel");
      const inner = el("div", "idx__panel-inner");
      const expand = el("div", "idx__expand");

      const still = el("button", "idx__still");
      still.type = "button";
      still.setAttribute("aria-label", p.title);
      if (p.poster) {
        const img = el("img");
        img.src = p.poster; img.alt = p.title;
        img.loading = "lazy"; img.decoding = "async";
        img.onerror = () => { img.style.display = "none"; };
        still.appendChild(img);
      }
      still.appendChild(
        el("span", "reel__play",
          '<svg viewBox="0 0 20 22" fill="none"><path d="M19 11 1 21V1z" stroke="currentColor" stroke-width="1"/></svg>')
      );
      still.addEventListener("click", () => openModal(p));

      const credits = el("dl", "idx__credits");
      (p.credits || []).forEach((c) => {
        credits.appendChild(
          el("div", "idx__credit",
            "<dt>" + esc(L(c.role)) + "</dt><dd>" + esc(c.name) + "</dd>")
        );
      });
      const watch = el("a", "idx__watch mono");
      watch.href = "#";
      watch.textContent = t("work.watch");
      watch.addEventListener("click", (e) => { e.preventDefault(); openModal(p); });
      credits.appendChild(watch);

      expand.appendChild(still);
      expand.appendChild(credits);
      inner.appendChild(expand);
      panel.appendChild(inner);

      head.addEventListener("click", () => toggleRow(i));

      row.appendChild(head);
      row.appendChild(panel);
      row.dataset.i = String(i);
      idx.appendChild(row);
    });
  }

  function toggleRow(i) {
    const rows = $$(".idx__row");
    rows.forEach((r) => {
      if (Number(r.dataset.i) === i && openRow !== i) {
        r.classList.add("is-open");
      } else {
        r.classList.remove("is-open");
      }
    });
    openRow = openRow === i ? -1 : i;
  }

  /* -------------------------------------------------------------- frames */
  function renderFrames() {
    const g = $("#framesGrid");
    g.innerHTML = "";
    PHOTOS.forEach((ph, i) => {
      const fig = el("figure", "frame reveal");
      const img = el("img");
      img.src = ph.src; img.alt = L(ph.caption) || "";
      img.loading = "lazy"; img.decoding = "async";
      img.onerror = () => { fig.style.opacity = ".3"; };
      fig.appendChild(img);
      if (L(ph.caption)) fig.appendChild(el("figcaption", "mono", esc(L(ph.caption))));
      fig.addEventListener("click", () => openLightbox(i));
      g.appendChild(fig);
    });
  }

  /* --------------------------------------------------------------- about */
  function renderAbout() {
    $("#aboutText").textContent = L(APPROACH.statement);

    const fx = $("#aboutFacts");
    fx.innerHTML = "";
    (APPROACH.facts || []).forEach((f) => {
      const v = L(f.v);
      fx.appendChild(
        el("div", "row",
          "<dt>" + esc(L(f.k)) + "</dt>" +
          (v ? '<span class="sep">—</span><dd>' + esc(v) + "</dd>" : ""))
      );
    });
  }

  /* -------------------------------------------------------------- contact */
  function renderContact() {
    const mail = $("#contactEmail");
    mail.textContent = SITE.email;
    mail.href = "mailto:" + SITE.email;

    const s = $("#socials");
    s.innerHTML = "";
    (SITE.socials || []).forEach((so) => {
      const li = el("li");
      li.innerHTML =
        '<a href="' + esc(so.url) + '" target="_blank" rel="noopener">' + esc(so.label) + "</a>";
      s.appendChild(li);
    });
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
      f.title = p.title || "Video";
      stage.appendChild(f);
    } else if (v.kind === "vimeo" && v.id) {
      const f = el("iframe");
      f.src = "https://player.vimeo.com/video/" + encodeURIComponent(v.id) + "?autoplay=1&title=0&byline=0&portrait=0";
      f.allow = "autoplay; fullscreen; picture-in-picture";
      f.allowFullscreen = true;
      f.title = p.title || "Video";
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

    const bits = [p.title, L(p.format), p.year].filter(Boolean).map(esc);
    $("#modalMeta").textContent = bits.join(" · ");

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

  /* ------------------------------------------------------------ lightbox */
  const lb = $("#lightbox");
  let lbIndex = 0;

  function openLightbox(i) {
    lbIndex = i;
    paintLightbox();
    lb.hidden = false;
    document.body.classList.add("is-locked");
  }
  function paintLightbox() {
    const ph = PHOTOS[lbIndex];
    if (!ph) return;
    $("#lbImg").src = ph.src;
    $("#lbImg").alt = L(ph.caption) || "";
    $("#lbCap").textContent = L(ph.caption) || "";
  }
  function stepLightbox(d) {
    lbIndex = (lbIndex + d + PHOTOS.length) % PHOTOS.length;
    paintLightbox();
  }
  function closeLightbox() {
    lb.hidden = true;
    document.body.classList.remove("is-locked");
  }

  $("#lbBackdrop").addEventListener("click", closeLightbox);
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => stepLightbox(-1));
  $("#lbNext").addEventListener("click", () => stepLightbox(1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (!modal.hidden) closeModal(); if (!lb.hidden) closeLightbox(); }
    if (!lb.hidden) {
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    }
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
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
      );
    }
    $$(".reveal:not(.is-in)").forEach((n) => io.observe(n));
  }

  /* ------------------------------------------------------------------ nav */
  const navLinks = $("#navLinks");
  const burger = $("#burger");

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
      poster: (SITE.reel || {}).poster,
      year: (SITE.reel || {}).year || String(new Date().getFullYear()),
      format: { en: "Showreel", pl: "Showreel" },
    })
  );

  /* ----------------------------------------------------------------- boot */
  renderStatic();
  applyLang();

  // ?noanim=1 — мгновенно показать всё без анимаций (удобно для скриншотов)
  if (/[?&]noanim/.test(location.search)) {
    $$(".reveal").forEach((n) => n.classList.add("is-in"));
    document.documentElement.style.scrollBehavior = "auto";
    return;
  }
})();
