#!/usr/bin/env python3
"""Dependency-free structural checks for the static portfolio site."""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = (
    "index.html",
    "publications.html",
    "assets/css/styles.css",
    "assets/js/site.js",
    "assets/data/projects.js",
    "assets/img/mark.svg",
    "scripts/check_s2m_samples.js",
    "scripts/check_homepage_layout.js",
    "README.md",
)

RESEARCH_ASSETS = (
    "assets/img/papers/s2m-method.png",
    "assets/img/papers/s2m-results.png",
    "assets/img/papers/s2m-ablation.png",
    "assets/img/papers/amend-method.png",
    "assets/img/papers/amend-results.png",
    "assets/audio/s2m/en-hiphop-quan-reference.wav",
    "assets/audio/s2m/en-hiphop-quan-generated.wav",
    "assets/audio/s2m/en-pop-broken-lover-reference.wav",
    "assets/audio/s2m/en-pop-broken-lover-generated.wav",
    "assets/audio/s2m/zh-hiphop-reference.wav",
    "assets/audio/s2m/zh-hiphop-generated.wav",
    "assets/audio/s2m/zh-pop-eternal-reference.wav",
    "assets/audio/s2m/zh-pop-eternal-generated.wav",
    "assets/audio/s2m/zh-pop-heartbreak-reference.wav",
    "assets/audio/s2m/zh-pop-heartbreak-generated.wav",
    "assets/audio/amend/replacement-en-reference.wav",
    "assets/audio/amend/replacement-en-amend.wav",
    "assets/audio/amend/insertion-zh-reference.wav",
    "assets/audio/amend/insertion-zh-amend.wav",
    "assets/audio/amend/deletion-zh-reference.wav",
    "assets/audio/amend/deletion-zh-amend.wav",
    "assets/audio/amend/full-replacement-en-reference.wav",
    "assets/audio/amend/full-replacement-en-amend.wav",
    "assets/audio/amend/full-replacement-zh-reference.wav",
    "assets/audio/amend/full-replacement-zh-amend.wav",
)

REQUIRED_HOME_TOKENS = (
    'id="about"',
    'id="s2m"',
    'id="amend"',
    'id="publications"',
    'id="contact"',
    'data-audio-project="s2m"',
    'data-audio-project="amend"',
    'data-figure-open',
    'data-figure-dialog',
    'data-figure-close',
)

FORBIDDEN_HOME_PHRASES = (
    "研究不只停在论文",
    "从研究问题到可用能力",
    "让结果自己说话",
)

REQUIRED_SCRIPT_TOKENS = (
    "dialog.showModal()",
    "audio.pause()",
    "figureDialogImage.alt",
)


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.h1_count = 0
        self.references: list[tuple[str, str, dict[str, str]]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = {key: value or "" for key, value in attrs}
        if tag == "h1":
            self.h1_count += 1
        for attribute in ("href", "src"):
            if attribute in attributes:
                self.references.append((tag, attributes[attribute], attributes))


def is_external(reference: str) -> bool:
    return urlparse(reference).scheme in {"http", "https", "mailto"}


def resolve_local(page: Path, reference: str) -> Path | None:
    clean = reference.split("#", 1)[0].split("?", 1)[0]
    if not clean or clean.startswith(("data:", "javascript:")):
        return None
    if clean.startswith("/"):
        return ROOT / clean.lstrip("/")
    return (page.parent / clean).resolve()


def check_page(page: Path) -> list[str]:
    errors: list[str] = []
    parser = PageParser()
    parser.feed(page.read_text(encoding="utf-8"))

    if parser.h1_count != 1:
        errors.append(f"{page.relative_to(ROOT)}: expected 1 h1, found {parser.h1_count}")

    for tag, reference, attributes in parser.references:
        if reference == "#":
            errors.append(f'{page.relative_to(ROOT)}: empty {tag} reference href="#"')
            continue

        if is_external(reference):
            if attributes.get("target") == "_blank":
                rel = set(attributes.get("rel", "").split())
                if not {"noopener", "noreferrer"}.issubset(rel):
                    errors.append(
                        f"{page.relative_to(ROOT)}: external _blank link lacks noopener noreferrer: {reference}"
                    )
            continue

        target = resolve_local(page, reference)
        if target is not None and not target.exists():
            errors.append(
                f"{page.relative_to(ROOT)}: missing local target {reference}"
            )

    return errors


def main() -> int:
    errors: list[str] = []
    for relative in REQUIRED_FILES:
        path = ROOT / relative
        if not path.exists():
            errors.append(f"Missing required file: {relative}")

    for relative in RESEARCH_ASSETS:
        if not (ROOT / relative).exists():
            errors.append(f"Missing research asset: {relative}")

    homepage = ROOT / "index.html"
    if homepage.exists():
        homepage_text = homepage.read_text(encoding="utf-8")
        for token in REQUIRED_HOME_TOKENS:
            if token not in homepage_text:
                errors.append(f"index.html: missing required research hook {token}")
        for phrase in FORBIDDEN_HOME_PHRASES:
            if phrase in homepage_text:
                errors.append(f"index.html: promotional phrase remains: {phrase}")

    site_script = ROOT / "assets/js/site.js"
    if site_script.exists():
        script_text = site_script.read_text(encoding="utf-8")
        for token in REQUIRED_SCRIPT_TOKENS:
            if token not in script_text:
                errors.append(f"assets/js/site.js: missing interaction behavior {token}")

    for relative in ("index.html", "publications.html"):
        page = ROOT / relative
        if page.exists():
            errors.extend(check_page(page))

    if errors:
        print("Site checks failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("All site checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
