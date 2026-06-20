# Picture Viewer

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-149eca.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff.svg)](https://vite.dev/)

Picture Viewer is a privacy-first local image viewer and slideshow web app for browsing image folders directly in the browser. It uses the File System Access API, so photos stay on your device and are never uploaded to a server.

本项目是一个本地优先的图片浏览器，用于在浏览器中递归浏览本地图片目录、全屏查看图片并播放幻灯片。图片只在本机读取，不上传到任何服务器。

## Why Use It

- Browse local photo folders without importing, uploading, or creating an account.
- Recursively scan subfolders for common image formats.
- Run a private offline slideshow from a local directory.
- View images full screen with `object-fit: contain`, so images are not cropped or distorted.
- Use a responsive React interface that works well on desktop, tablet, and narrow screens.

## Features

- Local folder picker powered by the browser File System Access API.
- Recursive image discovery for `jpg`, `jpeg`, `png`, `gif`, `bmp`, `webp`, and `svg`.
- Natural filename sorting, including numeric filename segments.
- Manual previous and next navigation with keyboard shortcuts.
- Slideshow playback with an adjustable interval from 500 ms to 30,000 ms.
- Auto-hiding controls for distraction-free viewing.
- Bottom progress indicator for the current folder position.
- X-inspired black and white interface driven by `DESIGN.md`.

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- File System Access API

## Quick Start

```bash
npm install
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

## Browser Support

Picture Viewer requires a browser that supports the File System Access API. Chrome and Edge are recommended.

MDN reference: [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)

## Keyboard Shortcuts

| Key | Action |
| --- | --- |
| Left Arrow | Previous image |
| Right Arrow | Next image |
| Space | Play or pause slideshow |

## Project Structure

```text
src/
  App.tsx        # Image browsing, slideshow, and interaction logic
  index.css      # Global styles and viewer UI classes
  main.tsx       # React entry point
DESIGN.md        # Visual design notes
```

## GitHub Discovery Setup

Use this repository description in the GitHub About panel:

```text
Privacy-first local image viewer and slideshow web app built with React, TypeScript, Vite, and the File System Access API.
```

Recommended GitHub topics:

```text
picture-viewer
image-viewer
photo-viewer
local-image-viewer
slideshow
file-system-access-api
offline-first
privacy-first
local-first
react
typescript
vite
```

Useful search keywords for this project:

```text
local image viewer, browser photo viewer, offline slideshow, recursive image browser, privacy-first photo viewer, File System Access API React app
```

## License

Apache-2.0. See [LICENSE](LICENSE).
