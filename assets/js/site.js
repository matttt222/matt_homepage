(() => {
  "use strict";

  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");

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
      if (event.key === "Escape") closeNavigation();
    });
  }

  const createTextBlock = (label, text, className = "sample-copy") => {
    const block = document.createElement("div");
    block.className = className;
    const heading = document.createElement("strong");
    heading.textContent = label;
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    block.append(heading, paragraph);
    return block;
  };

  const appendHighlightedDifference = (container, text, comparison) => {
    let prefixLength = 0;
    const maxPrefix = Math.min(text.length, comparison.length);
    while (prefixLength < maxPrefix && text[prefixLength] === comparison[prefixLength]) {
      prefixLength += 1;
    }

    let suffixLength = 0;
    const maxSuffix = Math.min(text.length - prefixLength, comparison.length - prefixLength);
    while (
      suffixLength < maxSuffix
      && text[text.length - 1 - suffixLength] === comparison[comparison.length - 1 - suffixLength]
    ) {
      suffixLength += 1;
    }

    const before = text.slice(0, prefixLength);
    const changed = text.slice(prefixLength, text.length - suffixLength || undefined);
    const after = suffixLength ? text.slice(text.length - suffixLength) : "";
    container.append(document.createTextNode(before));
    if (changed) {
      const mark = document.createElement("mark");
      mark.textContent = changed;
      container.append(mark);
    }
    container.append(document.createTextNode(after));
  };

  const createComparisonBlock = (sample) => {
    const comparison = document.createElement("div");
    comparison.className = "text-comparison";

    [
      ["原始文本", sample.sourceText, sample.targetText],
      ["目标文本", sample.targetText, sample.sourceText],
    ].forEach(([label, text, otherText]) => {
      const block = document.createElement("div");
      const heading = document.createElement("strong");
      heading.textContent = label;
      const paragraph = document.createElement("p");
      appendHighlightedDifference(paragraph, text, otherText);
      block.append(heading, paragraph);
      comparison.append(block);
    });
    return comparison;
  };

  const createTrack = (sample, track) => {
    const block = document.createElement("div");
    block.className = "sample-track";
    const label = document.createElement("strong");
    label.textContent = track.label;
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "none";
    audio.src = document.body.dataset.page === "home"
      ? track.src.replace(/^\.\.\//, "")
      : track.src;
    audio.setAttribute("aria-label", `${sample.title}：${track.label}`);
    block.append(label, audio);
    return block;
  };

  const createSample = (sample) => {
    const card = document.createElement("article");
    card.className = "sample-card";

    const heading = document.createElement("div");
    heading.className = "sample-card-head";
    const title = document.createElement("h4");
    title.textContent = sample.title;
    const mode = document.createElement("span");
    mode.className = "status-chip";
    mode.textContent = sample.mode;
    heading.append(title, mode);
    card.append(heading);

    if (sample.lyrics) card.append(createTextBlock("完整生成歌词", sample.lyrics));
    if (sample.instruction) card.append(createTextBlock("指令", sample.instruction, "sample-copy instruction-copy"));
    if (sample.sourceText && sample.targetText) card.append(createComparisonBlock(sample));

    const tracks = document.createElement("div");
    tracks.className = "sample-tracks";
    sample.tracks.forEach((track) => tracks.append(createTrack(sample, track)));
    card.append(tracks);
    return card;
  };

  document.querySelectorAll("[data-audio-project]").forEach((container) => {
    const project = window.PORTFOLIO_PROJECTS?.[container.dataset.audioProject];
    if (!project) return;
    project.samples.forEach((sampleData) => container.append(createSample(sampleData)));
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

  const dialog = document.querySelector("[data-figure-dialog]");
  const figureDialogImage = document.querySelector("[data-figure-dialog-image]");
  if (dialog && figureDialogImage) {
    document.querySelectorAll("[data-figure-open]").forEach((button) => {
      button.addEventListener("click", () => {
        figureDialogImage.src = button.dataset.figureSrc;
        figureDialogImage.alt = button.dataset.figureAlt;
        dialog.showModal();
      });
    });

    document.querySelector("[data-figure-close]")?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
})();
