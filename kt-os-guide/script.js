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
    body: "KT OS начинается как папка, но работает как chief of staff: контекст, правила, tools, skills и review в одном месте.",
    example: "Пример:\nПроблема: каждый новый чат требует briefing.\nРешение: folder-based AI OS.\nЦель: AI продолжает работу с того места, где мы остановились.",
    copy: "Опиши мою AI OS как рабочую папку, которая становится chief of staff: какие источники она читает, где живёт правда, какие действия можно делегировать и где нужен human review.",
  },
  map: {
    title: "Карта KT OS",
    body: "Схема нужна, чтобы коллега увидел не папки, а связи между источниками, tools layer, контекстом, skills и automations.",
    example: "Пример схемы:\nВходы -> Tools -> Router\nProject context -> Output -> Review\nKB + Skills + Automations -> Compound loop",
    copy: "Построй Mermaid-схему моей рабочей OS: входы, MCP/connectors, router, project context, sources, skills, automations, knowledge base, review и compound loop.",
  },
  system: {
    title: "00_Система",
    body: "Это слой управления. Он говорит AI, что читать, что менять и где нужна проверка.",
    example: "Пример структуры:\n00_Система/\n  00_START_HERE.md\n  01_Контекст/\n  02_Правила/\n  03_Источники/\n  04_Журнал/\n  06_Автоматизация/\n  07_Шаблоны/",
    copy: "Создай для моей рабочей папки системный слой: START_HERE, task router, правила обновления контекста, data checklist, automation health и шаблоны.",
  },
  projects: {
    title: "01_Проекты",
    body: "Каждый проект должен иметь живой `КОНТЕКСТ.md`, иначе AI снова работает по памяти из чата.",
    example: "Пример:\n01_Проекты/Закупки/ИИ поиск тендеров/КОНТЕКСТ.md\n01_Проекты/ДУКО/Адвокат клиента/КОНТЕКСТ.md\n01_Проекты/ЦА/КЦП/КОНТЕКСТ.md",
    copy: "Создай шаблон КОНТЕКСТ.md: цель, пользователь, текущий статус, источники, решения, blockers, next actions, open questions, связанные файлы.",
  },
  skills: {
    title: "Skills",
    body: "Skill нужен там, где задача повторяется и есть риск ошибиться в формате, источниках или safety rules.",
    example: "Пример skills:\nproject-update\nai-agent-passport\nbusiness-analyst-project-intake\nyoutube-daily-digest\nyoutube-manual-digest\nba-task-followup",
    copy: "Проанализируй мои повторяемые задачи и предложи 5 skills. Для каждого дай trigger, sources, steps, safety checks и output format.",
  },
  automations: {
    title: "Автоматизации и Telegram",
    body: "Telegram удобен как канал входа и доставки, но source of truth должен быть в системе.",
    example: "Пример:\nTelegram reminder -> Plane task check -> update collected -> КОНТЕКСТ.md / daily sync\nYouTube summary -> files/state -> Telegram bot send",
    copy: "Спроектируй Telegram workflow: какие сообщения принимать, где source of truth, что отправлять автоматически, где нужно подтверждение, как хранить state и audit trail.",
  },
  tools: {
    title: "Инструменты и MCP",
    body: "Я выбрал Cortex, но принцип переносим: Co-work, Code, Codex или local/open-source LLMs, если есть files, tools, rules и verification.",
    example: "Пример tools layer:\nCortex -> моя рабочая среда\nClaude Co-work / Claude Code -> можно повторить\nCodex -> можно повторить\nLocal/open-source LLMs -> после проверки гипотезы\nMCP/connectors -> tools layer",
    copy: "Опиши tools layer моей AI OS так, чтобы его можно было повторить в Cortex, Claude Co-work, Claude Code, Codex или local/open-source LLMs. Для каждого инструмента укажи роль, source of truth, allowed actions, human approval и verification.",
  },
  knowledge: {
    title: "База знаний",
    body: "KB хранит reusable insights, а не текущий статус проекта.",
    example: "Пример структуры:\n03_База знаний/\n  AI Knowledge Base.md\n  YouTube/videos/\n  YouTube/transcripts/\n  YouTube/digests/\n  Внешние материалы/",
    copy: "Создай правила для моей knowledge base: что сохранять, что не сохранять, когда обновлять project context, когда создавать skill, как оформлять reusable insight.",
  },
  youtube: {
    title: "Пример YouTube-дайджеста",
    body: "Пример daily digest показывает, как внешний материал проходит через TranscriptAPI, файлы, state и Telegram summary.",
    example: "Короткий digest:\n# Agent workflows for knowledge work\n**Суть:** видео показывает, как agent workflow превращает prompt в повторяемую систему.\n## Тезисы\n- AI полезен, когда видит контекст, источники и ограничения.\n- Workflow должен иметь проверку и stop rules.\n## Возможности для KT\n- Применить к project briefing и passport drafts.\n- Проверить для YouTube digest, Telegram follow-up и KTWorks workflows.\n## Как применить сегодня\n- Создать один skill для повторяемой задачи.\n- Добавить project context перед summary.",
    copy: "Создай YouTube digest workflow: playlist intake, transcript, summary, KT applicability, transcript file, daily digest, processed state, Telegram send, failure rules.",
  },
  choose: {
    title: "Как выбрать, что строить",
    body: "Сначала докажите, что гипотеза работает на сильной модели. Потом оптимизируйте стоимость, скорость и deployment.",
    example: "Пример фильтра:\nTop model first -> проверить возможно ли\nVerify before build -> как проверить\nMiddle-to-middle -> человек -> AI -> человек\nOptimize later -> local LLM, кеш, prompts, guardrails",
    copy: "Посмотри на мои задачи и выбери, что делать как prompt, template, skill или automation. Используй фильтры: top model first, shelf audit, verify before build, для кого/не для кого, middle-to-middle, частота, риск ошибки, source of truth.",
  },
  copy: {
    title: "Скопировать стартовую структуру",
    body: "Копировать надо не всю KT OS, а минимальный принцип структуры.",
    example: "Starter kit:\n00_Система/\n01_Проекты/\n02_Источники/\n03_База знаний/\n04_Шаблоны/\n05_Скиллы/\n06_Автоматизация/",
    copy: "Создай мне starter kit личной OS для работы с AI. Структура: 00_Система, 01_Проекты, 02_Источники, 03_База знаний, 04_Шаблоны, 05_Скиллы, 06_Автоматизация. Для каждого слоя создай README.",
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
