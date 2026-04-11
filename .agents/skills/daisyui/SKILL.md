---
name: daisyui
description: Tailwind CSS component library providing semantic class names for 50+ components with built-in themes, dark mode, and customization for rapid UI development.
progressive_disclosure:
  entry_point:
    - summary
    - when_to_use
    - quick_start
  token_estimates:
    entry: 75
    full: 4200
---

# DaisyUI Component Library

## Summary

DaisyUI is the most popular Tailwind CSS component library providing semantic class names for 50+ components with built-in themes, dark mode, and customization. Framework-agnostic and production-ready.

## When to Use

- Building UI with Tailwind CSS and need pre-styled components
- Want semantic class names (`btn`, `card`) instead of utility-only approach
- Need built-in theming system with 30+ themes and dark mode
- Require consistent design system across React, Vue, Svelte, or vanilla HTML
- Want to prototype quickly with ready-made components
- Need accessible components following semantic HTML patterns

---

## Quick Start

### Installation

```bash
npm install -D daisyui@latest
```

### Configuration

Add to `tailwind.config.js`:

```javascript
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Enable specific themes
    darkTheme: "dark", // Default dark theme
    base: true, // Base styles
    styled: true, // Component styles
    utils: true, // Utility classes
  },
};
```

### Basic Usage

```html
<!-- Button component -->
<button class="btn btn-primary">Primary Button</button>

<!-- Card component -->
<div class="card w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card description goes here</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>

<!-- Modal component -->
<dialog id="my_modal" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Modal Title</h3>
    <p class="py-4">Modal content</p>
    <div class="modal-action">
      <button class="btn">Close</button>
    </div>
  </div>
</dialog>
```

---

## Core Components

### Buttons

```html
<!-- Variants -->
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-link">Link</button>

<!-- Sizes -->
<button class="btn btn-lg">Large</button>
<button class="btn btn-md">Medium</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-xs">Tiny</button>

<!-- States -->
<button class="btn btn-active">Active</button>
<button class="btn btn-disabled">Disabled</button>
<button class="btn loading">Loading</button>

<!-- Shapes -->
<button class="btn btn-circle">C</button>
<button class="btn btn-square">S</button>
<button class="btn btn-wide">Wide</button>
<button class="btn btn-block">Block</button>

<!-- Outline -->
<button class="btn btn-outline btn-primary">Outline</button>
```

### Cards

```html
<!-- Basic card -->
<div class="card w-96 bg-base-100 shadow-xl">
  <figure><img src="image.jpg" alt="Album" /></figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Description text</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

<!-- Compact card -->
<div class="card card-compact w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Compact Card</h2>
    <p>Reduced padding</p>
  </div>
</div>

<!-- Card with badge -->
<div class="card w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">
      Title
      <div class="badge badge-secondary">NEW</div>
    </h2>
    <p>Content</p>
  </div>
</div>

<!-- Image overlay card -->
<div class="card card-compact w-96 image-full bg-base-100 shadow-xl">
  <figure><img src="image.jpg" alt="Album" /></figure>
  <div class="card-body">
    <h2 class="card-title">Overlay Text</h2>
    <p>Text appears on top of image</p>
  </div>
</div>
```

### Modals

```html
<!-- Modal structure -->
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button to close</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Open modal with JavaScript -->
<button onclick="my_modal_1.showModal()" class="btn">Open Modal</button>

<!-- Modal with backdrop -->
<dialog id="my_modal_2" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Modal with backdrop</h3>
    <p class="py-4">Click outside to close</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- Responsive modal -->
<dialog id="my_modal_3" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Responsive</h3>
    <p class="py-4">Bottom on mobile, middle on desktop</p>
    <div class="modal-action">
      <button class="btn">Close</button>
    </div>
  </div>
</dialog>
```

### Forms

```html
<!-- Input fields -->
<input type="text" placeholder="Default" class="input input-bordered w-full max-w-xs" />
<input
  type="text"
  placeholder="Primary"
  class="input input-bordered input-primary w-full max-w-xs"
/>
<input type="text" placeholder="Disabled" class="input input-bordered w-full max-w-xs" disabled />

<!-- Input sizes -->
<input type="text" class="input input-bordered input-lg" />
<input type="text" class="input input-bordered input-md" />
<input type="text" class="input input-bordered input-sm" />
<input type="text" class="input input-bordered input-xs" />

<!-- Textarea -->
<textarea class="textarea textarea-bordered" placeholder="Bio"></textarea>

<!-- Select -->
<select class="select select-bordered w-full max-w-xs">
  <option disabled selected>Pick one</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Checkbox -->
<input type="checkbox" class="checkbox" />
<input type="checkbox" class="checkbox checkbox-primary" checked />
<input type="checkbox" class="checkbox checkbox-secondary" checked />

<!-- Radio -->
<input type="radio" name="radio-1" class="radio" checked />
<input type="radio" name="radio-1" class="radio radio-primary" />

<!-- Toggle -->
<input type="checkbox" class="toggle" checked />
<input type="checkbox" class="toggle toggle-primary" checked />
<input type="checkbox" class="toggle toggle-secondary" checked />

<!-- Range slider -->
<input type="range" min="0" max="100" value="50" class="range range-primary" />

<!-- File input -->
<input type="file" class="file-input file-input-bordered w-full max-w-xs" />

<!-- Form control with label -->
<div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">Email</span>
  </label>
  <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
  <label class="label">
    <span class="label-text-alt">Helper text</span>
  </label>
</div>
```

### Navigation

```html
<!-- Navbar -->
<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a>Link</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul class="p-2 bg-base-100">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>

<!-- Menu -->
<ul class="menu bg-base-200 w-56 rounded-box">
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li>
    <details open>
      <summary>Parent</summary>
      <ul>
        <li><a>Submenu 1</a></li>
        <li><a>Submenu 2</a></li>
      </ul>
    </details>
  </li>
</ul>

<!-- Breadcrumbs -->
<div class="text-sm breadcrumbs">
  <ul>
    <li><a>Home</a></li>
    <li><a>Documents</a></li>
    <li>Add Document</li>
  </ul>
</div>

<!-- Tabs -->
<div class="tabs tabs-boxed">
  <a class="tab">Tab 1</a>
  <a class="tab tab-active">Tab 2</a>
  <a class="tab">Tab 3</a>
</div>

<!-- Pagination -->
<div class="join">
  <button class="join-item btn">«</button>
  <button class="join-item btn">Page 1</button>
  <button class="join-item btn btn-active">2</button>
  <button class="join-item btn">3</button>
  <button class="join-item btn">»</button>
</div>
```

### Layout Components

```html
<!-- Drawer (sidebar) -->
<div class="drawer">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label>
  </div>
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>

<!-- Hero -->
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">Provident cupiditate voluptatem et in.</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>

<!-- Footer -->
<footer class="footer p-10 bg-base-200 text-base-content">
  <nav>
    <h6 class="footer-title">Services</h6>
    <a class="link link-hover">Branding</a>
    <a class="link link-hover">Design</a>
  </nav>
  <nav>
    <h6 class="footer-title">Company</h6>
    <a class="link link-hover">About us</a>
    <a class="link link-hover">Contact</a>
  </nav>
</footer>

<!-- Stack (layered elements) -->
<div class="stack">
  <div class="card shadow-md bg-primary text-primary-content">
    <div class="card-body">A</div>
  </div>
  <div class="card shadow bg-primary text-primary-content">
    <div class="card-body">B</div>
  </div>
  <div class="card shadow-sm bg-primary text-primary-content">
    <div class="card-body">C</div>
  </div>
</div>

<!-- Divider -->
<div class="flex flex-col w-full">
  <div class="divider">OR</div>
</div>
```

### Data Display

```html
<!-- Table -->
<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Company</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Littel, Schaden and Vandervort</td>
      </tr>
      <tr class="hover">
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Zemlak, Daniel and Leannon</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Table variants -->
<table class="table table-zebra">
  <!-- Striped rows -->
</table>
<table class="table table-pin-rows">
  <!-- Pin header -->
</table>
<table class="table table-pin-cols">
  <!-- Pin columns -->
</table>

<!-- Badge -->
<div class="badge">default</div>
<div class="badge badge-primary">primary</div>
<div class="badge badge-secondary">secondary</div>
<div class="badge badge-accent">accent</div>
<div class="badge badge-ghost">ghost</div>
<div class="badge badge-outline">outline</div>

<!-- Stat -->
<div class="stats shadow">
  <div class="stat">
    <div class="stat-title">Total Page Views</div>
    <div class="stat-value">89,400</div>
    <div class="stat-desc">21% more than last month</div>
  </div>
</div>

<!-- Timeline -->
<ul class="timeline timeline-vertical">
  <li>
    <div class="timeline-start">1984</div>
    <div class="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div class="timeline-end timeline-box">First Macintosh computer</div>
    <hr />
  </li>
  <li>
    <hr />
    <div class="timeline-start">1998</div>
    <div class="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div class="timeline-end timeline-box">iMac</div>
    <hr />
  </li>
</ul>

<!-- Avatar -->
<div class="avatar">
  <div class="w-24 rounded-full">
    <img src="avatar.jpg" />
  </div>
</div>

<!-- Avatar group -->
<div class="avatar-group -space-x-6 rtl:space-x-reverse">
  <div class="avatar">
    <div class="w-12">
      <img src="avatar1.jpg" />
    </div>
  </div>
  <div class="avatar">
    <div class="w-12">
      <img src="avatar2.jpg" />
    </div>
  </div>
</div>

<!-- Progress -->
<progress class="progress progress-primary w-56" value="70" max="100"></progress>

<!-- Radial progress -->
<div class="radial-progress" style="--value:70;">70%</div>
```

### Feedback Components

```html
<!-- Alert -->
<div class="alert">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    class="stroke-info shrink-0 w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
  <span>Info alert</span>
</div>

<div class="alert alert-success">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="stroke-current shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
  <span>Success alert!</span>
</div>

<div class="alert alert-warning">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="stroke-current shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
  <span>Warning alert!</span>
</div>

<div class="alert alert-error">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="stroke-current shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
  <span>Error alert!</span>
</div>

<!-- Toast -->
<div class="toast">
  <div class="alert alert-info">
    <span>New message arrived.</span>
  </div>
</div>

<!-- Toast positions -->
<div class="toast toast-top toast-end">
  <div class="alert alert-info">
    <span>Top right</span>
  </div>
</div>

<!-- Loading -->
<span class="loading loading-spinner loading-xs"></span>
<span class="loading loading-spinner loading-sm"></span>
<span class="loading loading-spinner loading-md"></span>
<span class="loading loading-spinner loading-lg"></span>

<!-- Loading variants -->
<span class="loading loading-dots"></span>
<span class="loading loading-ring"></span>
<span class="loading loading-ball"></span>
<span class="loading loading-bars"></span>
<span class="loading loading-infinity"></span>

<!-- Tooltip -->
<div class="tooltip" data-tip="hello">
  <button class="btn">Hover me</button>
</div>

<!-- Tooltip positions -->
<div class="tooltip tooltip-right" data-tip="Right">
  <button class="btn">Right</button>
</div>
```

---

## Theming System

### Built-in Themes

DaisyUI includes 30+ pre-built themes:

```javascript
// tailwind.config.js
module.exports = {
  daisyui: {
    themes: [
      "light", // Default light theme
      "dark", // Default dark theme
      "cupcake", // Pink/pastel theme
      "bumblebee", // Yellow theme
      "emerald", // Green theme
      "corporate", // Professional blue
      "synthwave", // Retro neon
      "retro", // Vintage brown
      "cyberpunk", // Neon yellow/pink
      "valentine", // Pink/red romantic
      "halloween", // Orange/purple spooky
      "garden", // Green nature
      "forest", // Dark green
      "aqua", // Blue ocean
      "lofi", // Low contrast
      "pastel", // Soft colors
      "fantasy", // Purple/pink fantasy
      "wireframe", // Minimal black/white
      "black", // Dark minimal
      "luxury", // Gold/black elegant
      "dracula", // Purple dark theme
      "cmyk", // Print colors
      "autumn", // Orange/brown
      "business", // Professional dark
      "acid", // Neon green
      "lemonade", // Yellow/green fresh
      "night", // Deep blue dark
      "coffee", // Brown coffee shop
      "winter", // Blue/white cold
      "dim", // Low light dark
      "nord", // Nordic blue/gray
      "sunset", // Orange/purple gradient
    ],
  },
};
```

### Theme Switching

```html
<!-- Set theme on HTML element -->
<html data-theme="cupcake">
  <!-- Your app -->
</html>

<!-- JavaScript theme switcher -->
<script>
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
</script>

<!-- Theme switcher UI -->
<select class="select select-bordered" onchange="setTheme(this.value)">
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="cupcake">Cupcake</option>
  <option value="synthwave">Synthwave</option>
</select>
```

### Dark Mode

```javascript
// Auto dark mode based on system preference
module.exports = {
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
  },
};
```

```html
<!-- Detect system preference -->
<script>
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
</script>
```

### Custom Theme

```javascript
// tailwind.config.js
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a991f7",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
```

### Extending Existing Themes

```javascript
module.exports = {
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#0000ff", // Override primary color
          ".btn-twitter": {
            // Custom component
            "background-color": "#1da1f2",
            "border-color": "#1da1f2",
          },
        },
      },
    ],
  },
};
```

### CSS Variable Customization

```css
/* Override theme variables */
[data-theme="mytheme"] {
  --rounded-box: 1rem;
  --rounded-btn: 0.5rem;
  --rounded-badge: 1.9rem;
  --animation-btn: 0.25s;
  --animation-input: 0.2s;
  --btn-text-case: uppercase;
  --btn-focus-scale: 0.95;
  --border-btn: 1px;
  --tab-border: 1px;
  --tab-radius: 0.5rem;
}
```

---

## Color System

### Semantic Colors

DaisyUI uses semantic color names that adapt to themes:

```html
<!-- Background colors -->
<div class="bg-primary">Primary background</div>
<div class="bg-secondary">Secondary background</div>
<div class="bg-accent">Accent background</div>
<div class="bg-neutral">Neutral background</div>
<div class="bg-base-100">Base background (main)</div>
<div class="bg-base-200">Base background (lighter)</div>
<div class="bg-base-300">Base background (even lighter)</div>
<div class="bg-info">Info background</div>
<div class="bg-success">Success background</div>
<div class="bg-warning">Warning background</div>
<div class="bg-error">Error background</div>

<!-- Text colors -->
<p class="text-primary">Primary text</p>
<p class="text-primary-content">Text on primary background</p>
<p class="text-secondary">Secondary text</p>
<p class="text-secondary-content">Text on secondary background</p>
<p class="text-accent">Accent text</p>
<p class="text-accent-content">Text on accent background</p>
<p class="text-neutral">Neutral text</p>
<p class="text-neutral-content">Text on neutral background</p>
<p class="text-base-content">Base text color</p>

<!-- Border colors -->
<div class="border border-primary">Primary border</div>
<div class="border border-secondary">Secondary border</div>
```

### Color Utilities

```html
<!-- Glass effect (frosted glass) -->
<div class="glass">Glassmorphism effect</div>

<!-- Ghost variant (transparent) -->
<button class="btn btn-ghost">Ghost button</button>

<!-- Outline variant -->
<button class="btn btn-outline btn-primary">Outlined</button>
```

---

## Framework Integration

### React

```jsx
import React from "react";

// DaisyUI works with plain HTML classes
function App() {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>Card description</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Action</button>
        </div>
      </div>
    </div>
  );
}

// Modal component
function Modal({ children, id }) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

// Usage
function App() {
  return (
    <>
      <button onClick={() => document.getElementById("my_modal").showModal()} className="btn">
        Open Modal
      </button>
      <Modal id="my_modal">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Modal content</p>
      </Modal>
    </>
  );
}
```

### Vue

```vue
<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Card Title</h2>
      <p>Card description</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Action</button>
      </div>
    </div>
  </div>
</template>

<!-- Modal component -->
<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <slot></slot>
      <div class="modal-action">
        <button @click="close" class="btn">Close</button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from "vue";

const modal = ref(null);

function open() {
  modal.value.showModal();
}

function close() {
  modal.value.close();
}

defineExpose({ open, close });
</script>
```

### Svelte

```svelte
<script>
  let modal;

  function openModal() {
    modal.showModal();
  }
</script>

<button on:click={openModal} class="btn btn-primary">
  Open Modal
</button>

<dialog bind:this={modal} class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Modal content</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Card component -->
<div class="card w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card description</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>
```

---

## Responsive Design

### Responsive Utilities

```html
<!-- Responsive modifiers (Tailwind breakpoints) -->
<button class="btn btn-sm md:btn-md lg:btn-lg">Responsive size button</button>

<div class="drawer drawer-mobile">
  <input type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Main content (sidebar always visible on desktop) -->
  </div>
  <div class="drawer-side">
    <!-- Sidebar -->
  </div>
</div>

<!-- Responsive modal position -->
<dialog class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <p>Bottom on mobile, centered on desktop</p>
  </div>
</dialog>

<!-- Responsive navbar -->
<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </div>
</div>
```

### Mobile-First Approach

```html
<!-- Stack on mobile, grid on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="card bg-base-100 shadow-xl">Card 1</div>
  <div class="card bg-base-100 shadow-xl">Card 2</div>
  <div class="card bg-base-100 shadow-xl">Card 3</div>
</div>

<!-- Hide on mobile -->
<div class="hidden md:block">Desktop only content</div>

<!-- Show only on mobile -->
<div class="block md:hidden">Mobile only content</div>
```

---

## Advanced Configuration

### Complete Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        mytheme: {
          primary: "#570df8",
          secondary: "#f000b8",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
```

### Configuration Options

- **themes**: Array of theme names or custom theme objects
- **darkTheme**: Which theme to use for dark mode (default: "dark")
- **base**: Apply base styles (default: true)
- **styled**: Apply component styles (default: true)
- **utils**: Apply utility classes (default: true)
- **prefix**: Prefix for all daisyUI classes (default: "")
- **logs**: Show info in terminal during build (default: true)
- **themeRoot**: Root element for theme (default: ":root")

### Disable Base Styles

```javascript
// Only use components, not base styles
module.exports = {
  daisyui: {
    base: false, // Don't apply base HTML styles
    styled: true,
    utils: true,
  },
};
```

### Class Prefix

```javascript
// Add prefix to avoid conflicts
module.exports = {
  daisyui: {
    prefix: "daisy-",
  },
};
```

```html
<!-- Now use daisy- prefix -->
<button class="daisy-btn daisy-btn-primary">Button</button>
```

---

## Best Practices

### Component Organization

```jsx
// Create reusable component library
// components/Button.jsx
export function Button({ variant = "primary", size = "md", children, ...props }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} {...props}>
      {children}
    </button>
  );
}

// Usage
<Button variant="primary" size="lg">
  Click me
</Button>;
```

### Theme Management

```javascript
// utils/theme.js
export const THEMES = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate"];

export function getTheme() {
  return localStorage.getItem("theme") || "light";
}

export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export function toggleDarkMode() {
  const current = getTheme();
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
}
```

### Accessibility

```html
<!-- Use semantic HTML -->
<button class="btn" aria-label="Close dialog">
  <svg><!-- icon --></svg>
</button>

<!-- Proper form labels -->
<div class="form-control">
  <label class="label" for="email-input">
    <span class="label-text">Email</span>
  </label>
  <input id="email-input" type="email" class="input input-bordered" aria-describedby="email-help" />
  <label class="label">
    <span id="email-help" class="label-text-alt">We'll never share your email</span>
  </label>
</div>

<!-- Keyboard navigation -->
<div role="tablist" class="tabs tabs-boxed">
  <button role="tab" class="tab" aria-selected="true">Tab 1</button>
  <button role="tab" class="tab" aria-selected="false">Tab 2</button>
</div>
```

### Performance Optimization

```javascript
// Only import themes you use
module.exports = {
  daisyui: {
    themes: ["light", "dark"], // Only these 2 themes
  },
};

// Or use custom themes only
module.exports = {
  daisyui: {
    themes: [
      {
        light: {
          /* custom light */
        },
        dark: {
          /* custom dark */
        },
      },
    ],
  },
};
```

### Combining with Tailwind

```html
<!-- DaisyUI components + Tailwind utilities -->
<button class="btn btn-primary rounded-full shadow-lg hover:shadow-xl transition-all">
  Styled button
</button>

<!-- Use Tailwind for layout, DaisyUI for components -->
<div class="container mx-auto px-4 py-8">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card bg-base-100 shadow-xl">Card 1</div>
    <div class="card bg-base-100 shadow-xl">Card 2</div>
    <div class="card bg-base-100 shadow-xl">Card 3</div>
  </div>
</div>
```

---

## Common Patterns

### Loading States

```jsx
function DataComponent() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return <div>Data content</div>;
}
```

### Form Validation

```jsx
function LoginForm() {
  const [errors, setErrors] = useState({});

  return (
    <form className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          className={`input input-bordered ${errors.email ? "input-error" : ""}`}
        />
        {errors.email && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.email}</span>
          </label>
        )}
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Login
      </button>
    </form>
  );
}
```

### Dropdown Menu

```html
<div class="dropdown dropdown-end">
  <label tabindex="0" class="btn btn-ghost"> Click </label>
  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>
```

### Notification Toast

```jsx
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = "toast toast-top toast-end";
  toast.innerHTML = `
    <div class="alert alert-${type}">
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// Usage
showToast("Operation successful!", "success");
showToast("An error occurred", "error");
```

---

## Troubleshooting

### Styles Not Applying

```javascript
// Ensure DaisyUI is in Tailwind plugins
module.exports = {
  plugins: [require("daisyui")],
};

// Check content paths include your files
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./pages/**/*.{html,js,jsx,ts,tsx}"],
};
```

### Theme Not Changing

```html
<!-- Verify data-theme attribute is set -->
<html data-theme="dark">
  <!-- Check JavaScript is running -->
  <script>
    console.log(document.documentElement.getAttribute("data-theme"));
  </script>
</html>
```

### Modal Not Opening

```javascript
// Use native dialog API
const modal = document.getElementById("my_modal");
modal.showModal(); // Opens modal
modal.close(); // Closes modal

// Or use checkbox for non-dialog implementation
```

### Conflicts with Tailwind

```javascript
// Use prefix to avoid conflicts
module.exports = {
  daisyui: {
    prefix: "d-",
  },
};
```

---

## Resources

- **Official Documentation**: https://daisyui.com
- **GitHub Repository**: https://github.com/saadeghi/daisyui
- **Component Explorer**: https://daisyui.com/components/
- **Theme Generator**: https://daisyui.com/theme-generator/
- **Community Themes**: https://github.com/saadeghi/daisyui/discussions
- **NPM Package**: https://www.npmjs.com/package/daisyui
- **Tailwind CSS Docs**: https://tailwindcss.com

---

## Migration Guide

### From Plain Tailwind

```html
<!-- Before (Tailwind only) -->
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Button</button>

<!-- After (DaisyUI) -->
<button class="btn btn-primary">Button</button>
```

### From Bootstrap

```html
<!-- Bootstrap -->
<button class="btn btn-primary">Button</button>
<div class="card">
  <div class="card-body">Content</div>
</div>

<!-- DaisyUI (very similar!) -->
<button class="btn btn-primary">Button</button>
<div class="card">
  <div class="card-body">Content</div>
</div>
```

### Version Updates

```bash
# Check current version
npm list daisyui

# Update to latest
npm install -D daisyui@latest

# Check changelog
# https://github.com/saadeghi/daisyui/releases
```
