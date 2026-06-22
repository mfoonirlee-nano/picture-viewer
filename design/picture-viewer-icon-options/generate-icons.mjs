import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = __dirname
const dirs = ['ios-1024', 'web-180', 'web-64', 'web-32']

for (const dir of dirs) {
  mkdirSync(join(outDir, dir), { recursive: true })
}

const palettes = {
  signal: ['#0f766e', '#f59e0b'],
  cobalt: ['#006bff', '#111827'],
  slate: ['#171717', '#4d4d4d'],
  aurora: ['#0f172a', '#22c55e'],
  iris: ['#312e81', '#06b6d4'],
  ember: ['#7c2d12', '#f97316'],
  mono: ['#f8fafc', '#f8fafc'],
  midnight: ['#020617', '#0f766e'],
}

const icons = {
  image: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 11.5l2.5 3.01L14.5 10l4.5 6H5l3.5-4.5z',
  folderImage: 'M10 4l2 2h8c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h6zm-3 13h12l-3.75-5-2.75 3.54L10.25 13 7 17z',
  photoStack: 'M2 6h3v12h14v3H4c-1.1 0-2-.9-2-2V6zm5-4h13c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm3 12h9l-2.8-3.73-2.05 2.64-1.7-2.27L10 14z',
  slideshow: 'M3 5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5zm7 3.5v5l4.5-2.5L10 8.5zM6 21h12v2H6v-2z',
  fullscreenImage: 'M5 5h5v2H7v3H5V5zm9 0h5v5h-2V7h-3V5zM5 14h2v3h3v2H5v-5zm12 0h2v5h-5v-2h3v-3zM8 15h8l-2.5-3.25-1.75 2.25-1.35-1.8L8 15z',
  grid: 'M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8-2h8v8h-8v-8zm2 2v4h4v-4h-4z',
  crop: 'M7 2h2v4h8c.55 0 1 .45 1 1v8h4v2h-4v5h-2v-5H7c-.55 0-1-.45-1-1V8H2V6h4V2h1zm1 6v7h8V8H8zm2 5h5l-1.6-2.15-1.2 1.55-.9-1.2L10 13z',
  shieldPhoto: 'M12 2l8 3v6c0 5.1-3.25 9.65-8 11-4.75-1.35-8-5.9-8-11V5l8-3zm-5 12h10l-2.7-3.6-1.9 2.45-1.45-1.95L7 14z',
}

const candidates = [
  {
    id: 'option-01',
    title: 'Picture Viewer icon option 01 - image',
    icon: icons.image,
    palette: 'signal',
    foreground: '#ffffff',
    scale: 30,
    note: 'Closest to the skill option-01 style: signal gradient plus one large image glyph.',
  },
  {
    id: 'option-02',
    title: 'Picture Viewer icon option 02 - folder image',
    icon: icons.folderImage,
    palette: 'cobalt',
    foreground: '#f8fafc',
    scale: 30,
    note: 'Local folder browsing expressed as a single bold folder-image glyph.',
  },
  {
    id: 'option-03',
    title: 'Picture Viewer icon option 03 - photo stack',
    icon: icons.photoStack,
    palette: 'slate',
    foreground: '#ffffff',
    scale: 30,
    note: 'Stacked local photos, still reduced to one clean white symbol.',
  },
  {
    id: 'option-04',
    title: 'Picture Viewer icon option 04 - slideshow',
    icon: icons.slideshow,
    palette: 'aurora',
    foreground: '#ffffff',
    scale: 30,
    note: 'Slideshow playback without extra viewer chrome.',
  },
  {
    id: 'option-05',
    title: 'Picture Viewer icon option 05 - fullscreen image',
    icon: icons.fullscreenImage,
    palette: 'iris',
    foreground: '#ffffff',
    scale: 30,
    note: 'Fullscreen viewing as four corners plus a compact image glyph.',
  },
  {
    id: 'option-06',
    title: 'Picture Viewer icon option 06 - gallery grid',
    icon: icons.grid,
    palette: 'ember',
    foreground: '#fff7ed',
    scale: 30,
    note: 'Gallery browsing as a simple four-tile icon.',
  },
  {
    id: 'option-07',
    title: 'Picture Viewer icon option 07 - contain crop',
    icon: icons.crop,
    palette: 'mono',
    foreground: '#111827',
    scale: 30,
    note: 'Aspect-ratio / contain behavior with a strong crop-frame image mark.',
  },
  {
    id: 'option-08',
    title: 'Picture Viewer icon option 08 - private photo',
    icon: icons.shieldPhoto,
    palette: 'midnight',
    foreground: '#fbbf24',
    scale: 30,
    note: 'Privacy-first viewing: shield and image combined into one glyph.',
  },
]

function optionSvg(candidate) {
  const [start, end] = palettes[candidate.palette]
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-labelledby="${candidate.id}-title">
  <title id="${candidate.id}-title">${candidate.title}</title>
  <defs>
    <linearGradient id="${candidate.id}-bg" x1="14.6447%" y1="14.6447%" x2="85.3553%" y2="85.3553%">
      <stop offset="0" stop-color="${start}"/>
      <stop offset="1" stop-color="${end}"/>
    </linearGradient>
    <filter id="${candidate.id}-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="25.6" stdDeviation="17.92" flood-color="#0f172a" flood-opacity="0.16"/>
    </filter>
  </defs>
  <rect width="1024" height="1024" fill="url(#${candidate.id}-bg)"/>
  <g filter="url(#${candidate.id}-shadow)">
    <path transform="translate(512 512) rotate(0) scale(${candidate.scale}) translate(-12 -12)" d="${candidate.icon}" fill="${candidate.foreground}"/>
  </g>
</svg>
`
}

for (const candidate of candidates) {
  writeFileSync(join(outDir, `${candidate.id}.svg`), optionSvg(candidate))
}

function digits(value, x, y, scale = 1, fill = '#171717') {
  return String(value).split('').map((digit, index) => digitShape(digit, x + index * 26 * scale, y, scale, fill)).join('\n')
}

function digitShape(digit, x, y, scale, fill) {
  const w = 20 * scale
  const h = 34 * scale
  const t = 5 * scale
  const r = 2.5 * scale
  const segs = {
    a: [x + t, y, w - 2 * t, t],
    b: [x + w - t, y + t, t, h / 2 - t],
    c: [x + w - t, y + h / 2, t, h / 2 - t],
    d: [x + t, y + h - t, w - 2 * t, t],
    e: [x, y + h / 2, t, h / 2 - t],
    f: [x, y + t, t, h / 2 - t],
    g: [x + t, y + h / 2 - t / 2, w - 2 * t, t],
  }
  const map = {
    '0': ['a', 'b', 'c', 'd', 'e', 'f'],
    '1': ['b', 'c'],
    '2': ['a', 'b', 'g', 'e', 'd'],
    '3': ['a', 'b', 'g', 'c', 'd'],
    '4': ['f', 'g', 'b', 'c'],
    '5': ['a', 'f', 'g', 'c', 'd'],
    '6': ['a', 'f', 'g', 'e', 'c', 'd'],
    '7': ['a', 'b', 'c'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    '9': ['a', 'b', 'c', 'd', 'f', 'g'],
  }
  return `<g>${(map[digit] || []).map((seg) => {
    const [sx, sy, sw, sh] = segs[seg]
    return `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="${r}" fill="${fill}"/>`
  }).join('')}</g>`
}

function contactSheet() {
  const tile = 260
  const gap = 32
  const margin = 36
  const labelH = 46
  const width = margin * 2 + tile * 4 + gap * 3
  const height = margin * 2 + (tile + labelH) * 2 + gap
  const cells = candidates.map((candidate, i) => {
    const col = i % 4
    const row = Math.floor(i / 4)
    const x = margin + col * (tile + gap)
    const y = margin + row * (tile + labelH + gap)
    const number = String(i + 1).padStart(2, '0')
    return `
      <g>
        <rect x="${x}" y="${y}" width="${tile}" height="${tile}" rx="44" fill="#f4f4f1"/>
        <clipPath id="mask-${candidate.id}"><rect x="${x + 16}" y="${y + 16}" width="${tile - 32}" height="${tile - 32}" rx="38"/></clipPath>
        <image href="${candidate.id}.png" x="${x + 16}" y="${y + 16}" width="${tile - 32}" height="${tile - 32}" clip-path="url(#mask-${candidate.id})"/>
        ${digits(number, x + tile / 2 - 25, y + tile + 10, 1.1, '#171717')}
      </g>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#ffffff"/>
  ${cells}
</svg>
`
}

function readabilitySheet() {
  const margin = 40
  const rowH = 120
  const labelW = 130
  const gap = 26
  const width = margin * 2 + labelW + 8 * 78 + 7 * gap
  const height = margin * 2 + rowH * 2
  const rows = [
    { label: '64', size: 64, y: margin },
    { label: '32', size: 32, y: margin + rowH },
  ]

  const body = rows.map((row) => {
    const images = candidates.map((candidate, i) => {
      const x = margin + labelW + i * (78 + gap) + (78 - row.size) / 2
      const y = row.y + (rowH - row.size) / 2
      return `<image href="${candidate.id}.png" x="${x}" y="${y}" width="${row.size}" height="${row.size}"/>`
    }).join('\n')
    return `
      ${digits(row.label, margin, row.y + rowH / 2 - 22, 1.2, '#171717')}
      ${images}`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#ffffff"/>
  ${body}
</svg>
`
}

writeFileSync(join(outDir, 'contact-sheet.svg'), contactSheet())
writeFileSync(join(outDir, 'favicon-readability-sheet.svg'), readabilitySheet())

const prompts = `# Picture Viewer Icon Prompts

Method: deterministic SVG implementation following the qiaomu-icon-generator SVG CLI option-01 style.

Reference style:
- Full-square diagonal gradient background.
- One oversized solid glyph centered on the icon.
- Minimal drop shadow.
- No internal cards, labels, pseudo UI, screenshots, or tiny details.

Project context:
- Product: Picture Viewer
- Use: privacy-first local image viewer and slideshow web app
- Direction: stable, clean, clear, readable at 32px

Shared constraints:
- Square source icon, 1024 x 1024
- Opaque background
- No text, letters, numbers, pseudo-text, watermark, or brand marks
- Centered bold symbol with safe padding
- Designed for website favicon and app icon use

Candidates:
${candidates.map((candidate) => `- ${candidate.id}: ${candidate.note}`).join('\n')}
`

const choices = `# Picture Viewer Icon Choices

Generated files:
- \`option-01.svg\` to \`option-08.svg\`
- \`option-01.png\` to \`option-08.png\`
- \`contact-sheet.svg\` and \`contact-sheet.png\`
- \`favicon-readability-sheet.svg\` and \`favicon-readability-sheet.png\`
- \`ios-1024/\`, \`web-180/\`, \`web-64/\`, \`web-32/\`

Recommended shortlist:
- Option 01: closest to the skill example option-01 style, with the clearest image-viewer glyph.
- Option 02: best if the icon should emphasize local folder browsing.
- Option 04: best if the icon should emphasize slideshow playback.

Notes:
- Source SVG files are strict square 1024 x 1024 with opaque gradient backgrounds.
- Rounded corners appear only in the contact sheet preview mask, not in the source icons.
- Existing production icons in \`public/\` were not overwritten.
`

writeFileSync(join(outDir, 'prompts.md'), prompts)
writeFileSync(join(outDir, 'choices.md'), choices)

function renderIconPng(candidate, output, size) {
  if (!existsSync('/usr/local/bin/magick')) return false
  const [start, end] = palettes[candidate.palette]
  const glyphSvg = join(outDir, `.${candidate.id}-glyph.svg`)
  writeFileSync(glyphSvg, `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <path transform="translate(512 512) rotate(0) scale(${candidate.scale}) translate(-12 -12)" d="${candidate.icon}" fill="${candidate.foreground}"/>
</svg>
`)
  const temp = join(outDir, `.${candidate.id}-1024.png`)
  execFileSync('/usr/local/bin/magick', [
    '-size', '1024x1024',
    `gradient:${start}-${end}`,
    '-background', 'none',
    glyphSvg,
    '-compose', 'over',
    '-composite',
    temp,
  ], { cwd: outDir, stdio: 'inherit' })
  execFileSync('/usr/local/bin/magick', [
    '-background', '#ffffff',
    temp,
    '-resize', `${size}x${size}`,
    '-alpha', 'remove',
    '-alpha', 'off',
    '-type', 'TrueColor',
    output,
  ], { cwd: outDir, stdio: 'inherit' })
  rmSync(glyphSvg, { force: true })
  rmSync(temp, { force: true })
  return true
}

function renderPng(input, output, size) {
  if (!existsSync('/usr/local/bin/magick')) return false
  execFileSync('/usr/local/bin/magick', [
    '-background', '#ffffff',
    input,
    '-resize', `${size}x${size}`,
    '-alpha', 'remove',
    '-alpha', 'off',
    '-type', 'TrueColor',
    output,
  ], { cwd: outDir, stdio: 'inherit' })
  return true
}

let rendered = false
for (const candidate of candidates) {
  rendered = renderIconPng(candidate, join(outDir, `${candidate.id}.png`), 1024) || rendered
  renderIconPng(candidate, join(outDir, 'ios-1024', `${candidate.id}.png`), 1024)
  renderIconPng(candidate, join(outDir, 'web-180', `${candidate.id}.png`), 180)
  renderIconPng(candidate, join(outDir, 'web-64', `${candidate.id}.png`), 64)
  renderIconPng(candidate, join(outDir, 'web-32', `${candidate.id}.png`), 32)
}

if (rendered) {
  renderPng(join(outDir, 'contact-sheet.svg'), join(outDir, 'contact-sheet.png'), 1200)
  renderPng(join(outDir, 'favicon-readability-sheet.svg'), join(outDir, 'favicon-readability-sheet.png'), 1000)
}

console.log(`Generated ${candidates.length} icon candidates in ${outDir}`)
