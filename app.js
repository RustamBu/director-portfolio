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
  const L = (v) => (v && typeof v === "object" ? (v[lang] != null ? v[lang] : v.en) : v) || "";

  /* ---------------------------------------------------------------- state */
  let sortDesc = true;      // true — как в content.js, false — наоборот
  let openId = null;        // раскрытая строка

  /* --------------------------------------------------------------- static */
  function renderStatic() {
    $("#brandName").textContent = SITE.name;
    $("#footName").textContent = SITE.name;
    $("#footYear").textContent = "© " + new Date().getFullYear();

    const reel = SITE.reel || {};
    $("#reelYear").textContent = reel.year || "";

    const box = $("#reelMedia");
    box.innerHTML = "";
    if (reel.poster) {
      const i = el("img");
      i.src = reel.poster;
      i.alt = "";
      i.decoding = "async";
      i.onerror = () => i.remove();
      box.appendChild(i);
    }
    if (!reel.video) $("#reel").hidden = true;
  }

  /* ----------------------------------------------------------------- lang */
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}

    $$("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
    $$("[data-setlang]").forEach((b) => b.classList.toggle("is-active", b.dataset.setlang === lang));

    $("#footCity").textContent = L(SITE.city);
    $("#workCount").textContent =
      String(PROJECTS.length).padStart(2, "0") + " " + t("work.projects");

    renderWork();
    renderAbout();
    renderContact();
    observeReveals();
  }

  /* ----------------------------------------------------------------- work */
  // Порядок в таблице = порядок массива PROJECTS в content.js.
  // Кнопка сортировки просто переворачивает список.
  function sorted() {
    const list = PROJECTS.map((p, i) => ({ p, i }));
    return sortDesc ? list : list.reverse();
  }

  function renderWork() {
    const list = $("#workList");
    list.innerHTML = "";
    $("#sortArrow").textContent = sortDesc ? "↓" : "↑";

    sorted().forEach(({ p, i }, n) => {
      const hasVideo = !!(p.video && (p.video.id || p.video.src));
      const row = el("article", "row");
      if (openId === i) row.classList.add("is-open");

      /* строка */
      const line = el("button", "row__line");
      line.type = "button";
      line.setAttribute("aria-expanded", String(openId === i));
      line.innerHTML =
        '<span class="row__n">' + String(n + 1).padStart(2, "0") + "</span>" +
        '<span class="row__title">' + esc(p.title) + "</span>" +
        '<span class="row__format">' + esc(L(p.format)) + "</span>" +
        '<span class="row__year">' + esc(p.year || "") + "</span>";
      line.addEventListener("click", () => {
        openId = openId === i ? null : i;
        renderWork();
      });
      row.appendChild(line);

      /* раскрывающаяся часть */
      const credits = (p.credits || [])
        .map((c) => "<div><dt>" + esc(L(c.k)) + "</dt><dd>" + esc(L(c.v)) + "</dd></div>")
        .join("");

      const panel = el("div", "row__panel");
      const wrap = el("div");
      const inner = el("div", "row__inner");

      const still = el("div", "row__still");
      if (p.cover || p.poster) {
        // вертикальная обложка 4:5 показывается целиком, фон — она же в размытии
        const useCover = Boolean(p.cover);
        if (useCover) still.classList.add("row__still--cover");

        const bg = el("img", "row__still-bg");
        bg.alt = "";
        bg.setAttribute("aria-hidden", "true");
        bg.loading = "lazy";
        bg.decoding = "async";
        bg.onerror = () => bg.remove();

        const img = el("img", "row__still-img");
        img.alt = p.title;
        img.loading = "lazy";
        img.decoding = "async";
        // 1) нет обложки — падаем на poster; 2) нет maxresdefault — на hqdefault
        img.onerror = () => {
          if (useCover && img.dataset.stage !== "poster" && p.poster) {
            img.dataset.stage = "poster";
            still.classList.remove("row__still--cover");
            img.src = p.poster;
            bg.remove();
            return;
          }
          if (img.src.indexOf("/maxresdefault.jpg") > -1) {
            img.src = img.src.replace("/maxresdefault.jpg", "/hqdefault.jpg");
            return;
          }
          img.remove();
          bg.remove();
        };

        const src = p.cover || p.poster;
        if (useCover) { bg.src = src; still.appendChild(bg); }
        img.src = src;
        still.appendChild(img);
      }
      inner.appendChild(still);

      const side = el("div", "row__side");
      if (credits) side.appendChild(el("dl", "row__credits", credits));
      if (L(p.description)) side.appendChild(el("p", "row__desc", esc(L(p.description))));

      const watch = el("button", "watch mono",
        (hasVideo ? esc(t("work.watch")) : esc(t("work.soon"))) + " <span aria-hidden='true'>→</span>");
      watch.type = "button";
      watch.addEventListener("click", (e) => { e.stopPropagation(); openModal(p); });
      side.appendChild(watch);

      inner.appendChild(side);
      wrap.appendChild(inner);
      panel.appendChild(wrap);
      row.appendChild(panel);

      list.appendChild(row);
    });
  }

  /* ---------------------------------------------------------------- about */
  function renderAbout() {
    const box = $("#aboutText");
    box.innerHTML = "";
    (L(ABOUT.statement) || []).forEach((para) => box.appendChild(el("p", null, esc(para))));

    const cap = $("#aboutPhotoCaption");
    if (cap) cap.textContent = t("about.photo");

    const meta = $("#aboutMeta");
    meta.innerHTML = "";
    (ABOUT.meta || []).forEach((m) => {
      meta.appendChild(
        el("div", "row-meta reveal",
          "<dt>" + esc(L(m.k)) + " —</dt><dd>" + esc(L(m.v)) + "</dd>")
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

  /* ---------------------------------------------------------------- modal */
  const modal = $("#modal");
  const stage = $("#modalStage");
  let lastFocus = null;

  function mountVideo(v, poster, title) {
    stage.innerHTML = "";
    if (v && v.kind === "youtube" && v.id) {
      const f = el("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.id) +
              "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true;
      f.title = title || "Video";
      stage.appendChild(f);
    } else if (v && v.kind === "mp4" && v.src) {
      const vid = el("video");
      vid.src = v.src;
      vid.controls = true;
      vid.autoplay = true;
      vid.playsInline = true;
      vid.setAttribute("playsinline", "");
      if (poster) vid.poster = poster;
      stage.appendChild(vid);
    } else {
      stage.appendChild(el("div", "placeholder", esc(t("work.soon"))));
    }
  }

  function showModal() {
    modal.hidden = false;
    document.body.classList.add("is-locked");
    $("#modalClose").focus();
  }

  function openModal(p) {
    lastFocus = document.activeElement;
    mountVideo(p.video, p.poster, p.title);

    $("#modalMeta").innerHTML =
      "<div><h3>" + esc(p.title) + "</h3>" +
      (L(p.description) ? "<p>" + esc(L(p.description)) + "</p>" : "") + "</div>" +
      '<div class="side">' + esc(L(p.format)) + (p.year ? " · " + esc(p.year) : "") + "</div>";

    showModal();
  }

  function openReel() {
    lastFocus = document.activeElement;
    const reel = SITE.reel || {};
    mountVideo(reel.video, reel.poster, "Showreel");
    $("#modalMeta").innerHTML =
      '<div><h3>' + esc(t("reel.label")) + " " + esc(reel.year || "") + "</h3></div>";
    showModal();
  }

  function closeModal() {
    modal.hidden = true;
    stage.innerHTML = "";
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }

  $("#reelPlay").addEventListener("click", openReel);
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ----------------------------------------------------------------- meta */
  // Превью ссылки и данные для поисковиков живут в <head> index.html.
  // Пути там относительные; если в content.js задан SITE.url — делаем их
  // абсолютными (этого требуют LinkedIn, X и часть ботов).
  function absoluteMeta() {
    const base = String(SITE.url || "").trim().replace(/\/+$/, "");
    if (!base) return;

    const abs = (path) => base + "/" + String(path).replace(/^\.?\//, "");
    const set = (id, attr, value) => {
      const n = document.getElementById(id);
      if (n) n.setAttribute(attr, value);
    };

    set("metaCanonical", "href", base + "/");
    set("metaOgUrl", "content", base + "/");
    ["metaOgImage", "metaOgImageSecure", "metaTwImage"].forEach((id) =>
      set(id, "content", abs("assets/img/og.jpg"))
    );

    const ld = $("#ldPerson");
    if (!ld) return;
    try {
      const data = JSON.parse(ld.textContent);
      data.url = base + "/";
      if (data.image && data.image.url) data.image.url = abs(data.image.url);
      ld.textContent = JSON.stringify(data, null, 2);
    } catch (e) {}
  }

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
            const n = entry.target;
            setTimeout(() => n.classList.add("is-in"), Number(n.dataset.delay || 0));
            io.unobserve(n);
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
      );
    }
    $$(".reveal:not(.is-in)").forEach((n) => {
      if (!n.dataset.delay) {
        const sibs = Array.from(n.parentElement ? n.parentElement.children : []);
        n.dataset.delay = String(Math.min(sibs.indexOf(n), 5) * 70);
      }
      io.observe(n);
    });
  }

  /* ------------------------------------------------------------------ nav */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  const burger = $("#burger");

  const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });

  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("is-locked", open);
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName !== "A") return;
    navLinks.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-locked");
  });

  $$("[data-setlang]").forEach((b) =>
    b.addEventListener("click", () => {
      if (b.dataset.setlang === lang) return;
      lang = b.dataset.setlang;
      applyLang();
    })
  );

  $("#sortBtn").addEventListener("click", () => {
    sortDesc = !sortDesc;
    renderWork();
  });

  /* ----------------------------------------------------------------- boot */
  renderStatic();
  absoluteMeta();
  applyLang();
  onScroll();

  // ?noanim=1 — мгновенно показать всё без анимаций (удобно для скриншотов)
  if (/[?&]noanim/.test(location.search)) {
    $$(".reveal").forEach((n) => n.classList.add("is-in"));
    document.documentElement.style.scrollBehavior = "auto";
  }
})();
