# Design Guidelines for Elmond.org LMS Clone

## Design Approach

**Selected Approach:** Hybrid - Reference-based (Udemy/Coursera) + Material Design System

**Justification:** This is an e-commerce education platform requiring both trust-building visual appeal and functional utility. We'll draw inspiration from Udemy's clean course layouts and Coursera's professional aesthetic while maintaining Material Design's component consistency.

**Key Design Principles:**
- Trust and credibility through professional polish
- Clear information hierarchy for course discovery
- Seamless e-commerce flow (browse → cart → checkout)
- Dual user experience (students vs. instructors)

## Color Palette

### Light Mode
- **Primary Brand:** 174 100% 37% (Turquoise/Teal - used for CTAs, links, active states)
- **Primary Variant:** 174 100% 45% (Lighter teal for hovers)
- **Secondary Accent:** 204 70% 53% (Professional blue for trust elements)
- **Background:** 0 0% 100% (Pure white)
- **Surface:** 210 17% 98% (Subtle gray for cards)
- **Text Primary:** 220 13% 18% (Dark slate)
- **Text Secondary:** 220 9% 46% (Medium gray)
- **Success:** 142 71% 45% (Green for "Enroll" actions)
- **Warning:** 45 100% 51% (Orange for discounts/badges)
- **Error:** 0 84% 60% (Red for validation)

### Dark Mode
- **Background:** 220 13% 13% (Deep dark slate)
- **Surface:** 220 13% 18% (Elevated dark)
- **Primary:** 174 100% 45% (Brighter teal for contrast)
- **Text Primary:** 0 0% 95% (Off-white)
- **Text Secondary:** 220 9% 70% (Light gray)

## Typography

**Font Families:**
- **Primary:** 'Inter' from Google Fonts (headings, body, UI)
- **Secondary:** 'Space Grotesk' (featured headings, hero text)

**Scale:**
- Hero/Display: 3.5rem (56px) - Space Grotesk Bold
- H1: 2.5rem (40px) - Inter Bold
- H2: 2rem (32px) - Inter SemiBold
- H3: 1.5rem (24px) - Inter SemiBold
- H4: 1.25rem (20px) - Inter Medium
- Body: 1rem (16px) - Inter Regular
- Small: 0.875rem (14px) - Inter Regular
- Caption: 0.75rem (12px) - Inter Medium

**Line Heights:** 1.5 for body text, 1.2 for headings

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, 32
- Small gaps: p-2, gap-4
- Standard sections: py-12 (mobile), py-20 (desktop)
- Component padding: p-6 (cards), p-8 (modals)
- Large sections: py-24, py-32 (hero, major dividers)

**Container Widths:**
- Full-width sections: w-full with max-w-7xl mx-auto px-4
- Content sections: max-w-6xl
- Form containers: max-w-md
- Course detail sidebar: max-w-sm

**Grid Systems:**
- Course cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Categories: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Blog posts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Library

### Navigation
- Sticky header with white background, subtle shadow on scroll
- Logo (left), main menu (center), Login/Signup buttons (right)
- Mobile: Hamburger menu with slide-in drawer
- Categories dropdown with icon indicators

### Course Cards
- Featured image (16:9 aspect ratio)
- Category badge (top-left overlay)
- Discount badge (top-right, if applicable)
- Title (truncated to 2 lines)
- Duration, student count, rating row
- Price display: strikethrough original, bold discounted price
- "Add to Cart" button (outline) + hover state with filled background
- Hover: subtle lift (shadow-lg), slight scale (1.02)

### Hero Section (Homepage)
- Full-width carousel with multiple slides
- Each slide: Large background image (semi-transparent overlay), centered text, dual CTAs
- Slide controls: dots (bottom-center), arrows (sides)
- Height: 80vh on desktop, 60vh on mobile
- Text: White with subtle drop shadow for readability

### Buttons
- Primary: bg-primary text-white, rounded-lg px-6 py-3
- Secondary: border-2 border-primary text-primary, backdrop-blur when on images
- Sizes: sm (px-4 py-2 text-sm), md (default), lg (px-8 py-4 text-lg)
- States: hover (brightness increase), active (slight scale down), disabled (opacity-50)

### Forms
- Input fields: border-2 border-gray-300, rounded-lg, px-4 py-3
- Focus state: border-primary, ring-2 ring-primary/20
- Labels: text-sm font-medium mb-2
- Validation: error border-red-500, success border-green-500
- Dark mode: bg-surface text-white border-gray-700

### Course Detail Components
- Sticky sidebar (right): Course info card, pricing, enroll button
- Curriculum accordion: Expandable modules with lesson lists
- Free/Premium lesson indicators with lock icons
- Instructor card: Avatar, name, bio, credentials
- Review cards: Star rating, text, student info
- Certificate preview image

### Footer
- Multi-column layout (4 columns desktop, stack mobile)
- Newsletter signup form
- Social media icons
- Quick links (Categories, Courses, Blog, Contact)
- Legal links (Privacy, Terms, Cookie Policy)
- WhatsApp floating button (bottom-right, fixed)

## Page-Specific Guidelines

### Homepage
- **Sections (in order):**
  1. Hero carousel (3-4 slides, auto-rotate 5s)
  2. Premium Courses (4-8 course cards, category filter tabs)
  3. How It Works (4 steps, numbered icons, horizontal on desktop)
  4. Why Choose Us (4 feature cards with animated icons)
  5. Categories (8 category cards, grid layout)
  6. Upcoming Courses (carousel of upcoming course cards)
  7. FAQ (accordion, max 6 questions)
  8. Testimonials (carousel with 3 testimonials)

### Course Listing
- Left sidebar: Category filters (checkboxes), price range slider
- Top bar: Sort dropdown (Newest, Popular, Price), view toggle (grid/list)
- Course grid: 4 columns desktop, 2 tablet, 1 mobile
- Load more button or infinite scroll

### Course Detail
- Breadcrumb navigation (top)
- Course header: Title, category badge, rating, student count
- Two-column: Main content (left 2/3), sidebar (right 1/3 sticky)
- Tabs: Overview, Curriculum, Instructor, Reviews
- Sticky "Enroll Now" button (mobile bottom bar)

### Contact Page
- Two-column: Contact form (left), Info card (right)
- Info card: Phone (with icon), Email, Address
- Form fields: Name, Email, Subject, Message
- Map embed below form (optional, full-width)

### Auth Pages (Login/Signup)
- Centered card design with decorative background elements
- Logo at top
- Toggle between Instructor/User login (tab interface)
- Social login options (Google, Facebook icons)
- "Forgot Password" link
- Signup: Multi-step form with country dropdown, mobile field

## Images

### Homepage Hero Carousel
- **Slide 1:** Professional students using laptops in modern setting, vibrant learning environment
- **Slide 2:** Digital marketing graphics, analytics dashboard, modern workspace
- **Slide 3:** Medical professional with certification, healthcare learning theme
- **Overlay:** Dark gradient (bottom to top, 50% opacity) for text readability

### Course Cards
- Use course-specific imagery (16:9 ratio):
  - Digital Marketing: Social media icons, graphs, laptop screens
  - Medical Coding: Healthcare symbols, medical charts
  - Programming: Code snippets, terminal windows
  - Design: Creative tools, mockups

### Other Images
- How It Works: Custom illustrated icons (search, enroll, learn, certificate)
- Features: Animated GIFs or SVG illustrations (flexibility, trust, offline, self-paced)
- Instructor placeholders: Professional avatar or generic instructor icon
- Testimonials: Student photos or generic avatars

## Accessibility & Interactions

- All images have descriptive alt text
- Keyboard navigation for all interactive elements
- Focus indicators: 2px ring in primary color
- ARIA labels for icon-only buttons
- Color contrast ratio minimum 4.5:1
- Reduced motion support for animations
- Screen reader announcements for cart additions, form errors

## Animations

Use sparingly and purposefully:
- Page transitions: Fade in (300ms)
- Card hover: Transform scale + shadow (200ms ease-out)
- Accordion expand: Height animation (300ms ease-in-out)
- Button press: Scale down (100ms)
- Carousel slides: Slide + fade (500ms ease-in-out)
- Loading states: Skeleton screens or subtle pulse

## WhatsApp Integration
- Fixed button (bottom-right corner, z-50)
- Green circle with WhatsApp icon
- Hover: Slight bounce animation
- Click: Opens WhatsApp with pre-filled message

This design creates a professional, trustworthy LMS platform that balances visual appeal with functional efficiency, optimized for course discovery and enrollment conversion.