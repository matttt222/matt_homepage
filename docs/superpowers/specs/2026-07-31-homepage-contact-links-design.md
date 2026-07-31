# Homepage Contact Links Design

## Goal

Remove the visible personal GitHub link from the homepage About section while keeping the complete publications-and-patents entry and the email address `matttt2229@gmail.com`.

## Scope

The About section's `.plain-links` group will contain exactly these two active links:

1. `全部论文与专利` linking to `publications.html`.
2. `matttt2229@gmail.com` linking to `mailto:matttt2229@gmail.com`.

The current `GitHub` anchor linking to `https://github.com/matttt222` will be removed.

## Non-goals

- Do not change the homepage research sections, Demo data, audio assets, publication summary, or contact section.
- Do not change any paper, technical-report, patent, honor, or arXiv entry.
- Do not remove the unused project `repositoryUrl` data field.
- Do not change the README's GitHub Pages deployment instructions.
- Do not delete any files.

## Files and behavior

- `index.html`: remove only the personal GitHub anchor from the About link group.
- `scripts/check_homepage_layout.js`: assert that the homepage no longer contains the personal GitHub URL, while continuing to require the publications link and email mailto link.

No CSS or JavaScript behavior changes are needed because the existing link group already supports two items.

## Verification

Implementation will follow a RED-GREEN cycle:

1. Add the new assertions and confirm the current homepage fails because the GitHub URL is still present.
2. Remove the GitHub anchor and confirm the focused regression check passes.
3. Run the homepage layout check, S2M mapping check, structural site check, JavaScript syntax checks, and `git diff --check`.

## Success criteria

- The homepage exposes no link to `https://github.com/matttt222`.
- The About section still links to `publications.html`.
- The About section still displays and links `matttt2229@gmail.com`.
- All publication, patent, Demo, and contact content remains unchanged.
