# Facturación CRI 4.4 - Design System Rules

## Project Overview

**Facturación CRI 4.4** is a React-based invoice management application with a mobile-first design approach. The project uses Tailwind CSS v4 with PostCSS for styling, React Router v7 for navigation, and TypeScript for type safety.

### Key Technologies
- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS v4 with PostCSS
- **Build Tool**: Vite v7
- **Router**: React Router DOM v7
- **Type System**: TypeScript v5.9
- **Package Manager**: npm
- **CSS Architecture**: Utility-first with Tailwind CSS

---

## 1. Design Tokens & Variables

### Color Tokens
Color tokens are defined in `src/index.css` using CSS custom properties at the `:root` level:

```css
:root {
  /* Colors - Text & Icons */
  --color-text-primary: #0F172A;      /* Slate-900 */
  --color-text-secondary: #334155;    /* Slate-700 */
  --color-text-tertiary: #64748B;     /* Slate-600 */

  /* Colors - Background */
  --color-bg-container: #ffffff;

  /* Colors - Border */
  --color-border-regular: rgba(148, 163, 184, 0.4);  /* Slate-400 @ 40% */
  --color-border-active: #30aba9;                     /* Teal/Cyan */
}
```

### Key Color References
- **Primary Action**: `#30aba9` (Teal)
- **Text Primary**: `#0F172A` (Slate-900)
- **Text Secondary**: `#334155` (Slate-700)
- **Borders**: `rgba(148, 163, 184, 0.4)` (Slate-400 @ 40%)

---

## 2. Typography System

### Font Family
- **Primary Font**: Inter (Medium: 500, Semibold: 600)

### Typography Scale

| Use Case | Size | Weight | Line Height | Class |
|----------|------|--------|-------------|-------|
| Section Headers | 16px | 500 | 24px | `text-base font-medium` |
| Large Titles | 16px | 600 | Default | `text-base font-semibold` |
| Labels | 14px | 500 | Default | `text-sm font-medium` |
| Body Text | 14px | 400 | Default | `text-sm font-normal` |
| Small Text | 12px | 400 | 16px | `text-xs font-normal` |

---

## 3. Component Architecture

### SectionHeader Component

**Location**: `src/components/SectionHeader.tsx`

```typescript
interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="bg-white border-b border-[rgba(148,163,184,0.4)] pt-[8px] pb-[12px] px-0">
      <h3 className="text-base font-medium text-slate-700 px-4">{title}</h3>
    </div>
  );
}
```

**Usage Pattern**:
```tsx
<div className="bg-white px-4">
  <SectionHeader title="Section Title" />
  <div className="pt-4">
    {/* Form content */}
  </div>
</div>
```

### Form Field Pattern

```tsx
<div className="mb-4">
  <label className="block text-sm font-medium text-slate-700 mb-2">
    Label<span className="text-[#30aba9] ml-0.5">*</span>
  </label>
  <input className="w-full h-12 px-3.5 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9]" />
</div>
```

---

## 4. Styling System

### CSS Architecture
- **Utility-first**: Tailwind CSS v4
- **Design Tokens**: CSS custom properties in `:root`
- **No Custom CSS**: Use Tailwind classes exclusively

### Tailwind Configuration (src/index.css)

```css
@import "tailwindcss";

@layer base {
  :root {
    --color-text-primary: #0F172A;
    --color-text-secondary: #334155;
    --color-text-tertiary: #64748B;
    --color-bg-container: #ffffff;
    --color-border-regular: rgba(148, 163, 184, 0.4);
    --color-border-active: #30aba9;
  }

  body {
    @apply min-w-[320px] min-h-screen bg-white text-slate-900;
    font-family: 'Inter', sans-serif;
  }
}

@theme {
  --font-sans: 'Inter', sans-serif;
  --color-primary-600: #30aba9;
}
```

---

## 5. Spacing System

### Tailwind Spacing Scale (4px = 1 unit)

- `px-0`: 0px
- `px-3.5`: 14px
- `px-4`: 16px
- `py-3`: 12px
- `pt-4`: 16px
- `pb-4`: 16px
- `mb-2`: 8px
- `mb-4`: 16px
- `gap-2`: 8px
- `gap-3`: 12px

### Mobile Layout
- **Width**: 375px max (mobile viewport)
- **Status Bar**: 54px
- **Header**: 60px + 6px progress bar
- **Content**: `overflow-y-auto flex-1`

---

## 6. Interactive Components

### Toggle Button (Selected State)

```tsx
<button
  className={`flex-1 h-12 border-[1.5px] rounded-lg text-sm font-medium transition-colors ${
    isSelected
      ? 'border-[#30aba9] bg-[#F0FDFC] text-slate-900'
      : 'border-slate-300/40 bg-white text-slate-900'
  }`}
>
  {label}
</button>
```

### Input with Icon

```tsx
<div className="relative">
  <input
    type="text"
    className="w-full h-12 px-3.5 pr-10 border border-slate-300/40 rounded-xl text-base text-slate-900 outline-none focus:border-[#30aba9]"
    readOnly
  />
  <svg className="absolute right-3.5 top-1/2 -translate-y-1/2" width="20" height="20" viewBox="0 0 20 20">
    <path d="M7.5 5L12.5 10L7.5 15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
</div>
```

### CTA Button (Dashed Border)

```tsx
<button className="w-full h-[52px] border-[1.5px] border-dashed border-slate-300/40 rounded-xl flex items-center justify-center gap-2 text-[#30aba9] font-semibold text-sm hover:border-[#30aba9] transition-colors">
  <span className="text-lg font-semibold">+</span>
  <span>Add item</span>
</button>
```

---

## 7. Project Structure

```
src/
├── components/
│   ├── SectionHeader.tsx       # Reusable section header
│   ├── FirstProposal.tsx       # Invoice form
│   ├── Introduction.tsx        # Landing page
│   ├── PrototypeType.tsx       # Badge
│   └── OptionCard.tsx          # Card component
├── App.tsx                     # Router
├── main.tsx                    # Entry point
├── App.css
└── index.css                   # Tailwind + design tokens
```

---

## 8. Routing (React Router v7)

```typescript
// src/App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Introduction />} />
    <Route path="/1st-proposal" element={<FirstProposal />} />
  </Routes>
</BrowserRouter>
```

---

## 9. Assets & Icons

### Images
```tsx
<img src="/images/logo.svg" alt="Logo" className="h-[74px]" />
```

### SVG Icons (Inline)
```tsx
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M15 18L9 12L15 6" stroke="#334155" strokeWidth="2" strokeLinecap="round"/>
</svg>
```

---

## 10. Development

### Scripts
```bash
npm run dev       # Development server
npm run build     # Production build (TypeScript + Vite)
npm run lint      # ESLint
npm run preview   # Preview production build
```

### Build Process
1. TypeScript type checking: `tsc -b`
2. Vite bundling & optimization
3. Tailwind + PostCSS CSS processing

---

## 11. Figma Integration

**Figma Design File**: https://www.figma.com/design/G4L7LYtkISB6T4DwLJ4wHS/

### Key Design Token: Section Header
- **Node ID**: `3964:14011`
- **Background**: White (#ffffff)
- **Border**: Slate-400 @ 40% (bottom only)
- **Padding**: 8px top, 12px bottom, 0px horizontal
- **Title Font**: Inter Medium, 16px, Slate-700

### Implementation Steps
1. Get Figma node code using get_design_context tool
2. Convert exported Tailwind classes to match project patterns
3. Use SectionHeader component for section titles
4. Follow spacing and color conventions

---

## 12. Implementation Rules

### For New Components
1. Use Tailwind utility classes ONLY
2. Follow typography scale defined above
3. Use design tokens (CSS variables or Tailwind)
4. Respect 4px spacing grid
5. Mobile-first (375px width)
6. Always include focus states: `outline-none focus:border-[#30aba9]`
7. Default border: `border-slate-300/40`
8. Active state: `border-[#30aba9] bg-[#F0FDFC]`

### Component Naming
- Use PascalCase for component files
- Keep components focused and reusable
- Extract repeated patterns into components

### Type Safety
- Use TypeScript interfaces for all props
- Define component prop types explicitly
- Avoid `any` types

---

## 13. Accessibility

### Focus States
All interactive elements must have focus indicators:
```tsx
className="outline-none focus:border-[#30aba9]"
```

### Labels & Semantics
- Use `<label>` for form inputs
- Mark required fields with `*`
- Use semantic HTML

---

## 14. Common Patterns

### Progress Bar
```tsx
<div className="h-1.5 bg-slate-200">
  <div className="h-full bg-[#30aba9] w-1/3 transition-all"></div>
</div>
```

### Summary Card
```tsx
<div className="bg-white rounded-xl p-4 mb-4">
  <div className="space-y-3">
    {/* Items with consistent spacing */}
  </div>
</div>
```

### Helper Text
```tsx
<p className="text-xs text-slate-500 mt-2">Helper text</p>
```

---

## 15. Future Enhancements

- [ ] Form validation (Zod/Yup)
- [ ] State management if needed
- [ ] Unit tests (Vitest)
- [ ] Dark mode support
- [ ] Expanded component library

---

*Last Updated: November 2025*
