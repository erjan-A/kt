const sections = Array.from(document.querySelectorAll(".section[id]"));
const navLinks = Array.from(document.querySelectorAll(".contents-nav a"));
const progressLabel = document.querySelector("[data-progress-label]");
const progressBar = document.querySelector("[data-progress-bar]");
const railTitle = document.querySelector("[data-rail-title]");
const railBody = document.querySelector("[data-rail-body]");
const railKicker = document.querySelector("[data-rail-kicker]");
const currentExample = document.querySelector("[data-current-example]");
const currentCopy = document.querySelector("[data-current-copy]");
const themeToggle = document.querySelector(".theme-toggle");
const toast = document.querySelector(".copy-toast");

const railData = {
  story: {
    title: "Что это такое",
    body: "Chief of staff здесь означает рабочую память и координационный слой: briefing, источники, next actions и review в одном месте.",
    example: "Пример:\nПроблема: каждый новый чат требует briefing.\nРешение: folder-based AI OS.\nЦель: AI продолжает работу с того места, где мы остановились.",
    copy: "Открой мою рабочую папку и не меняй файлы. Сначала найди главный системный вход или README. Затем кратко опиши, как сейчас устроена моя AI OS: где живёт правда по проектам, какие источники читаются, какие повторяемые workflows уже есть, где нужен мой review. В конце дай 5 практичных улучшений, без выдуманных фактов.",
  },
  map: {
    title: "Карта KT OS",
    body: "Схема нужна, чтобы коллега увидел не папки, а связи между источниками, tools layer, контекстом, skills и automations.",
    example: "Пример схемы:\nВходы -> Tools -> Router\nProject context -> Output -> Review\nKB + Skills + Automations -> Compound loop",
    copy: "Открой мою рабочую папку и составь схему моей AI OS. Покажи связи между входами, системными правилами, проектными контекстами, базой знаний, skills, automations, Telegram и review. Верни Mermaid-схему и краткое объяснение каждого слоя. Не меняй файлы.",
  },
  system: {
    title: "00_Система",
    body: "Это слой управления. Он говорит AI, что читать, что менять и где нужна проверка.",
    example: "Пример структуры:\n00_Система/\n  00_START_HERE.md\n  01_Контекст/\n  02_Правила/\n  03_Источники/\n  04_Журнал/\n  06_Автоматизация/\n  07_Шаблоны/",
    copy: "Открой мою рабочую папку и предложи системный слой для AI OS. Не меняй файлы сразу. Сначала дай структуру START_HERE.md, TASK_ROUTER.md и короткого checklist. Для каждого файла напиши: зачем он нужен, что агент должен читать первым, что можно делать без подтверждения, где нужен мой review, как проверять результат. Если в папке уже есть похожие файлы, покажи, что именно лучше обновить.",
  },
  projects: {
    title: "01_Проекты",
    body: "Каждый проект должен иметь живой `КОНТЕКСТ.md`, иначе AI снова работает по памяти из чата.",
    example: "Пример:\n01_Проекты/Закупки/ИИ поиск тендеров/КОНТЕКСТ.md\n01_Проекты/ДУКО/Адвокат клиента/КОНТЕКСТ.md\n01_Проекты/ЦА/КЦП/КОНТЕКСТ.md",
    copy: "Для проекта PROJECT_PATH создай черновик КОНТЕКСТ.md. Сначала прочитай доступные материалы внутри проекта. Затем выдели: цель, пользователь, текущий статус, важные решения, открытые вопросы, blockers, next actions, связанные файлы. Не выдумывай факты. Если данных нет, пиши не найдено. Перед записью файла покажи черновик и спроси подтверждение.",
  },
  skills: {
    title: "Skills",
    body: "Skill нужен там, где задача повторяется и есть риск ошибиться в формате, источниках, управленческой логике или review.",
    example: "Пример skills:\nproject-update\nkt-project-briefing\nceo-strategy-reviewer\nkt-session-compound\nkt-open-design-slides\nyoutube-daily-digest\nba-task-followup",
    copy: "Осмотри мои повторяемые задачи в этой рабочей папке и предложи 5 skills, которые стоит создать первыми. Для каждого skill дай: когда запускать, какие источники читать, какие шаги делать, какой результат выдавать, где нужен мой review. Не пиши код и не создавай skill без подтверждения.",
  },
  automations: {
    title: "Автоматизации и Telegram",
    body: "Automation нужен для регулярного цикла: daily sync, YouTube digest, BA reminders, update collector или weekly hygiene.",
    example: "Пример:\n09:00 BA reminders -> Telegram\n10:00 update collector -> статусы и blockers\n17:30 daily truth sync -> что обновить в source of truth\nWeekly hygiene -> структура и skills health",
    copy: "Посмотри на мои регулярные рабочие циклы и предложи 3 automations, которые реально уменьшат ручную работу. Для каждой: входной сигнал, частота, что читает, что выдаёт, куда доставляет результат, где нужна проверка человеком. Не предлагай интеграции, которых нет в моей среде.",
  },
  tools: {
    title: "Инструменты и MCP",
    body: "Я выбрал Cortex, но принцип переносим: Co-work, Code, Codex или local/open-source LLMs, если есть files, tools, rules и verification.",
    example: "Пример tools layer:\nCortex -> моя рабочая среда\nClaude Co-work / Claude Code -> можно повторить\nCodex -> можно повторить\nLocal/open-source LLMs -> после проверки гипотезы\nMCP/connectors -> tools layer",
    copy: "Осмотри мою рабочую папку и опиши tools layer для моей AI OS. Раздели инструменты на 4 группы: что читает источники, что помогает писать документы, что проверяет результат, что отправляет или доставляет итог. Для каждого инструмента укажи простыми словами: зачем он нужен, какой источник правды он использует, что можно делать без меня, где нужен мой review. Не уходи в детали реализации, пиши для коллеги BA/PM/PMM.",
  },
  knowledge: {
    title: "База знаний",
    body: "KB хранит reusable insights, а не текущий статус проекта.",
    example: "Пример структуры:\n03_База знаний/\n  AI Knowledge Base.md\n  YouTube/notes/\n  YouTube/digests/\n  Внешние материалы/",
    copy: "Проанализируй мою папку базы знаний и предложи простые правила: что сохранять как reusable insight, что переносить в проектный контекст, что превращать в skill или template. Верни короткий README-черновик и 5 примеров решений, куда это класть. Не меняй файлы без подтверждения.",
  },
  youtube: {
    title: "Пример YouTube-дайджеста",
    body: "Видео из playlist To Summarize становятся базой идей: их можно прогонять через новый проект, чтобы найти patterns, risks и skills.",
    example: "Пример формата:\nСуть\n- Почему видео стоит внимания.\n- Как оно связано с моей рабочей OS.\nТезисы\n- 2-5 главных мыслей.\n- Без пересказа ради пересказа.\nВозможности для KT\n- Где применить в проектах.\n- Какой skill или prompt может появиться.\nКак применить сегодня\n- Один маленький следующий шаг.\n- Что сохранить в базу знаний.",
    copy: "Возьми проект PROJECT_PATH и прогони его через мои YouTube digests и базу знаний. Найди 5-7 релевантных инсайтов, похожих patterns, risks, prompts или skills. Для каждого инсайта укажи источник, почему он применим к проекту, что можно попробовать сегодня и что нельзя автоматизировать без проверки. Не выдумывай источники.",
  },
  choose: {
    title: "Как выбрать, что строить",
    body: "Сначала докажите, что гипотеза работает на сильной модели. Потом оптимизируйте стоимость, скорость и deployment.",
    example: "Пример фильтра:\nTop model first -> проверить возможно ли\nVerify before build -> как проверить\nMiddle-to-middle -> человек -> AI -> человек\nOptimize later -> local LLM, кеш, prompts, guardrails",
    copy: "Осмотри мою рабочую папку и выбери, что стоит строить первым: prompt, template, skill или automation. Используй критерии: повторяемость, риск ошибки, частота, наличие source of truth, простота проверки, польза для текущих проектов. Верни таблицу из 10 кандидатов и отметь первые 3, которые нужно сделать сейчас.",
  },
  copy: {
    title: "7-day starter plan",
    body: "Новичку нужно не скопировать всю KT OS, а пройти 7 дней: проект, контекст, правила, sources, skill-кандидат, delivery channel, review.",
    example: "Starter kit:\nDay 1 -> один проект\nDay 2 -> START_HERE\nDay 3 -> sources\nDay 4 -> reusable prompt\nDay 5 -> skill candidate\nDay 6 -> delivery channel\nDay 7 -> review",
    copy: "Проведи меня как новичка через 7-дневный starter plan для личной AI OS. Моя роль: ROLE. Мои 1-2 главных типа проектов: PROJECT_TYPES. Для каждого дня дай конкретное действие, какой файл создать или обновить, какой prompt использовать, какой результат считается готовым и где нужен мой review. Не предлагай сложные automations до того, как появится один рабочий проектный контекст.",
  },
};

let toastTimer;
let activeSectionId = "story";
let scrollSpyFrame;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1500);
}

async function copyText(value) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    showToast("Copied");
  } catch {
    showToast("Copy failed");
  }
}

function setActiveSection(id) {
  if (!railData[id]) return;
  activeSectionId = id;
  const index = sections.findIndex((section) => section.id === id);
  const sectionNumber = Math.max(index + 1, 1);
  const data = railData[id];
  let activeLink;

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
    if (isActive) activeLink = link;
  });

  activeLink?.scrollIntoView({ block: "nearest" });

  if (data) {
    railKicker.textContent = `Section ${sectionNumber}`;
    railTitle.textContent = data.title;
    railBody.textContent = data.body;
    currentExample.textContent = data.copy;
    currentCopy.dataset.copySection = id;
  }

  progressLabel.textContent = `${sectionNumber} / ${sections.length}`;
  progressBar.style.width = `${(sectionNumber / sections.length) * 100}%`;
}

function updateSectionFromScroll() {
  const anchor = window.scrollY + 120;
  let nextId = sections[0]?.id || "story";

  for (const section of sections) {
    if (section.offsetTop <= anchor) nextId = section.id;
    else break;
  }

  if (nextId !== activeSectionId) setActiveSection(nextId);
}

function scheduleScrollSpy() {
  cancelAnimationFrame(scrollSpyFrame);
  scrollSpyFrame = requestAnimationFrame(updateSectionFromScroll);
}

window.addEventListener("scroll", scheduleScrollSpy, { passive: true });
window.addEventListener("resize", scheduleScrollSpy);
setActiveSection("story");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href")?.slice(1);
    if (id) setActiveSection(id);
  });
});

document.querySelectorAll(".prompt-block").forEach((block) => {
  const button = block.querySelector("button");
  button.addEventListener("click", () => copyText(block.dataset.prompt));
});

currentCopy.addEventListener("click", () => {
  const id = currentCopy.dataset.copySection || activeSectionId;
  copyText(railData[id].copy);
});

function syncThemeLabel() {
  const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  themeToggle.dataset.mode = current;
}

const savedTheme = localStorage.getItem("kt-os-guide-theme");
if (savedTheme === "light") document.documentElement.setAttribute("data-theme", "light");
syncThemeLabel();

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("kt-os-guide-theme", next);
  syncThemeLabel();
});
