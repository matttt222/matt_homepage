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
    "projects/s2m-inject.html",
    "projects/amend.html",
    "assets/css/styles.css",
    "assets/js/site.js",
    "assets/data/projects.js",
    "assets/img/mark.svg",
    "README.md",
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

    for relative in ("index.html", "publications.html", "projects/s2m-inject.html", "projects/amend.html"):
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
