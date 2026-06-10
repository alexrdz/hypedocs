# HypeDocs — Professional Performance Tracker

**Own your narrative.**

HypeDocs is a professional-grade performance journal designed to help employees track their wins, quantify their impact, and build a comprehensive evidence-based narrative for self-evaluations and promotion cycles in real-time.

## The Problem it Solves
Most professionals struggle during annual performance reviews to remember exactly what they achieved six months ago. HypeDocs solves "recency bias" by providing a lightweight, persistent space to document achievements the moment they happen.

## Key Features

- **Instant Documentation**: Add new entries with a single click. The system automatically timestamps your entry so you can track your growth chronologically.
- **Frictionless Editing**: Use inline contenteditable cells to jot down notes quickly without leaving the table view.
- **Silent Autosave**: No "Save" buttons required. The app uses a debounced autosave mechanism that persists your data to localStorage as you type.
- **Smart Tagging**: A built-in tagging system allows you to categorize wins (e.g., leadership, revenue, technical) for easy filtering during review season.
- **Quantifiable Value**: A dedicated "Value" column encourages you to assign a priority or impact level (High/Med/Low) to every achievement.
- **Data Portability**: Export your entire history to CSV (for Excel/Google Sheets) or JSON (for backups) to ensure you always own your professional data.
- **Modern UI**: A clean, minimalist, and responsive interface built with fluid typography and a professional color palette.

## Technical Implementation

HypeDocs is built with a "Zero-Dependency" philosophy using Vanilla JavaScript, HTML5, and CSS3.

- **State Management**: The application maintains a local state array that is synchronized with the browser's localStorage via the key `hypeDocs_v2`.
- **Performance Optimization**: To prevent excessive disk writes, the app implements a debounce timer. It waits for a pause in typing before triggering the saveState() function.
- **Dynamic Rendering**: The table is rendered dynamically from the state object, utilizing template literals for efficient DOM updates.
- **UX Enhancements**: 
    - Focus management: Automatically focuses the "Title" cell of a newly created row.
    - Toast notifications: Non-intrusive feedback for autosaves and exports.
    - CSS Clamp: Uses fluid typography (`clamp()`) to ensure the UI looks professional on both ultra-wide monitors and laptops.

## Getting Started

Since HypeDocs is a client-side application, there is no installation required.

1. **Download** the `index.html` file.
2. **Open** the file in any modern web browser (Chrome, Firefox, Safari, Edge).
3. **Start Tracking**: Click "New Entry" and begin documenting your wins.

## Exporting Data

When it is time for your performance review:
1. Scroll to the footer.
2. Click **Export CSV** to get a spreadsheet-ready file.
3. Import the CSV into your company's performance management system or a personal tracking sheet.

## License
Distributed under the MIT License. See LICENSE for more information.

**Built by [Techmex](https://tech-mex.io)**
