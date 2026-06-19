---
version: alpha
name: Geist
description: Vercel's Geist light theme adapted for a local image-viewing application.
generated: 2026-06-19
sources:
  - https://vercel.com/design.md
notes:
  - This file is an implementation-oriented adaptation of Vercel's public Geist design.md for this repo.
  - The app uses the light theme and falls back to system sans/mono fonts when Geist web fonts are unavailable.
  - The source system uses tight tracking on large headings; this implementation keeps letter spacing at 0 to match the app's frontend constraints.
colors:
  primary: "#171717"
  secondary: "#4d4d4d"
  tertiary: "#006bff"
  background-100: "#ffffff"
  background-200: "#fafafa"
  gray-100: "#f2f2f2"
  gray-200: "#ebebeb"
  gray-300: "#e6e6e6"
  gray-400: "#eaeaea"
  gray-500: "#c9c9c9"
  gray-700: "#8f8f8f"
  gray-900: "#4d4d4d"
  gray-1000: "#171717"
  blue-100: "#f0f7ff"
  blue-700: "#006bff"
  blue-800: "#0059ec"
  red-100: "#ffeeef"
  red-800: "#ea001d"
  green-700: "#28a948"
typography:
  heading-24:
    fontFamily: Geist Sans
    fontSize: 24px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: 0
  heading-20:
    fontFamily: Geist Sans
    fontSize: 20px
    fontWeight: 600
    lineHeight: 26px
    letterSpacing: 0
  heading-16:
    fontFamily: Geist Sans
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0
  button-14:
    fontFamily: Geist Sans
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0
  label-14:
    fontFamily: Geist Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0
  label-13:
    fontFamily: Geist Sans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0
  label-12-mono:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  6: 24px
  8: 32px
  10: 40px
  16: 64px
  24: 96px
rounded:
  sm: 6px
  md: 12px
  lg: 16px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background-100}"
    typography: "{typography.button-14}"
    rounded: "{rounded.sm}"
    height: 40px
    padding: "0 12px"
  button-secondary:
    backgroundColor: "{colors.background-100}"
    textColor: "{colors.primary}"
    borderColor: "{colors.gray-400}"
    typography: "{typography.button-14}"
    rounded: "{rounded.sm}"
    height: 40px
    padding: "0 12px"
  button-accent:
    backgroundColor: "{colors.blue-700}"
    textColor: "#ffffff"
    typography: "{typography.button-14}"
    rounded: "{rounded.sm}"
    height: 40px
    padding: "0 12px"
  panel:
    backgroundColor: "{colors.background-100}"
    borderColor: "{colors.gray-400}"
    rounded: "{rounded.sm}"
    shadow: "0 2px 2px rgba(0, 0, 0, 0.04)"
    padding: 16px
  input:
    backgroundColor: "{colors.background-100}"
    textColor: "{colors.primary}"
    borderColor: "{colors.gray-400}"
    typography: "{typography.label-14}"
    rounded: "{rounded.sm}"
    height: 40px
    padding: "0 12px"
---

## Overview

Use Geist as a compact, image-first tool system: crisp 6px controls, restrained metadata, subtle translucent overlays, and a large uninterrupted preview stage. The loaded state should feel like a focused local viewer rather than a dashboard.

## Colors

Use `primary` as the dark image canvas and primary button fill. Use `background-100` for translucent overlays and empty-state surfaces, `background-200` for the unloaded app canvas, and `gray-400` for default overlay borders. Reserve `blue-700` for progress and focus. Use `red-800` only for errors and `green-700` only for positive running states.

## Typography

Set UI and prose in Geist Sans with system fallbacks. Use Geist Mono for file names, breadcrumbs, counters, and small technical labels. Keep headings modest inside the app: 24px for page titles, 20px for panel headings, and 14px for most labels and controls.

## Layout

The loaded view is a single full-viewport image stage. Place file position/name in a small top overlay, playback controls in a compact bottom overlay, and progress as a 3px bottom edge. Avoid permanent sidebars, inspector rails, or secondary cards while images are loaded. The empty state may use one centered panel with a directory action.

## Components

Buttons are 36-40px high, 6px radius, medium-weight labels, and should include icons for concrete actions. Primary and playback buttons use black with white labels. Secondary controls use translucent white with gray borders. Disabled controls use `gray-100` fill and `gray-700` text instead of opacity-only treatment.

Floating overlays use translucent white, `gray-400` border, 6px or 12px radius, and blur. Inputs use the same surface and radius as buttons. Focus must show a two-layer ring: white inner gap plus `blue-700` outer ring.

## Imagery

Images are the main artifact, so the preview stage should be large, stable, and unframed by decorative cards. Use a neutral checkerboard background to reveal transparent PNG/SVG edges. Preserve image aspect ratio with `object-fit: contain`.

## Do's And Don'ts

Do let the image consume the viewport, keep metadata terse, and keep controls compact and predictable. Don't use sidebars, dense info cards, gradient backgrounds, oversized hero type, pill-shaped dashboard buttons, or decorative color fields. Don't make the Vercel triangle the main content; use it only as a small brand cue in the empty state.
