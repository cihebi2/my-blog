/* Age 25 Review · UI Plus
   Command palette + reading settings + heading deep links.
   Kept framework-free and resilient across the dashboard pages. */

(() => {
  const STORAGE_KEY = "age25_ui_plus_v1";
  const DEFAULTS = {
    theme: "paper", // paper | ink
    width: "comfort", // narrow | comfort | wide
    font: "md", // sm | md | lg
    focus: false, // hide the left panel for reading
  };

  const ALLOWED = {
    theme: ["paper", "ink"],
    width: ["narrow", "comfort", "wide"],
    font: ["sm", "md", "lg"],
  };

  const KIND_LABEL = {
    S: "场景卡片",
    W: "预警信号",
    G: "好的一天",
    B: "边界脚本",
    E: "情绪需求",
    D: "渴望追求",
    A: "反向愿景",
    M: "护城河",
    R: "规则",
  };

  function safeJsonParse(text) {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  function clampChoice(value, allowed, fallback) {
    if (!value) return fallback;
    return allowed.includes(value) ? value : fallback;
  }

  function loadSettings() {
    const raw = window.localStorage ? localStorage.getItem(STORAGE_KEY) : null;
    const parsed = raw ? safeJsonParse(raw) : null;
    const obj = parsed && typeof parsed === "object" ? parsed : {};
    return {
      theme: clampChoice(obj.theme, ALLOWED.theme, DEFAULTS.theme),
      width: clampChoice(obj.width, ALLOWED.width, DEFAULTS.width),
      font: clampChoice(obj.font, ALLOWED.font, DEFAULTS.font),
      focus: typeof obj.focus === "boolean" ? obj.focus : DEFAULTS.focus,
    };
  }

  let settings = loadSettings();

  function saveSettings() {
    try {
      if (!window.localStorage) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }

  function applySettings() {
    const body = document.body;
    if (!body) return;
    body.dataset.uiTheme = settings.theme;
    body.dataset.uiWidth = settings.width;
    body.dataset.uiFont = settings.font;
    if (settings.focus) body.dataset.uiFocus = "true";
    else delete body.dataset.uiFocus;
  }

  function getToastImpl() {
    if (typeof window.toast === "function") {
      return (msg) => window.toast(msg);
    }

    return (msg) => {
      let el = document.getElementById("toast");
      if (!el) {
        el = document.createElement("div");
        el.id = "toast";
        el.className = "toast";
        el.setAttribute("role", "status");
        el.setAttribute("aria-live", "polite");
        document.body.appendChild(el);
      }
      el.textContent = msg;
      el.classList.add("show");
      window.clearTimeout(getToastImpl._t);
      getToastImpl._t = window.setTimeout(() => el.classList.remove("show"), 1600);
    };
  }

  const toast = getToastImpl();

  async function copyText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      /* fallthrough */
    }

    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "true");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return !!ok;
    } catch {
      return false;
    }
  }

  function normalizeText(s) {
    return String(s || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function isEditableTarget(target) {
    if (!target) return false;
    const el = target instanceof Element ? target : null;
    if (!el) return false;
    const tag = (el.tagName || "").toLowerCase();
    return (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      el.isContentEditable
    );
  }

  function kindFromId(id) {
    const m = String(id || "").match(/^([A-Z])(\d{2})$/);
    if (!m) return { kind: "章节", isKey: false };
    const label = KIND_LABEL[m[1]] || "章节";
    return { kind: label, isKey: !!KIND_LABEL[m[1]] };
  }

  function cleanHeadingTitle(id, rawText) {
    const text = String(rawText || "").replace(/\s+/g, " ").trim();
    const m = String(id || "").match(/^([A-Z])(\d{2})$/);
    if (!m) return text;
    const token = `${m[1]}${m[2]}`;
    return text
      .replace(new RegExp(`^\\[${token}\\]\\s*`), "")
      .replace(new RegExp(`^${token}\\s*[\\|｜\\-—–:：/\\\\]\\s*`), "")
      .replace(new RegExp(`^${token}\\s+`), "")
      .trim();
  }

  let docRoot = null;
  let headingIndex = [];
  let headingById = new Map();
  let headingByIdLower = new Map();
  let rebuildScheduled = false;

  function ensureHeadingAnchor(h) {
    if (!h || !h.id) return;
    if (h.querySelector(":scope > .ui-heading-anchor")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ui-heading-anchor";
    btn.setAttribute("title", "复制链接");
    btn.setAttribute("aria-label", "复制此标题链接");
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M10.59 13.41a1 1 0 0 0 1.41 0l4.59-4.59V11a1 1 0 1 0 2 0V5a1 1 0 0 0-1-1h-6a1 1 0 1 0 0 2h2.17l-4.59 4.59a1 1 0 0 0 0 1.41z"></path>
        <path fill="currentColor" d="M5 7a2 2 0 0 1 2-2h2a1 1 0 1 0 0-2H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-2a1 1 0 1 0-2 0v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z"></path>
      </svg>
    `;

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = h.id;
      const url = `${location.origin}${location.pathname}${location.search}#${encodeURIComponent(id)}`;
      const ok = await copyText(url);
      toast(ok ? `已复制：#${id}` : "复制失败：请手动复制地址栏链接");
    });

    h.appendChild(btn);
  }

  function rebuildIndex() {
    if (!docRoot) return;
    const headings = Array.from(
      docRoot.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
    );

    headingById = new Map();
    headingByIdLower = new Map();
    headingIndex = headings.map((h) => {
      ensureHeadingAnchor(h);
      const id = h.id;
      const { kind, isKey } = kindFromId(id);
      const title = cleanHeadingTitle(id, h.textContent || "");
      headingById.set(id, h);
      headingByIdLower.set(String(id).toLowerCase(), id);
      return { id, kind, isKey, title, el: h };
    });
  }

  function scheduleRebuildIndex() {
    if (rebuildScheduled) return;
    rebuildScheduled = true;
    window.requestAnimationFrame(() => {
      rebuildScheduled = false;
      rebuildIndex();
    });
  }

  function ensureDocObserver() {
    if (docRoot) return;
    docRoot = document.getElementById("doc") || document.querySelector(".doc");
    if (!docRoot) return;

    rebuildIndex();

    const mo = new MutationObserver(() => scheduleRebuildIndex());
    mo.observe(docRoot, { childList: true, subtree: true });
  }

  function flashHeading(el) {
    if (!el) return;
    el.classList.remove("ui-flash");
    // Force reflow to restart animation.
    void el.offsetWidth;
    el.classList.add("ui-flash");
    window.clearTimeout(flashHeading._t);
    flashHeading._t = window.setTimeout(() => el.classList.remove("ui-flash"), 1600);
  }

  function jumpToId(id) {
    const target = headingById.get(id) || document.getElementById(id);
    if (!target) {
      toast(`未找到：#${id}`);
      return;
    }
    history.replaceState(null, "", `#${encodeURIComponent(id)}`);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    flashHeading(target);
  }

  function flashHashWithRetry(triesLeft) {
    const hash = decodeURIComponent(location.hash || "").replace(/^#/, "").trim();
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      flashHeading(el);
      return;
    }
    if (triesLeft <= 0) return;
    window.setTimeout(() => flashHashWithRetry(triesLeft - 1), 220);
  }

  let overlay = null;
  let overlayMode = null; // palette | settings
  let lastActive = null;
  let scrollLockPrev = null;
  let fab = null;
  let focusBtn = null;

  let navRoot = null;
  let navObserver = null;
  let navScrollScheduled = false;

  function setScrollLocked(locked) {
    const html = document.documentElement;
    const body = document.body;
    if (!html || !body) return;

    if (locked) {
      if (scrollLockPrev) return;
      scrollLockPrev = {
        htmlOverflow: html.style.overflow,
        bodyOverflow: body.style.overflow,
      };
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      return;
    }

    if (!scrollLockPrev) return;
    html.style.overflow = scrollLockPrev.htmlOverflow || "";
    body.style.overflow = scrollLockPrev.bodyOverflow || "";
    scrollLockPrev = null;
  }

  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.className = "ui-overlay";
    overlay.id = "uiPlusOverlay";
    overlay.dataset.open = "false";
    overlay.innerHTML = `
      <div class="ui-modal" role="dialog" aria-modal="true" aria-labelledby="uiPlusTitle">
        <div class="ui-modal__head">
          <div class="ui-modal__title">
            <h3 id="uiPlusTitle">跳转</h3>
            <div id="uiPlusHint" class="ui-modal__hint">Ctrl+K 打开 · Enter 跳转 · Esc 关闭</div>
          </div>
          <button id="uiPlusClose" type="button" class="btn btn--ghost">关闭</button>
        </div>
        <div id="uiPlusBody" class="ui-modal__body"></div>
        <div id="uiPlusFoot" class="ui-modal__foot"></div>
      </div>
    `;

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay();
    });

    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector("#uiPlusClose");
    closeBtn?.addEventListener("click", closeOverlay);

    return overlay;
  }

  function setOverlayOpen(open) {
    ensureOverlay();
    overlay.dataset.open = open ? "true" : "false";
    setScrollLocked(open);
    if (!open) {
      overlayMode = null;
      if (lastActive && typeof lastActive.focus === "function") {
        lastActive.focus();
      }
      lastActive = null;
    }
  }

  function closeOverlay() {
    setOverlayOpen(false);
  }

  function updateFabState() {
    if (!focusBtn) return;
    const on = !!settings.focus;
    focusBtn.setAttribute("aria-pressed", on ? "true" : "false");
    focusBtn.dataset.uiAccent = on ? "true" : "false";
    focusBtn.textContent = on ? "侧栏" : "专注";
    focusBtn.title = on ? "显示侧栏" : "隐藏侧栏";
  }

  function toggleFocus() {
    settings = { ...settings, focus: !settings.focus };
    saveSettings();
    applySettings();
    updateFabState();
    toast(settings.focus ? "专注模式：已隐藏侧栏" : "专注模式：已显示侧栏");
  }

  function ensureFab() {
    if (fab) return;
    fab = document.createElement("div");
    fab.className = "ui-fabbar";
    fab.innerHTML = `
      <button type="button" class="btn btn--ghost ui-fab-btn" data-ui-accent="true" id="uiFabJump" title="跳转（Ctrl+K）">跳转</button>
      <button type="button" class="btn btn--ghost ui-fab-btn" id="uiFabFocus" aria-pressed="false" title="隐藏侧栏">专注</button>
      <button type="button" class="btn btn--ghost ui-fab-btn" id="uiFabSettings" title="阅读设置">设置</button>
    `;

    document.body.appendChild(fab);

    const jumpBtn = fab.querySelector("#uiFabJump");
    focusBtn = fab.querySelector("#uiFabFocus");
    const settingsBtn = fab.querySelector("#uiFabSettings");

    jumpBtn?.addEventListener("click", () => openPalette());
    focusBtn?.addEventListener("click", () => toggleFocus());
    settingsBtn?.addEventListener("click", () => openSettings());

    updateFabState();
  }

  function renderPalette(body, foot) {
    rebuildIndex();

    body.innerHTML = `
      <input class="ui-palette__input" id="uiPaletteInput" type="search" placeholder="输入 S12 / W08 / 关键词…（支持小写）" autocomplete="off" />
      <div class="ui-palette__list" id="uiPaletteList"></div>
    `;

    foot.innerHTML = `
      <div class="muted">↑↓ 选择 · Enter 跳转 · Esc 关闭</div>
      <button type="button" class="btn btn--ghost" id="uiPaletteOpenSettings">设置</button>
    `;

    const input = body.querySelector("#uiPaletteInput");
    const list = body.querySelector("#uiPaletteList");
    const openSettingsBtn = foot.querySelector("#uiPaletteOpenSettings");

    openSettingsBtn?.addEventListener("click", () => openSettings());

    let visible = [];
    let selected = 0;

    const keyIdRe = /^[A-Z]\d{2}$/;

    function filterItems(qRaw) {
      const q = normalizeText(qRaw);
      if (!q) {
        // Default: key items + section headers (h2) for quick jump.
        return headingIndex.filter((it) => it.isKey || /^h2$/i.test(it.el.tagName));
      }

      const qUp = q.toUpperCase();
      return headingIndex.filter((it) => {
        const id = String(it.id || "");
        const title = String(it.title || "");
        return (
          normalizeText(id).includes(q) ||
          normalizeText(title).includes(q) ||
          (keyIdRe.test(id) && id === qUp)
        );
      });
    }

    function render() {
      visible = filterItems(input.value);
      if (selected >= visible.length) selected = 0;
      list.innerHTML = "";

      if (!visible.length) {
        const empty = document.createElement("div");
        empty.className = "muted";
        empty.style.padding = "10px 2px";
        empty.textContent = "未找到匹配项";
        list.appendChild(empty);
        return;
      }

      visible.forEach((it, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "ui-palette__item";
        btn.setAttribute("aria-selected", idx === selected ? "true" : "false");
        btn.dataset.idx = String(idx);
        btn.dataset.id = it.id;
        btn.innerHTML = `
          <div class="ui-palette__meta">
            <div class="ui-palette__id">${it.id}</div>
            <div class="ui-palette__kind">${it.kind}</div>
          </div>
          <div class="ui-palette__title">${escapeHtml(it.title || it.id)}</div>
        `;
        btn.addEventListener("click", () => {
          closeOverlay();
          window.setTimeout(() => jumpToId(it.id), 0);
        });
        list.appendChild(btn);
      });
    }

    function setSelected(next) {
      if (!visible.length) return;
      selected = Math.max(0, Math.min(visible.length - 1, next));
      const items = Array.from(list.querySelectorAll(".ui-palette__item"));
      items.forEach((el, idx) =>
        el.setAttribute("aria-selected", idx === selected ? "true" : "false")
      );
      items[selected]?.scrollIntoView({ block: "nearest" });
    }

    function move(delta) {
      if (!visible.length) return;
      const next = (selected + delta + visible.length) % visible.length;
      setSelected(next);
    }

    function lookupExactId(qRaw) {
      const q = String(qRaw || "").trim();
      if (!q) return null;
      const lower = q.toLowerCase();
      if (headingByIdLower.has(lower)) return headingByIdLower.get(lower);
      return null;
    }

    function choose() {
      const exact = lookupExactId(input.value);
      const chosen = exact || (visible[selected] ? visible[selected].id : null);
      if (!chosen) return;
      closeOverlay();
      window.setTimeout(() => jumpToId(chosen), 0);
    }

    input.addEventListener("input", () => {
      selected = 0;
      render();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        move(1);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        move(-1);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        choose();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        closeOverlay();
      }
    });

    render();
    input.focus();
    input.select();
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function choiceButton(setting, value, label, pressed) {
    return `
      <button type="button" class="ui-choice" data-setting="${setting}" data-value="${value}" aria-pressed="${pressed ? "true" : "false"}">${label}</button>
    `;
  }

  function renderSettings(body, foot) {
    body.innerHTML = `
      <div class="ui-settings" id="uiSettings">
        <div class="ui-settings__row">
          <div class="ui-settings__label">主题 Theme</div>
          <div class="ui-settings__choices">
            ${choiceButton("theme", "paper", "纸 · Paper", settings.theme === "paper")}
            ${choiceButton("theme", "ink", "墨 · Ink", settings.theme === "ink")}
          </div>
        </div>

        <div class="ui-settings__row">
          <div class="ui-settings__label">宽度 Width</div>
          <div class="ui-settings__choices">
            ${choiceButton("width", "narrow", "窄", settings.width === "narrow")}
            ${choiceButton("width", "comfort", "舒适", settings.width === "comfort")}
            ${choiceButton("width", "wide", "宽", settings.width === "wide")}
          </div>
        </div>

        <div class="ui-settings__row">
          <div class="ui-settings__label">字号 Font</div>
          <div class="ui-settings__choices">
            ${choiceButton("font", "sm", "小", settings.font === "sm")}
            ${choiceButton("font", "md", "中", settings.font === "md")}
            ${choiceButton("font", "lg", "大", settings.font === "lg")}
          </div>
        </div>

        <div class="ui-settings__row">
          <div class="ui-settings__label">专注 Focus</div>
          <div class="ui-settings__choices">
            ${choiceButton("focus", "off", "关", !settings.focus)}
            ${choiceButton("focus", "on", "开", !!settings.focus)}
          </div>
        </div>
      </div>
    `;

    foot.innerHTML = `
      <div class="muted">自动保存到本地浏览器（localStorage）</div>
      <div style="display:flex; gap:10px">
        <button type="button" class="btn btn--ghost" id="uiSettingsReset">重置</button>
        <button type="button" class="btn btn--ghost" id="uiSettingsClose">完成</button>
      </div>
    `;

    const settingsRoot = body.querySelector("#uiSettings");
    settingsRoot?.addEventListener("click", (e) => {
      const btn = e.target instanceof Element ? e.target.closest(".ui-choice") : null;
      if (!btn) return;
      const setting = btn.getAttribute("data-setting");
      const value = btn.getAttribute("data-value");
      if (!setting) return;

      if (setting === "focus") {
        settings = { ...settings, focus: value === "on" };
      } else if (setting in ALLOWED) {
        settings = {
          ...settings,
          [setting]: clampChoice(value, ALLOWED[setting], DEFAULTS[setting]),
        };
      } else {
        return;
      }

      saveSettings();
      applySettings();
      updateFabState();
      renderSettings(body, foot);
    });

    const resetBtn = foot.querySelector("#uiSettingsReset");
    const closeBtn = foot.querySelector("#uiSettingsClose");

    resetBtn?.addEventListener("click", () => {
      settings = { ...DEFAULTS };
      saveSettings();
      applySettings();
      updateFabState();
      renderSettings(body, foot);
      toast("已重置阅读设置");
    });

    closeBtn?.addEventListener("click", () => closeOverlay());
  }

  function openPalette() {
    ensureOverlay();
    lastActive = document.activeElement;
    overlayMode = "palette";
    setOverlayOpen(true);

    const title = overlay.querySelector("#uiPlusTitle");
    const hint = overlay.querySelector("#uiPlusHint");
    const body = overlay.querySelector("#uiPlusBody");
    const foot = overlay.querySelector("#uiPlusFoot");
    if (title) title.textContent = "跳转";
    if (hint) hint.textContent = "Ctrl+K 打开 · Enter 跳转 · Esc 关闭";
    renderPalette(body, foot);
  }

  function openSettings() {
    ensureOverlay();
    lastActive = document.activeElement;
    overlayMode = "settings";
    setOverlayOpen(true);

    const title = overlay.querySelector("#uiPlusTitle");
    const hint = overlay.querySelector("#uiPlusHint");
    const body = overlay.querySelector("#uiPlusBody");
    const foot = overlay.querySelector("#uiPlusFoot");
    if (title) title.textContent = "阅读设置";
    if (hint) hint.textContent = "主题 / 宽度 / 字号 / 专注";
    renderSettings(body, foot);
  }

  function scrollNavToActive() {
    if (!navRoot) return;
    const active = navRoot.querySelector('.nav-item[aria-current="true"]');
    if (!active) return;
    if (navRoot.scrollHeight <= navRoot.clientHeight) return;

    const navRect = navRoot.getBoundingClientRect();
    const itemRect = active.getBoundingClientRect();
    const pad = 10;
    const topEdge = navRect.top + pad;
    const bottomEdge = navRect.bottom - pad;

    if (itemRect.top < topEdge) {
      navRoot.scrollTop -= topEdge - itemRect.top;
      return;
    }

    if (itemRect.bottom > bottomEdge) {
      navRoot.scrollTop += itemRect.bottom - bottomEdge;
    }
  }

  function scheduleNavScroll() {
    if (navScrollScheduled) return;
    navScrollScheduled = true;
    window.requestAnimationFrame(() => {
      navScrollScheduled = false;
      scrollNavToActive();
    });
  }

  function ensureNavObserver() {
    if (navObserver) return;
    navRoot = document.getElementById("navList");
    if (!navRoot) return;

    navObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "aria-current") {
          scheduleNavScroll();
          return;
        }
        if (m.type === "childList") {
          scheduleNavScroll();
          return;
        }
      }
    });

    navObserver.observe(navRoot, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["aria-current"],
    });

    scheduleNavScroll();
  }

  document.addEventListener("keydown", (e) => {
    if (e.defaultPrevented) return;
    if (isEditableTarget(e.target)) return;

    const isOpen = overlay && overlay.dataset.open === "true";
    if (isOpen && e.key === "Escape") {
      e.preventDefault();
      closeOverlay();
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openPalette();
      return;
    }
  });

  window.addEventListener("hashchange", () => flashHashWithRetry(6));
  window.addEventListener("resize", () => scheduleNavScroll());

  function boot() {
    applySettings();
    ensureDocObserver();
    ensureNavObserver();
    ensureFab();
    flashHashWithRetry(6);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
