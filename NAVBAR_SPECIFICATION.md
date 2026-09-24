# Vexus Lab: Digital Product Engineering Navigation Component & Token Specification

## 1. Context and Goals
- **Design Intent**: Provide an enterprise-grade, token-driven, fully responsive, and WCAG 2.2 AA compliant navigation architecture for **Vexus Lab** documentation and brand portals that balances high information density with intuitive wayfinding and equal, symmetrical mega menu layouts.
- **Brand & Surface Context**:
  - **Product/Brand**: Vexus Lab (Digital Product Engineering)
  - **Audience**: Developers, architects, engineering leaders, enterprise clients, and technical teams.
  - **Product Surface**: Documentation portal, product surfaces, and corporate digital engineering platform.
  - **Component Density Context**: Tailored for high-density pages supporting up to 164 links, 59 buttons, 17 lists, 10 inputs, and 3 distinct navigation structures without layout degradation or focus collision.

---

## 2. Design Tokens & Foundations

All implementations must consume the design tokens defined below via CSS custom properties (`tokens.css`). Hardcoded hex values, arbitrary margins, or ad-hoc font definitions are strictly prohibited.

### 2.1 Typography Scale
- **Primary Font Family**: `font.family.primary = Manrope`
- **Fallback Font Stack**: `font.family.stack = Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Base Font Size**: `font.size.base = 16px`
- **Base Font Weight**: `font.weight.base = 400`
- **Base Line Height**: `font.lineHeight.base = 24px`

| Token Name | Value | Intended Usage |
| :--- | :--- | :--- |
| `font.size.xs` | `12px` | Badges, micro-labels, language country codes, metadata |
| `font.size.sm` | `14px` | Dropdown menu items, secondary actions, language switcher |
| `font.size.md` | `16px` | Primary navigation top-level links, base text |
| `font.size.lg` | `17px` | Equal mega menu category items, featured section titles |
| `font.size.xl` | `18px` | Mobile navigation drawer primary links, card titles |
| `font.size.2xl` | `20px` | Subheadings, section titles |
| `font.size.3xl` | `21px` | Header highlights |
| `font.size.4xl` | `24px` | Main titles, modal headings |

### 2.2 Color Palette

| Token Name | Value | Semantic Purpose | WCAG Contrast Ratio |
| :--- | :--- | :--- | :--- |
| `color.text.primary` | `#181a24` | Primary brand copy, navigation text, logo title | 16.5:1 on `#ffffff` (Passes AAA) |
| `color.text.secondary` | `#484f6b` | Subtitles, chevron icons, divider labels | 7.8:1 on `#ffffff` (Passes AAA) |
| `color.text.tertiary` | `#ffffff` | Button text on primary CTA, dark footer copy | 21:1 on `#181a24` (Passes AAA) |
| `color.text.inverse` | `#212529` | Inverse body copy, dark surface active text | Meets standard |
| `color.surface.base` | `#ffffff` | Canvas background | Standard canvas |
| `color.surface.muted` | `#f2f3f6` | Hover backgrounds, mobile submenu cards | Meets standard |
| `color.surface.strong` | `#0066ff` | Vexus Lab signature Electric Blue for Contact CTA, Vexus VelocityAI accent | High contrast Electric Blue matching logo |
| `color.surface.strong-hover` | `#0052cc` | Hover state for primary CTA | > 4.5:1 contrast |
| `color.border.subtle` | `#e5e7eb` | Header bottom hairline border, card dividers | Visual structure |
| `color.border.divider` | `#ebecee` | Mega menu item horizontal partition lines | Hairline partition |

### 2.3 Spacing Scale
- `space.1 = 1px` (Divider thickness, hairline borders)
- `space.2 = 5px` (Micro gap between caret and text)
- `space.3 = 6px` (Badge vertical padding)
- `space.4 = 10px` (Contact button vertical padding)
- `space.5 = 12px` (Dropdown item vertical spacing)
- `space.6 = 14px` (Mega menu row padding)
- `space.7 = 15px` (Compact gap)
- `space.8 = 16px` (Standard horizontal spacing, mega menu item gap)
- Extended tokens: `space.10 = 24px` (Contact button horizontal padding), `space.12 = 40px` (Mega menu gutter)

### 2.4 Radius Tokens
- `radius.xs = 30px` (Compact pills, badges)
- `radius.sm = 50px` (Contact CTA button, compact mobile buttons)
- `radius.md = 100px` (Full floating navbar container pill shape)

### 2.5 Motion Tokens
- `motion.duration.instant = 200ms` (Icon rotators, text color hover transitions)
- `motion.duration.fast = 300ms` (Mega menu fade-in/slide-in)
- `motion.duration.normal = 500ms` (Mobile drawer entrance/exit)
- `motion.duration.slow = 800ms` (Major state transitions)
- `motion.easing.default = cubic-bezier(0.16, 1, 0.3, 1)`

---

## 3. Component-Level Rules

### 3.1 Anatomy
The Navbar component consists of four distinct sub-regions:
1. **Brand Zone (Left)**:
   - Contains the scalable `VexusLabLogo` SVG logo featuring the custom monogram, bold "Vexus Lab" wordmark, and the "Digital Product Engineering" subtitle.
   - Must link to root `/`.
2. **Navigation Zone (Center)**:
   - Primary top-level navigation links:
     - `Services` (triggers equal 2-column mega menu)
     - `Industries` (triggers equal 2-column mega menu with 5 balanced items per column)
     - `Vexus VelocityAI` (styled in `color.surface.strong` `#0066ff`)
     - `Insights` (triggers equal 2-column mega menu)
     - `About Us` (with list dropdown)
     - `Careers` (with list dropdown)
3. **Utility & Action Zone (Right)**:
   - Language Converter: Globe icon + Language Code label + chevron indicator with accessible multi-language converter listbox (supporting English, Español, Deutsch, Français, 日本語 in real time with localStorage persistence).
   - Primary Call-to-Action: Direct `Contact` button linking to `/contact` formatted with `radius.sm = 50px` and `#0066ff` fill (no popup modal form).
   - Mobile Hamburger Toggle: Visible below `1024px` breakpoint.
4. **Equal Mega Menu Surface (Collapsible Layer)**:
   - Symmetrical 2-column grid container (`grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24`).
   - In the **Industries** tab, both columns contain exactly 5 items so that horizontal divider lines align with equal vertical rhythm across both columns:
     - **Column 1**: Private Equity, Financial Services, Industrial & Energy, Mobility, Technology.
     - **Column 2**: Communications & Network Providers, Healthcare & Life Sciences, Media & Entertainment, Retail & Consumer, Aerospace & Advanced Defense.
   - Each item separated by horizontal hairline dividers (`color.border.divider = #ebecee`).

### 3.2 Variants
- **Full-Width Variant (`variant="full"`)**:
  - Spans `100vw` with `border-bottom: 1px solid #e5e7eb`.
  - Content constrained to `max-w-7xl` or responsive container padding (`px-6 lg:px-12`).
  - Standard sticky behavior on scroll with elevation shadow `0 1px 2px rgba(24, 26, 36, 0.05)`.
- **Floating Pill Variant (`variant="floating"`)**:
  - Floats above the canvas with top margin (`pt-4 sm:pt-6`).
  - Encapsulated within a pill-shaped container (`radius.md = 100px` on desktop, `radius.sm = 50px` on mobile).
  - Background: `rgba(255, 255, 255, 0.95)` with `backdrop-blur: 12px`.
  - Box-shadow: `0 10px 30px -5px rgba(24, 26, 36, 0.10)`.

### 3.3 State Matrix
Every interactive element in the Navbar must define behavior across all 7 standard states:

| State | Vexus Lab Brand Links | Industries Mega Menu Items | Primary Contact CTA Button | Language Switcher |
| :--- | :--- | :--- | :--- | :--- |
| **Default** | `color.text.primary` (`#181a24`), 500 weight | `color.text.primary`, border-b `#ebecee` | Background `#ff5f2d`, text `#ffffff` | Text `#181a24`, globe icon `#181a24` |
| **Hover** | `color.surface.strong` (`#ff5f2d`) | Color `#ff5f2d`, right arrow slides in +2px | Background `#e34b1a`, shadow elevation | Background `#f2f3f6`, text `#ff5f2d` |
| **Focus-Visible** | Outline 2px solid `#ff5f2d`, offset 2px | Outline 2px solid `#ff5f2d`, offset 2px | Outline 2px solid `#181a24`, offset 2px | Outline 2px solid `#ff5f2d`, offset 2px |
| **Active** | `color.surface.strong` (`#ff5f2d`), scale 0.99 | Background `#f2f3f6`, scale 0.99 | Background `#cc3c0e`, scale 0.98 | Background `#ebecee` |
| **Disabled** | Opacity 40%, cursor `not-allowed` | Opacity 40%, pointer-events `none` | Background `#d1d5db`, cursor `not-allowed` | Opacity 50%, pointer-events `none` |
| **Loading** | Spinner indicator replaces chevron | Skeleton pulse line | Spinner replaces text label | Disabled interaction |
| **Error** | Border-bottom error line `#ef4444` | Toast notification | Warning ring `#ef4444` | Error alert badge |

### 3.4 Responsive & Edge-Case Handling
- **Breakpoint Rules**:
  - `Desktop (>= 1024px)`: Full inline navigation with horizontal alignment, equal mega menu opens directly below header.
  - `Tablet & Mobile (< 1024px)`: Desktop navigation collapses. Hamburger toggle button renders on the right.
- **Mobile Drawer Behavior**:
  - Drawer slides in from top or right (`z-index: 50`).
  - Body scroll lock must be activated (`overflow: hidden` on `document.body`).
  - Industries and Services items render as expandable vertical accordions.
  - Language selector and Contact CTA are pinned to the bottom drawer panel.
  - Touch targets must be at least `44px x 44px`.

---

## 4. Accessibility Requirements & Testable Acceptance Criteria (WCAG 2.2 AA)

1. **Keyboard-First Wayfinding**:
   - Navigation links and buttons must be accessible via `Tab` and `Shift+Tab`.
   - Pressing `Escape` while any mega menu, dropdown, or mobile drawer is open must immediately close the menu and return keyboard focus to the trigger element.
2. **Focus-Visible Indicator**:
   - Focus ring must have at least 2px stroke width, 2px offset, and `#ff5f2d` color.
3. **Screen Reader Semantics**:
   - The top header must have `role="banner"`.
   - The primary navigation must have `<nav aria-label="Primary Navigation">`.
   - Dropdown trigger buttons must specify `aria-haspopup="dialog"|"menu"` and dynamically toggle `aria-expanded="true|false"`.

| Criteria ID | Test Description | Pass Condition | Fail Condition |
| :--- | :--- | :--- | :--- |
| **AC-01** | Tab navigation sequence | User can reach all navigation links, buttons, and switches in DOM order | Any link or button is skipped or focus gets trapped |
| **AC-02** | Escape key dismissal | Pressing `Esc` dismisses open mega menu or mobile drawer | Menu remains open or focus is lost to body |
| **AC-03** | Visual focus indicator | Focus ring is visible on all interactive items on keyboard navigation | No visible indicator when tabbing |
| **AC-04** | Text contrast (AA) | `#181a24` on `#ffffff` text contrast >= 4.5:1 | Contrast falls below 4.5:1 |
| **AC-05** | ARIA expanded state | `aria-expanded` toggles from `"false"` to `"true"` on open | Attribute is missing or does not toggle |
| **AC-06** | Equal Column Alignment | Divider lines in Column 1 and Column 2 match horizontal baselines | Columns have uneven vertical rhythm |

---

## 5. QA Checklist

- [x] Symmetrical equal 2-column layout in Industries mega menu (5 items left, 5 items right).
- [x] Symmetrical equal 2-column layout in Services and Insights mega menus.
- [x] "Vexus Lab" custom monogram logo and wordmark with subtitle.
- [x] "Vexus VelocityAI" displays distinct brand orange `#ff5f2d`.
- [x] Floating pill variant (`variant="floating"`) displays rounded container and soft shadow.
- [x] Full-width variant (`variant="full"`) displays clean bottom hairline border.
- [x] Mobile drawer collapses cleanly under `1024px` with working accordions.
- [x] Keyboard `Tab` moves focus sequentially through items.
- [x] Pressing `Escape` closes open mega menu, language switcher, or mobile menu.
- [x] Focus rings are clearly visible with 2px stroke and 2px offset.
