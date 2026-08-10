/* =========================================================================
   CONTENT — единственный файл, который тебе нужно редактировать.
   ONLY FILE YOU NEED TO EDIT.

   Здесь: имя, тексты, проекты, фотографии, контакты, переводы EN/PL.
   ========================================================================= */

const SITE = {
  // Имя в шапке и в подвале
  name: "RUSTAM BULATOV",

  // Город — используется в подвале и в блоке About
  city: { en: "Warsaw", pl: "Warszawa" },

  // Контакты
  email: "rusyabulatov05@gmail.com",

  // Соцсети — короткой строкой справа от e-mail. Убери строку, если не нужна.
  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "Vimeo", url: "https://vimeo.com/" },
    { label: "IMDb", url: "https://imdb.com/" },
  ],

  // Главный шоурил — открывается по клику по превью.
  // kind: "youtube" (вставь ID из ссылки), "vimeo" (ID) или "mp4" (файл в assets/video/)
  reel: {
    kind: "youtube",
    id: "dQw4w9WgXcQ",
    // Пример mp4: kind: "mp4", src: "assets/video/reel.mp4",
    poster: "assets/img/hero.jpg", // превью-кадр 2.35:1
    year: "2026",
    duration: "2′14″",
  },
};

/* -------------------------------------------------------------------------
   РАБОТЫ / WORK — таблица-индекс
   video:  { kind: "youtube", id: "ID_ИЗ_ССЫЛКИ" }
           { kind: "vimeo", id: "ID" }
           { kind: "mp4", src: "assets/video/имя.mp4" }
           null — если видео пока нет
   poster: превью-кадр для раскрытой строки, положи в assets/img/
   format: значение колонки FORMAT (короткое)
   credits: строки в раскрытой карточке (роль + значение)
   ------------------------------------------------------------------------- */

const PROJECTS = [
  {
    title: "Metropolis",
    client: { en: "Nike", pl: "Nike" },
    year: "2025",
    format: { en: "Commercial · 60″", pl: "Reklama · 60″" },
    poster: "assets/img/work-1.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    credits: [
      { role: { en: "DOP", pl: "Operator" }, name: "Anna Kowalska" },
      { role: { en: "Production", pl: "Produkcja" }, name: "Papaya Films" },
      { role: { en: "Agency", pl: "Agencja" }, name: "Wieden+Kennedy" },
      { role: { en: "Format", pl: "Format" }, name: "35mm Anamorphic" },
    ],
  },
  {
    title: "Blue Hour",
    client: { en: "Independent", pl: "Niezależny" },
    year: "2025",
    format: { en: "Short Film · 12′", pl: "Krótki metraż · 12′" },
    poster: "assets/img/work-2.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    credits: [
      { role: { en: "DOP", pl: "Operator" }, name: "Marek Nowicki" },
      { role: { en: "Production", pl: "Produkcja" }, name: "Independent" },
      { role: { en: "Format", pl: "Format" }, name: "16mm" },
    ],
  },
  {
    title: "Static",
    client: { en: "Kasia Nowak", pl: "Kasia Nowak" },
    year: "2024",
    format: { en: "Music Video", pl: "Teledysk" },
    poster: "assets/img/work-3.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    credits: [
      { role: { en: "DOP", pl: "Operator" }, name: "Anna Kowalska" },
      { role: { en: "Production", pl: "Produkcja" }, name: "Papaya Films" },
      { role: { en: "Format", pl: "Format" }, name: "Super 16" },
    ],
  },
  {
    title: "Salt",
    client: { en: "Reserved", pl: "Reserved" },
    year: "2024",
    format: { en: "Fashion Film", pl: "Film modowy" },
    poster: "assets/img/work-4.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    credits: [
      { role: { en: "DOP", pl: "Operator" }, name: "Julia Adamska" },
      { role: { en: "Production", pl: "Produkcja" }, name: "Reserved Studio" },
      { role: { en: "Format", pl: "Format" }, name: "Anamorphic" },
    ],
  },
  {
    title: "Rehearsal",
    client: { en: "Teatr Nowy", pl: "Teatr Nowy" },
    year: "2023",
    format: { en: "Documentary · 22′", pl: "Dokument · 22′" },
    poster: "assets/img/work-5.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    credits: [
      { role: { en: "DOP", pl: "Operator" }, name: "Marek Nowicki" },
      { role: { en: "Production", pl: "Produkcja" }, name: "Teatr Nowy" },
      { role: { en: "Format", pl: "Format" }, name: "Available light" },
    ],
  },
  {
    title: "Nightshift",
    client: { en: "Orlen", pl: "Orlen" },
    year: "2023",
    format: { en: "Branded · 3×30″", pl: "Branded · 3×30″" },
    poster: "assets/img/work-6.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    credits: [
      { role: { en: "DOP", pl: "Operator" }, name: "Anna Kowalska" },
      { role: { en: "Production", pl: "Produkcja" }, name: "Papaya Films" },
      { role: { en: "Format", pl: "Format" }, name: "Digital" },
    ],
  },
];

/* -------------------------------------------------------------------------
   ABOUT — один абзац о себе + колонка фактов
   (имя переменной оставлено APPROACH для совместимости)
   ------------------------------------------------------------------------- */

const APPROACH = {
  statement: {
    en: "What interests me first is conflict — inside a person and between people — and the story that grows out of it. The format comes second: film, commercial or music video.",
    pl: "Najbardziej interesuje mnie konflikt — wewnętrzny i między ludźmi — oraz historia, która z niego wyrasta. Format jest wtórny: film, reklama czy teledysk.",
  },
  // Колонка фактов справа. Оставь v пустым — строка будет без значения.
  facts: [
    { k: { en: "Based", pl: "Baza" }, v: { en: "Warsaw", pl: "Warszawa" } },
    { k: { en: "Work", pl: "Praca" }, v: { en: "Europe", pl: "Europa" } },
    { k: { en: "Languages", pl: "Języki" }, v: { en: "EN · PL · RU", pl: "EN · PL · RU" } },
    { k: { en: "Reel & CV on request", pl: "Reel i CV na życzenie" }, v: null },
  ],
};

/* -------------------------------------------------------------------------
   ФОТО / FRAMES — четыре квадратных кадра в ряд, клик открывает лайтбокс.
   ------------------------------------------------------------------------- */

const PHOTOS = [
  { src: "assets/img/photo-1.jpg", caption: { en: "On set — Metropolis, 2025", pl: "Na planie — Metropolis, 2025" } },
  { src: "assets/img/photo-2.jpg", caption: { en: "Blocking rehearsal", pl: "Próba ustawień" } },
  { src: "assets/img/photo-4.jpg", caption: { en: "Baltic coast, 5:40 AM", pl: "Wybrzeże Bałtyku, 5:40" } },
  { src: "assets/img/photo-6.jpg", caption: { en: "Night exterior", pl: "Noc, plener" } },
];

/* -------------------------------------------------------------------------
   ПЕРЕВОДЫ ИНТЕРФЕЙСА — меняй тексты здесь
   ------------------------------------------------------------------------- */

const I18N = {
  en: {
    "nav.work": "Work",
    "nav.frames": "Frames",
    "nav.about": "About",
    "nav.contact": "Contact",

    "hero.title.1": "Director Rustam Bulatov.",
    "hero.title.2": "Warsaw and Europe.",

    "hero.reel": "Showreel",
    "hero.sound": "Sound on",
    "hero.reeltag": "Reel — Commercials, Music videos, Short films",
    "hero.play": "Play",

    "work.label": "Work",
    "work.projects": "projects",
    "work.sort": "By year ↓",
    "work.col.title": "Title",
    "work.col.client": "Client",
    "work.col.format": "Format",
    "work.col.year": "Year",
    "work.watch": "Watch →",
    "work.soon": "Coming soon",

    "frames.label": "Frames",

    "about.label": "About",

    "contact.label": "Contact",

    "footer.city": "Warsaw",

    "modal.close": "Close",
  },

  pl: {
    "nav.work": "Prace",
    "nav.frames": "Kadry",
    "nav.about": "O mnie",
    "nav.contact": "Kontakt",

    "hero.title.1": "Reżyser Rustam Bulatov.",
    "hero.title.2": "Warszawa i Europa.",

    "hero.reel": "Showreel",
    "hero.sound": "Dźwięk wł.",
    "hero.reeltag": "Reel — Reklamy, Teledyski, Krótkie metraże",
    "hero.play": "Odtwórz",

    "work.label": "Prace",
    "work.projects": "projekty",
    "work.sort": "Wg roku ↓",
    "work.col.title": "Tytuł",
    "work.col.client": "Klient",
    "work.col.format": "Format",
    "work.col.year": "Rok",
    "work.watch": "Zobacz →",
    "work.soon": "Wkrótce",

    "frames.label": "Kadry",

    "about.label": "O mnie",

    "contact.label": "Kontakt",

    "footer.city": "Warszawa",

    "modal.close": "Zamknij",
  },
};
