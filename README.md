# Picture Viewer

本地图片浏览器 — 基于 Glassmorphism 设计风格的全屏图片查看与幻灯片播放工具。

## 功能特性

- **本地目录浏览** — 通过浏览器 File System Access API 选择本地文件夹，图片不会上传至任何服务器
- **递归扫描** — 自动遍历子目录，筛选常见图片格式（jpg、jpeg、png、gif、bmp、webp、svg）
- **自然排序** — 文件名按自然顺序排列（数字部分按数值排序）
- **全屏显示** — 图片以 `object-fit: contain` 居中展示，不裁切不变形
- **幻灯片播放** — 支持自动轮播，播放间隔 500ms ~ 30,000ms 可调，默认 3 秒，播完自动停止
- **手动导航** — 上一张 / 下一张按钮，支持键盘快捷键（← → 切换，空格键 播放/暂停）
- **自动隐藏控制面板** — 3.5 秒无操作后控制面板自动收起，鼠标移至右上角区域或交互时重新显示
- **进度指示** — 底部进度条显示当前浏览位置
- **响应式布局** — 适配 520px 以下窄屏设备

## 技术栈

- **React 19** + **TypeScript**
- **Vite 8** 构建
- **Tailwind CSS 4** 样式
- **Glassmorphism** 设计系统（毛玻璃面板、深色大气背景、模糊透明层）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
  App.tsx        # 主应用组件（图片浏览、幻灯片、交互逻辑）
  index.css      # 全局样式 & Glassmorphism 组件类
  main.tsx       # React 入口
design.md        # 设计系统规范
```

## 浏览器要求

需要支持 [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) 的浏览器，推荐 **Chrome** 或 **Edge**。

## 键盘快捷键

| 按键 | 功能 |
|------|------|
| ← | 上一张 |
| → | 下一张 |
| 空格 | 播放 / 暂停 |

## License

Apache-2.0
