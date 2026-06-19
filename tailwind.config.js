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
        "x-black": "#000000",
        "x-white": "#ffffff",
        "text-primary-light": "#0f1419",
        "text-secondary-light": "#536471",
        "text-primary-dark": "#e7e9ea",
        "surface-light": "#ffffff",
        "surface-subtle": "#f7f9f9",
        "border-light": "#cfd9de",
        "border-faint": "#eff3f4",
        "action-blue": "#1d9bf0",
        "action-blue-hover": "#1a8cd8",
        "success": "#00ba7c",
        "danger": "#f4212e",
        "warning": "#ffd400",
      },
      fontFamily: {
        sans: [
          "TwitterChirp",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        brand: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        product: [
          "TwitterChirp",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "brand-display": [
          "72px",
          {
            lineHeight: "1.05",
            letterSpacing: "0",
            fontWeight: "700",
          },
        ],
        "brand-subheadline": [
          "32px",
          {
            lineHeight: "1.15",
            letterSpacing: "0",
            fontWeight: "700",
          },
        ],
        "product-display": [
          "48px",
          {
            lineHeight: "1.08",
            letterSpacing: "0",
            fontWeight: "800",
          },
        ],
        "product-title": [
          "23px",
          {
            lineHeight: "1.25",
            letterSpacing: "0",
            fontWeight: "700",
          },
        ],
        body: [
          "15px",
          {
            lineHeight: "1.35",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "body-large": [
          "20px",
          {
            lineHeight: "1.35",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        label: [
          "15px",
          {
            lineHeight: "1.2",
            letterSpacing: "0",
            fontWeight: "700",
          },
        ],
        meta: [
          "13px",
          {
            lineHeight: "1.25",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "8px",
        lg: "16px",
        pill: "9999px",
      },
      spacing: {
        unit: "4px",
        baseline: "8px",
        "control-gap": "12px",
        "page-gutter": "20px",
        "section-gap": "48px",
        "timeline-width": "600px",
        "sidebar-width": "275px",
        "rail-width": "350px",
      },
    },
  },
};
