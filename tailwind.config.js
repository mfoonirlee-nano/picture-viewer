// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        secondary: "#4d4d4d",
        tertiary: "#006bff",
        "background-100": "#ffffff",
        "background-200": "#fafafa",
        "gray-100": "#f2f2f2",
        "gray-200": "#ebebeb",
        "gray-300": "#e6e6e6",
        "gray-400": "#eaeaea",
        "gray-500": "#c9c9c9",
        "gray-700": "#8f8f8f",
        "gray-900": "#4d4d4d",
        "gray-1000": "#171717",
        "blue-100": "#f0f7ff",
        "blue-700": "#006bff",
        "blue-800": "#0059ec",
        "red-100": "#ffeeef",
        "red-800": "#ea001d",
        "green-700": "#28a948",
      },
      fontFamily: {
        sans: [
          "Geist Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "Geist Mono",
          "SFMono-Regular",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      fontSize: {
        "heading-24": [
          "24px",
          {
            lineHeight: "32px",
            letterSpacing: "0",
            fontWeight: "600",
          },
        ],
        "heading-20": [
          "20px",
          {
            lineHeight: "26px",
            letterSpacing: "0",
            fontWeight: "600",
          },
        ],
        "heading-16": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "0",
            fontWeight: "600",
          },
        ],
        "button-14": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0",
            fontWeight: "500",
          },
        ],
        "label-14": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "label-13": [
          "13px",
          {
            lineHeight: "18px",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "label-12": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "16px",
        full: "9999px",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        10: "40px",
        16: "64px",
        24: "96px",
      },
      boxShadow: {
        card: "0 2px 2px rgba(0, 0, 0, 0.04)",
        popover: "0 1px 1px rgba(0, 0, 0, 0.02), 0 4px 8px -4px rgba(0, 0, 0, 0.04), 0 16px 24px -8px rgba(0, 0, 0, 0.06)",
      },
    },
  },
};
