---
version: alpha
name: X
description: A stark black-and-white identity system for X, with compact Chirp-based product UI patterns and strict rules for logos and posts.
generated: 2026-06-18
sources:
  - https://x.com/home
  - https://x.com/
  - https://about.x.com/en/who-we-are/brand-toolkit
  - https://about.x.com/content/dam/about-twitter/x/brand-toolkit/x-brand-guidelines.pdf
  - https://docs.x.com/developer-terms/display-requirements
notes:
  - https://x.com/home redirects to the login flow without an authenticated session; this file uses accessible public X pages and official brand/developer guidance.
  - The official external partner guide identifies black and white as the primary brand colors; product UI still uses blue and status colors for interactive utility.
  - The brand guide specifies Helvetica Neue for external brand materials, while the current X web app and About site preload and declare Chirp/TwitterChirp web fonts.
  - Secondary brand colors are not treated as core brand colors because the official guide says they were still being developed.
colors:
  x-black: "#000000"
  x-white: "#FFFFFF"
  text-primary-light: "#0F1419"
  text-secondary-light: "#536471"
  text-primary-dark: "#E7E9EA"
  surface-light: "#FFFFFF"
  surface-subtle: "#F7F9F9"
  border-light: "#CFD9DE"
  border-faint: "#EFF3F4"
  action-blue: "#1D9BF0"
  action-blue-hover: "#1A8CD8"
  success: "#00BA7C"
  danger: "#F4212E"
  warning: "#FFD400"
typography:
  brand-display:
    fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: 0
  brand-subheadline:
    fontFamily: "\"Helvetica Neue\", Helvetica, Arial, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0
  product-display:
    fontFamily: "\"TwitterChirpExtendedHeavy\", TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: 0
  product-title:
    fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: 23px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0
  body:
    fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0
  body-large:
    fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0
  label:
    fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  meta:
    fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: 0
rounded:
  none: 0
  sm: 4px
  md: 8px
  lg: 16px
  pill: 9999px
spacing:
  unit: 4px
  baseline: 8px
  control-gap: 12px
  page-gutter: 20px
  section-gap: 48px
  timeline-width: 600px
  sidebar-width: 275px
  rail-width: 350px
components:
  brand-button-primary:
    backgroundColor: "{colors.x-black}"
    textColor: "{colors.x-white}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
    minHeight: 44px
    padding: "0 24px"
  brand-button-inverse:
    backgroundColor: "{colors.x-white}"
    textColor: "{colors.x-black}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
    minHeight: 44px
    padding: "0 24px"
  product-action-button:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.x-white}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
    minHeight: 36px
    padding: "0 16px"
  ghost-button:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary-light}"
    borderColor: "{colors.border-light}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
    minHeight: 36px
    padding: "0 16px"
  post-cell:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.text-primary-light}"
    borderColor: "{colors.border-faint}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  post-embed:
    backgroundColor: "{colors.x-black}"
    textColor: "{colors.text-primary-dark}"
    borderColor: "#2F3336"
    rounded: "{rounded.lg}"
    padding: "16px"
  input-search:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-primary-light}"
    placeholderColor: "{colors.text-secondary-light}"
    rounded: "{rounded.pill}"
    height: 44px
    padding: "0 16px"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary-light}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-large}"
    padding: "12px"
  divider:
    backgroundColor: "{colors.border-faint}"
    height: 1px
  logo-mark:
    fill: "{colors.x-black}"
    alternateFill: "{colors.x-white}"
    preserveAspectRatio: true
---

## Overview

X is visually direct: a monochrome brand anchored by a sharp X mark, large clear typography, and a product interface that prioritizes dense real-time content. The brand system should feel restrained and high contrast, not decorative. In external brand materials, black and white carry the identity. In product UI, blue and status colors are utility accents, not replacement brand colors.

Use this system for X-branded app surfaces, product pages, embedded post treatments, and brand-adjacent UI. When making editorial or marketing material, default to the stricter black-and-white guidance before adding product UI colors.

## Evidence Map

Direct evidence:

- `x.com/home` redirects to login, so authenticated home content was not extracted.
- Public `x.com` preloads Chirp Regular, Medium, and Bold font files and sets light and dark theme colors to white and black.
- Public X web CSS includes product neutrals such as `#0F1419`, `#536471`, `#E7E9EA`, `#EFF3F4`, and action blue `#1D9BF0`.
- The official brand toolkit page exposes logo downloads, handle lockups, partnership lockups, post layout assets, and a brand guidelines PDF.
- The About site preloads the Chirp family and declares `TwitterChirp` font faces in CSS.

Official guidance:

- The external partner guide defines black and white as the primary brand colors.
- The guide specifies black or white logo treatments and requires the mark to stay legible and intact.
- External partner typography is specified as Helvetica Neue Bold for headlines and Helvetica Neue Normal for body copy.
- Existing Chirp usage is allowed until a revised custom toolkit is available.
- Posts used in communications should be real and unmodified; dark-mode post treatments are preferred, with light mode available when context requires it.

Inference:

- For product UI, use `TwitterChirp` when available because the current app shell and public X pages load it.
- Treat `#1D9BF0` as an app interaction color for links, post actions, focus, and primary in-product CTAs, not as the X brand primary.
- Use minimal surfaces, timeline dividers, and pill controls to match X product behavior rather than card-heavy marketing layouts.

## Colors

The brand core is binary. Use `x-black` and `x-white` for logos, high-level brand sections, launch screens, and external brand moments. Avoid tinting the X mark, placing it in gradients, or using blue as a brand replacement.

Product UI may use the observed X app palette:

- `text-primary-light` for main text on white.
- `text-secondary-light` for handles, timestamps, counts, and secondary metadata.
- `surface-subtle` for search fields, side panels, and quiet grouped controls.
- `border-faint` and `border-light` for timeline separators and low-emphasis outlines.
- `action-blue` for links, follow/post actions, focus states, and active interactive affordances.
- `success`, `danger`, and `warning` only for semantic states, analytics, alerts, or badges.

Dark mode should start from true black, not charcoal. Use `x-black` as the page canvas, `text-primary-dark` for primary copy, and dimmer grays for metadata. Preserve strong contrast around posts, controls, and the X mark.

## Typography

Use two typography tracks:

- Brand and external partner materials: Helvetica Neue, falling back to Helvetica and Arial.
- Product UI: TwitterChirp where available, falling back to system UI sans-serif.

Brand headlines should be large, bold, direct, and short. Do not use expressive letter spacing, decorative type effects, or italic headline treatments unless reproducing a specific approved asset.

Product UI type is compact. Use 15px body text for post content and navigation-adjacent labels, 13px for metadata, and 20-23px for page titles or prominent counters. Keep line length controlled in timelines and avoid oversized headings inside toolbars or dense app surfaces.

## Layout

X layouts are content-first and utilitarian:

- Use a central timeline column around `600px` for post streams.
- Use left navigation and right rail patterns for desktop product pages when useful.
- Use a 4px spacing unit with 8px as the baseline rhythm.
- Prefer dividers and whitespace to framed cards for timeline content.
- Keep controls close to the content they affect; avoid ornamental section wrappers.
- On mobile, collapse to one primary column, keep the composer/action button accessible, and preserve readable touch targets.

For brand pages or full-screen entry states, use strong black/white composition with the X mark as a primary viewport signal. Keep a hint of the next section visible when building landing-style pages.

## Components

### Buttons

Use pill buttons. Brand buttons are black on white or white on black. Product action buttons may use `action-blue` for actions such as posting, following, accepting, or linking. Secondary buttons should be outlined or transparent with a subtle hover state.

Avoid rectangular CTA blocks, gradient buttons, and multi-color button systems. Button copy should be short and operational.

### Navigation

Navigation should feel like the X app: icon-led, text labels where space allows, large hit areas, and pill hover states. Active states can use heavier type, a filled icon, or a subtle background, but should not become decorative tabs.

### Posts

Posts are a primary brand object. Display real posts from real accounts and keep the author name, handle, avatar, timestamp, text, and action affordances intact when showing X content. Use embedded posts or official display rules whenever possible.

External post layouts should include the X logo in the upper-right area or attached to the timeline context. For isolated post compositions, dark mode is preferred unless the surrounding palette makes a light post clearer.

### Cards And Panels

Avoid generic marketing cards for core X surfaces. A timeline post is a cell, not a floating card. Use cards only for modals, embedded post frames, account summaries, analytics panels, or repeated items that need containment.

When a panel is needed, use a simple 1px border, restrained radius, and clear hierarchy. Do not nest cards.

### Inputs

Search and compact inputs use pill geometry and muted neutral backgrounds. Forms should be sparse, with direct labels, clear focus rings, and minimal helper text.

### Links

Use `action-blue` for product links and post entities such as mentions, hashtags, and URLs. In pure brand compositions, black/white links or underlines are preferred.

### Modals

Use centered panels with `16px` radius, white or black surfaces, and clear action rows. Keep modal copy concise and action-oriented.

## Imagery

Use official assets from the brand toolkit for the X logo and lockups. Do not redraw the mark, recolor it, add effects, or use the retired Twitter bird for current X branding.

For product storytelling, prefer real interface captures, real posts with permission, or official post embed/rendering tools. Do not fabricate fake posts for examples. If placeholder content is necessary in an internal prototype, label it as placeholder and do not present it as X content.

Avoid stock photography, generic social-media illustrations, decorative gradients, and atmospheric backdrops that make the brand feel softer than the official monochrome system.

## Logo And Usage

Use the official X mark in black or white. The mark must remain legible, unmodified, and proportionally intact. Place white on black or black on white by default. For non-digital or mixed-color settings, choose the version that provides the strongest contrast.

Maintain clear space around the logo on all sides. Do not crop, stretch, outline, shadow, animate, pattern-fill, or place the logo inside a shape that changes its silhouette. Do not pair it with unauthorized marks or imply sponsorship without permission.

Use official handle and partnership lockups when representing an account or partnership with X. Match lockup proportions rather than composing ad hoc combinations.

## Terminology

Use current X terminology:

- X, not Twitter.
- X app, not Twitter app.
- X account, not Twitter account.
- Post, not Tweet.
- Repost, not Retweet.
- Quote, not Quote Tweet.
- X Premium, not Twitter Blue.
- X Pro, not TweetDeck.

Use "author", "creator", "user", "subscriber", or "account" depending on context.

## Accessibility

Maintain high contrast. The brand palette makes this straightforward when black and white are used correctly. Product UI should preserve readable contrast for secondary text, borders, focus rings, and disabled states.

Post display must retain attribution and interaction affordances. Links inside post text should remain identifiable. Touch targets should be at least 36px high in compact UI and 44px where primary action matters.

## Do's And Don'ts

Do:

- Use black and white as the brand foundation.
- Use official X logo files and lockups.
- Use Helvetica Neue for external brand materials and TwitterChirp for product UI when available.
- Use blue only for product interactions and links.
- Display real, unmodified posts with correct attribution.
- Prefer dark-mode post treatments in external brand compositions.
- Keep layouts dense, direct, and content-first.

Don't:

- Do not recolor, distort, outline, or decorate the X logo.
- Do not use the retired Twitter bird as current X branding.
- Do not treat blue as the primary X brand color.
- Do not create fake posts or edit post text.
- Do not place third-party social actions on displayed X posts.
- Do not imply endorsement, partnership, or sponsorship without explicit permission.
- Do not use card-heavy, gradient-heavy, or illustrative layouts for product surfaces.
