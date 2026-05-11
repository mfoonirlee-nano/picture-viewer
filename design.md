---
version: alpha
name: Atmospheric Picture Glass
description: A glassmorphism design system for a local image viewer with frosted controls, luminous depth, and image-first presentation.
colors:
  surface: "#0B1326"
  surface-dim: "#060E20"
  surface-container: "#171F33"
  on-surface: "#DAE2FD"
  on-surface-variant: "#C4C7C8"
  outline: "#8E9192"
  outline-variant: "#444748"
  primary: "#FFFFFF"
  on-primary: "#2F3131"
  primary-fixed-dim: "#C6C6C7"
  secondary: "#ADC9EB"
  on-secondary: "#14324E"
  secondary-container: "#304B68"
  error: "#FFB4AB"
  on-error: "#690005"
  background: "#0B1326"
  on-background: "#DAE2FD"
  progress: "#ADC9EB"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 84px
    fontWeight: 700
    lineHeight: 90px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 600
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 500
    lineHeight: 32px
    letterSpacing: 0
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: 0
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  toolbar-gap: 16px
  section-margin: 40px
  glass-padding: 20px
components:
  app-background:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-background}"
  empty-state:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    typography: "{typography.body-lg}"
  glass-toolbar:
    backgroundColor: "rgba(255, 255, 255, 0.10)"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.glass-padding}"
  glass-toolbar-elevated:
    backgroundColor: "rgba(255, 255, 255, 0.20)"
    textColor: "{colors.primary}"
    rounded: "{rounded.xl}"
    padding: "{spacing.glass-padding}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xl}"
    height: 48px
    padding: 0 24px
  button-primary-hover:
    backgroundColor: "{colors.primary-fixed-dim}"
    textColor: "{colors.on-primary}"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xl}"
    padding: 0 16px
  button-ghost-hover:
    backgroundColor: "rgba(255, 255, 255, 0.10)"
    textColor: "{colors.primary}"
  button-play:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xl}"
    height: 48px
    padding: 0 24px
  button-pause:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xl}"
    height: 48px
    padding: 0 24px
  input-field:
    backgroundColor: "rgba(255, 255, 255, 0.10)"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 20px
    height: 48px
  viewer-title:
    textColor: "{colors.primary}"
    typography: "{typography.headline-lg}"
  viewer-meta:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
  image-stage:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.container-padding}"
  image-frame:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.lg}"
  progress-track:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    rounded: "{rounded.full}"
    height: 4px
  progress-value:
    backgroundColor: "{colors.progress}"
    rounded: "{rounded.full}"
    height: 4px
  glass-divider:
    backgroundColor: "{colors.outline}"
    height: 1px
  empty-icon:
    textColor: "{colors.secondary-container}"
  disabled-control:
    backgroundColor: "{colors.outline-variant}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xl}"
---

## Brand & Style

This design system reimagines Picture Viewer as a high-fidelity glassmorphism workspace for browsing local image folders. The brand personality is calm, cinematic, and precise: a quiet viewing room where the image remains the subject and the controls feel like translucent instruments floating above a deep atmospheric canvas.

The UI relies on a vibrant-minimalist approach. The background provides depth through dark blue gradients and subtle luminosity, while navigation, playback, and timing controls become frosted glass layers. The intended response is focused and premium rather than decorative; the glass effect should support image inspection, not compete with it.

## Colors

The color strategy prioritizes luminosity, transparency, and image contrast. Because loaded images may contain any palette, interface chrome must stay cool, translucent, and predictable.

- **Primary Canvas:** Use a dark atmospheric base anchored by Navy Glass (#0B1326), with optional radial gradients in deep blue and muted violet behind the viewer.
- **Surface Alpha:** Component backgrounds are never visually heavy. Use `rgba(255, 255, 255, 0.10)` for standard glass controls and `0.20` only for elevated toolbar or modal states.
- **Accents:** Primary actions use solid white for maximum clarity. Playback uses cool blue for play and soft red for pause, preserving semantic state without breaking the glass environment.
- **Text:** Use white (#FFFFFF) and high-tint silver (#DAE2FD / #C4C7C8) so labels remain readable across blurred, luminous surfaces.

## Typography

The design system utilizes Inter for neutral geometric clarity. Its clean shapes balance the organic blur and gradient depth of the atmospheric background.

- **Hierarchy:** Large headline styles are reserved for the empty state or folder-level title. The active viewer should use compact labels so the image remains dominant.
- **Legibility:** On frosted glass, label weights are increased and letter spacing is slightly expanded to counteract blur and transparency.
- **Treatment:** Subtle text shadows such as `0 2px 4px rgba(0, 0, 0, 0.15)` may be applied to small labels over bright image areas or glass panels.

## Layout & Spacing

The layout follows a fluid, contextual model. Elements are grouped into glass containers that float within the safe areas of the viewport.

- **Rhythm:** An 8px base grid governs spacing, control height, and toolbar grouping.
- **Viewer Priority:** The image stage occupies the main viewport and must preserve `object-contain` behavior by default.
- **Control Grouping:** Directory selection, interval editing, previous/next navigation, play state, and item count should stay grouped in a compact glass toolbar with 16px gaps.
- **Negative Space:** Maintain at least 24px outer spacing where possible so the atmospheric background remains visible around glass surfaces.

## Elevation & Depth

Depth is created through light, refraction, and blur instead of heavy shadows.

- **Level 1 Base:** A dark blue atmospheric gradient with optional subtle grain or vignette.
- **Level 2 Standard Glass:** `backdrop-filter: blur(20px)`, `background: rgba(255, 255, 255, 0.10)`.
- **Level 3 Elevated Glass:** `backdrop-filter: blur(40px)`, `background: rgba(255, 255, 255, 0.20)`.
- **Edge Definition:** Every glass surface should include a 1px border using `rgba(255, 255, 255, 0.22)` to simulate refracted light.
- **Shadows:** Use soft shadows such as `0 8px 32px rgba(0, 0, 0, 0.16)` to separate layers without making the interface feel dense.

## Shapes

The shape language is soft and tactile. Rounded controls help the toolbar feel like a floating object rather than a rigid application frame.

- **Glass Containers:** Use `1rem` radius for standard panels and `1.5rem` for elevated panels.
- **Action Elements:** Buttons and numeric inputs use `rounded-xl` to match the atmospheric glass style.
- **Media:** The displayed image may use a smaller radius than controls so screenshots, photos, and artwork do not feel artificially softened.

## Components

### Glass Containers

Toolbars and empty-state panels use the standard glass treatment: 20px blur, low white alpha, a fine white border, and soft shadow. Elevated surfaces such as focused dialogs can increase blur and opacity, but should still feel translucent.

### Action Elements

Primary directory selection uses a solid white pill button for high contrast. Secondary navigation uses ghost glass buttons. Play and pause use semantic color fills with the same rounded shape and compact label typography.

### Inputs & Interaction

The interval input uses a translucent field with white text, centered numeric alignment, and a fixed width. Hover states should brighten glass opacity rather than switching to solid blocks.

### Image Presentation

The image stage must stay visually quiet. Preserve the image's original color and aspect ratio, avoid default cropping, and keep decorative glass effects outside the image itself unless a separate editing mode is introduced.
