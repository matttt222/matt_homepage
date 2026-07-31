(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");

  const updateHeader = () => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }
  };

  const closeNavigation = () => {
    if (!navToggle || !navigation) return;
    navToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  if (navToggle && navigation) {
    navToggle.addEventListener("click", () => {
      const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(willOpen));
      navigation.classList.toggle("is-open", willOpen);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNavigation();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNavigation();
        navToggle.focus();
      }
    });
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const createExternalButton = (url, label) => {
    const link = document.createElement("a");
    link.className = "button button-primary";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${label} ↗`;
    return link;
  };

  const renderEmptyState = (container, project) => {
    const panel = document.createElement("article");
    panel.className = "sample-empty";

    const title = document.createElement("h3");
    title.textContent = project.demoUrl ? "完整音频已在公开页面上线" : "音频展示结构已就绪";
    panel.append(title);

    const message = document.createElement("p");
    message.textContent = project.unavailableMessage;
    panel.append(message);

    if (project.demoUrl) {
      panel.append(createExternalButton(project.demoUrl, "打开完整 Demo"));
    }
    container.append(panel);
  };

  const renderSample = (container, sample) => {
    const card = document.createElement("article");
    card.className = "sample-card";

    const heading = document.createElement("div");
    heading.className = "sample-card-head";
    const title = document.createElement("h3");
    title.textContent = sample.title;
    heading.append(title);
    if (sample.mode) {
      const mode = document.createElement("span");
      mode.className = "status-chip";
      mode.textContent = sample.mode;
      heading.append(mode);
    }
    card.append(heading);

    if (sample.description) {
      const description = document.createElement("p");
      description.textContent = sample.description;
      card.append(description);
    }

    sample.tracks
      .filter((track) => Boolean(track.src))
      .forEach((track) => {
        const trackBlock = document.createElement("div");
        trackBlock.className = "sample-track";
        const label = document.createElement("strong");
        label.textContent = track.label;
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.preload = "none";
        audio.src = track.src;
        audio.setAttribute("aria-label", `${sample.title}：${track.label}`);
        trackBlock.append(label, audio);
        card.append(trackBlock);
      });
    container.append(card);
  };

  document.querySelectorAll("[data-audio-project]").forEach((container) => {
    const key = container.dataset.audioProject;
    const project = window.PORTFOLIO_PROJECTS?.[key];
    if (!project) return;
    if (!project.samples.length) {
      renderEmptyState(container, project);
      return;
    }
    project.samples.forEach((sample) => renderSample(container, sample));
  });

  document.addEventListener(
    "play",
    (event) => {
      if (!(event.target instanceof HTMLAudioElement)) return;
      document.querySelectorAll("audio").forEach((audio) => {
        if (audio !== event.target) audio.pause();
      });
    },
    true,
  );
})();
