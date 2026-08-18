/* =========================================================================
   CONTENT — единственный файл, который нужно редактировать.
   ONLY FILE YOU NEED TO EDIT.

   Здесь: имя, тексты, проекты, контакты, переводы EN / PL.
   ========================================================================= */

const SITE = {
  // Имя в шапке и в подвале
  name: "RUSTAM BULATOV",

  // Город (шапка подвала)
  city: { en: "Warsaw", pl: "Warszawa" },

  // Адрес сайта БЕЗ слэша на конце — например "https://rustambulatov.com".
  // Пустая строка = относительные пути (работают в Telegram, Facebook, Slack).
  // Как появится домен — впиши сюда, и превью ссылки подтянется везде,
  // включая LinkedIn и Google.
  url: "",

  // Контакты
  email: "rustambulatov05@gmail.com",

  // Соцсети. Убери строку — исчезнет и ссылка.
  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
  ],

  // Шоурил на первом экране.
  // video: { kind: "youtube", id: "ID_ИЗ_ССЫЛКИ" }
  //      | { kind: "drive",   id: "ID_ИЗ_ССЫЛКИ_GOOGLE_DRIVE" }
  //      | { kind: "mp4",     src: "assets/video/reel.mp4" }
  // autoplay: true — шоурил сам стартует на первом экране (без звука, по кругу),
  //           клик по нему открывает большое окно со звуком.
  //           Для kind: "youtube" автостарт не работает — нужен drive или mp4.
  // ratio: пропорции окна шоурила — ставь такие же, как у самого видео,
  //        иначе кадр обрежется по краям. По умолчанию "12 / 5".
  reel: {
    year: "2026",
    poster: "assets/img/reel-poster.jpg",
    video: { kind: "mp4", src: "assets/video/reel.mp4" },
    ratio: "4 / 3",
    autoplay: true,
  },
};

/* -------------------------------------------------------------------------
   РАБОТЫ / WORK
   Каждая строка в таблице раскрывается по клику.
   ПОРЯДОК В ТАБЛИЦЕ = порядок в этом массиве (сверху вниз).

   format — то, что стоит в колонке FORMAT
   video  — { kind: "youtube", id: "..." } | { kind: "mp4", src: "..." } | null
   poster — кадр 16:9 (или превью с YouTube)
   cover  — вертикальная обложка 4:5 из assets/img/covers/ (необязательно).
            Если файла нет — тихо показывается poster.
   credits — произвольные строки в раскрытой карточке
   ------------------------------------------------------------------------- */

const PROJECTS = [
  {
    title: "Nnaia",
    year: "2025",
    format: { en: "Music Video", pl: "Teledysk" },
    poster: "https://i.ytimg.com/vi/GwTPkAQkCBA/maxresdefault.jpg",
    cover: "assets/img/covers/nnaia.jpg",
    video: { kind: "youtube", id: "GwTPkAQkCBA" },
    description: null,
    credits: [],
  },
  {
    title: "Memories (part 2)",
    year: "2025",
    format: { en: "Commercial", pl: "Reklama" },
    poster: "https://i.ytimg.com/vi/gkG1SKikLnE/maxresdefault.jpg",
    cover: "assets/img/covers/memories-part-2.jpg",
    video: { kind: "youtube", id: "gkG1SKikLnE" },
    description: null,
    credits: [],
  },
  {
    title: "Memories (part 1)",
    year: "2025",
    format: { en: "Commercial", pl: "Reklama" },
    poster: "https://i.ytimg.com/vi/s_4gUKdj3xk/maxresdefault.jpg",
    cover: "assets/img/covers/memories-part-1.jpg",
    video: { kind: "youtube", id: "s_4gUKdj3xk" },
    description: null,
    credits: [],
  },
  {
    title: "Run with Me",
    year: "2025",
    format: { en: "Music Video", pl: "Teledysk" },
    poster: "https://i.ytimg.com/vi/2ikUAzTHwNU/maxresdefault.jpg",
    video: { kind: "youtube", id: "2ikUAzTHwNU" },
    description: null,
    credits: [],
  },
  {
    title: "Wrong Leg",
    year: "2025",
    format: { en: "Music Video", pl: "Teledysk" },
    poster: "https://i.ytimg.com/vi/Mahfb3rby_w/maxresdefault.jpg",
    cover: "assets/img/covers/wrong-leg.jpg",
    video: { kind: "youtube", id: "Mahfb3rby_w" },
    description: null,
    credits: [],
  },
  {
    title: "Bizhu do Tebe",
    year: "2024",
    format: { en: "Commercial", pl: "Reklama" },
    poster: "https://i.ytimg.com/vi/TprChxO_TM4/maxresdefault.jpg",
    cover: "assets/img/covers/bizhu-do-tebe.jpg",
    video: { kind: "youtube", id: "TprChxO_TM4" },
    description: null,
    credits: [],
  },
  {
    title: "Chimera",
    year: "2025",
    format: { en: "Experimental Short Film", pl: "Eksperymentalny krótki metraż" },
    poster: "https://i.ytimg.com/vi/Qd4sXnxq_7s/maxresdefault.jpg",
    cover: "assets/img/covers/chimera.jpg",
    video: { kind: "youtube", id: "Qd4sXnxq_7s" },
    description: null,
    credits: [],
  },
  {
    title: "Solfi",
    year: "2024",
    format: { en: "Commercial", pl: "Reklama" },
    poster: "https://i.ytimg.com/vi/ynHzAmfBHU0/maxresdefault.jpg",
    video: { kind: "youtube", id: "ynHzAmfBHU0" },
    description: null,
    credits: [],
  },
  {
    title: "The Choice",
    year: "2024",
    format: { en: "Experimental Short Film", pl: "Eksperymentalny krótki metraż" },
    poster: "https://i.ytimg.com/vi/TihlObaQ7WE/maxresdefault.jpg",
    cover: "assets/img/covers/the-choice.jpg",
    video: { kind: "youtube", id: "TihlObaQ7WE" },
    description: null,
    credits: [],
  },
];

/* -------------------------------------------------------------------------
   О СЕБЕ / ABOUT
   ------------------------------------------------------------------------- */

const ABOUT = {
  statement: {
    en: [
      "What interests me first is conflict — inside a person and between people — and the story that grows out of it. The format comes second: film, commercial or music video.",
    ],
    pl: [
      "Najbardziej interesuje mnie konflikt — wewnątrz człowieka i między ludźmi — oraz historia, która z niego wyrasta. Format jest drugorzędny: film, reklama czy teledysk.",
    ],
  },
  // Правая колонка секции ABOUT
  meta: [
    { k: { en: "Based", pl: "Baza" }, v: { en: "Warsaw", pl: "Warszawa" } },
    { k: { en: "Work", pl: "Praca" }, v: { en: "Europe", pl: "Europa" } },
    { k: { en: "Languages", pl: "Języki" }, v: { en: "EN · PL · RU", pl: "EN · PL · RU" } },
  ],
};

/* -------------------------------------------------------------------------
   ПЕРЕВОДЫ ИНТЕРФЕЙСА
   ------------------------------------------------------------------------- */

const I18N = {
  en: {
    "nav.work": "Work",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.menu": "Menu",

    "hero.title.1": "Director Rustam Bulatov.",
    "hero.title.2": "Warsaw and Europe.",

    "reel.label": "Showreel",
    "reel.play": "Full screen",

    "work.label": "Work",
    "work.projects": "projects",
    "work.sort": "Order",
    "work.col.n": "№",
    "work.col.title": "Title",
    "work.col.format": "Format",
    "work.col.year": "Year",
    "work.watch": "Watch",
    "work.soon": "Coming soon",

    "about.label": "About",
    "about.photo": "Director",

    "contact.label": "Contact",
    "contact.copy": "Copy",
    "contact.copied": "Copied",

    "modal.close": "Close",
  },

  pl: {
    "nav.work": "Prace",
    "nav.about": "O mnie",
    "nav.contact": "Kontakt",
    "nav.menu": "Menu",

    "hero.title.1": "Reżyser Rustam Bulatov.",
    "hero.title.2": "Warszawa i Europa.",

    "reel.label": "Showreel",
    "reel.play": "Pełny ekran",

    "work.label": "Prace",
    "work.projects": "projekty",
    "work.sort": "Kolejność",
    "work.col.n": "№",
    "work.col.title": "Tytuł",
    "work.col.format": "Format",
    "work.col.year": "Rok",
    "work.watch": "Zobacz",
    "work.soon": "Wkrótce",

    "about.label": "O mnie",
    "about.photo": "Reżyser",

    "contact.label": "Kontakt",
    "contact.copy": "Kopiuj",
    "contact.copied": "Skopiowano",

    "modal.close": "Zamknij",
  },
};
