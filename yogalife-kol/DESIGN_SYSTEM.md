# Yogalife Kolkata design system

Live reference: `/design-system`. This component preview is noindex. The home page `/` contains the public Yogalife hero, with its own SEO metadata and WhatsApp enquiry links.

## Direction

Traditional Indian warmth with contemporary simplicity. Premium through proportion, typography and space. Organic illustration, clear language and gentle interaction. Welcome beginners without promising medical outcomes.

## Tokens and decisions

- Colour area target: 60% white `#ffffff`, 30% cream `#fcf4e8`, 10% forest `#234d3c`. This is composition guidance, not a literal pixel quota. Use green for actions and emphasis; avoid large dark panels.
- Commissioner via `next/font/google`, self-hosted by Next.js. Heading weights 500–700; body 400–500. H1 56–72 desktop / 36–44 mobile; H2 32–48; H3 24–32; body 16–18 at 1.65; small 14. Eyebrows are decorative 12px labels.
- Content width 1248px. Grid 4 columns below 640px, 8 from 640px, 12 from 1024px. Breakpoints: mobile <640, tablet 640, laptop 1024, desktop 1280, wide 1536. Navigation changes at 1024px.
- Section spacing 56px mobile, 64px tablet, 96px laptop, 104px desktop, 120px wide. Gutters 16/24/32px. Grid gaps 24/32px.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120px. Surface padding 16, 24 or 32. Default 24; feature 32.
- Left-align reading and discovery content. Center only short feedback moments. Prefer dividers and open rows over containers around every item.
- Radii: tag 6, input 8, button 10, card 12, feature 14, image 12, modal 12px. Organic arch silhouettes are illustration masks, not UI card radii.
- Soft outer and inset shadows replace prominent borders. Thin separators and visible focus outlines remain for clarity.

## Reuse

- `components/ui.tsx`: Button (primary, secondary, soft), Field, Icon (sm 16 / md 24 only), Skeleton. Secondary action is transparent, unboxed and underlined. Interactive hit areas are at least 44px.
- `components/sheet.tsx`: native dialog with focus containment, Escape, backdrop dismissal, scroll lock and focus restoration. Centered on desktop, bottom drawer below 640px.
- `components/date-picker.tsx`: controlled ISO date string, Today preset, direct year/month selectors, roving day focus and arrow/Home/End keys. Supported years 1900–2100. Date strings use local calendar dates, not UTC conversion. Business-specific booking limits should be added per use case.
- `components/navigation.tsx`: desktop mega navigation, persistent mobile bottom navigation, WhatsApp CTA using the existing client’s contact number.
- `components/loading-screen.tsx`: original vector illustration with a slow breathing animation. Used by `app/loading.tsx`. The playground preview closes automatically and is dismissible.
- `components/providers.tsx`: one browser QueryClient per mount, MotionConfig reduced-motion policy, Sonner toaster.
- `lib/use-programs.ts`: all current client API calls use TanStack Query, abort signals, response status checks and Zod parsing. Use useMutation for future writes, invalidation on success, and actionable errors. Do not put fetch calls in component effects.
- `lib/schemas.ts`: reusable Zod frontend enquiry validation and API response schemas. Future real submissions must validate on the server too. Current form is explicitly local validation only.
- `components/program-explorer.tsx`: API-backed fixture collection with search, category filter, sort, pagination, loading, empty, error and retry states. Filter changes reset pagination.

## Images, icons and motion

Use custom warm illustrations: cream, earth tones, soft sage and forest. `WellnessArt` is original SVG artwork, scalable without external image dependencies. Use Phosphor icons from `react-icons/pi`, choosing the `Thin` variants for a delicate, approximately 1px appearance at 16/24px. Use plain carets and an X for navigation and dismissal, without enclosing circles. No emoji icons or heavy strokes. Motion should clarify state; transitions around 220ms, slow breathing only for loading. Respect reduced motion in both CSS and Motion.

## SEO and content

Public pages should have unique descriptive titles and descriptions using yoga, Yogalife, Kolkata and wellness naturally. Use semantic sections, one H1, accessible controls and meaningful illustration labels. Add canonical URLs, Open Graph URLs, sitemap and business structured data only when the production domain and verified business details are known. Never index this component playground as a customer page.

## Validation

Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Review at 390px and 1440px. Check mega menu keyboard navigation, dialog focus return, Today/year/month/date selection, field errors, query retry and empty results, pagination and reduced-motion behavior.

## Notice & events timeline

`components/notices-events.tsx` is the homepage’s second section, styled in `app/updates.css`. Open timeline rows replace boxed cards. Dates retain their original precision: month-only notices never invent a day; unpublished event dates show “Dates TBA.” Past events are explicitly archived and do not offer registration.

The existing public Google Sheets feeds are read through `/api/notices-events`; the browser uses TanStack Query and Zod response validation. `lib/event-feed.ts` handles CSV parsing, plain-text descriptions, safe HTTPS registration links, dates and ordering. A verified feed snapshot supplies fallback content if either published feed is unavailable; the UI identifies saved updates and offers refresh. Today is calculated in Asia/Kolkata. The section supports notice/event filters, search, sort, pagination beyond four entries, skeletons, retry and empty states. Details open in the shared desktop sheet/mobile drawer; registration links open externally without submitting anything.

Parser checks: `node --experimental-strip-types --test tests/event-feed.test.mjs`.

## Home hero

Below 768px the illustration sits above the text, using a viewport-aware image height and compact spacing. The primary CTA is full-width and visible immediately; mobile skips the desktop entrance timeline. Native markup is visible by default, with desktop animation states applied only when that sequence runs.

The intro headline starts at the center of the visible area between the header and mobile bottom navigation, up to 1.55 times its final size (clamped to fit the screen). Its scale and position animate together into the existing left-column placement before the supporting-content sequence begins.

Hero entrance uses one Motion timeline: centered word-by-word opacity/blur reveal (0.1–1.1s), headline movement into the left column (1.35–2.25s), supporting text and illustration rising into view (2.25–3.15s), CTA reveal (3.2s), button expansion (3.65s), arrow reveal (4.05s), then reassurance/footer. The final layout is reserved throughout. Resizing settles the sequence immediately; reduced-motion preference shows the completed layout without the entrance sequence.

Desktop mega menus open on mouse hover or button activation; active chevrons rotate 180 degrees over 220ms. Leaving the header/menu region, clicking outside or pressing Escape dismisses them. Program uses a centered floating white surface capped at 80rem (max-w-7xl / 1280px), with cream illustrated side panels and central TTC summaries. The desktop panel has no internal scroll container; compact spacing on shorter screens keeps options visible. Mobile keeps the scrollable bottom drawer.

Homepage navigation: 80px desktop header from 1024px; 60px below that breakpoint. The public logo and scroll shadow remain. Top-level items are Home, About, Program, Resources and Contact Us, with no header CTA. Program uses a three-column desktop mega menu and a scrollable mobile drawer; TTC contains 200hr, 500hr and 1000hr options. Resources contains Blog and Gallery. Current destinations use information sheets with an optional team enquiry link; dedicated content pages have not yet been built. `lib/navigation-data.ts` holds the program labels.

`components/home-hero.tsx` follows the supplied split-layout reference, using Commissioner, forest green actions and a warm lotus meditation illustration. `components/home-navigation.tsx` supplies desktop mega navigation, mobile bottom navigation and responsive information sheets. `app/home.css` scopes homepage styling. Contact actions open WhatsApp; no enquiry is submitted automatically. The reassurance row uses values rather than unverified review statistics.

Artwork: `public/images/yogalife-meditation.webp`, created with the built-in imagegen tool and optimized to a transparent 1100 × 1100 WebP (approximately 288 KiB).

Generation prompt: Create one premium editorial illustration asset for Yogalife Kolkata's yoga website hero, transparent background. No text, typography, borders, UI or watermark. Center an Indian adult woman in seated cross-legged meditation, eyes closed, dark hair in a loose bun, cream kurta-style sleeveless yoga top and flowing earthy sand trousers. Sophisticated gouache and softly shaded editorial illustration, warm light, realistic anatomy and subtle paper texture. Behind her, a cream #fcf4e8 lotus silhouette with subtle sage accents. Muted terracotta and sage botanical sprigs on either side. Traditional Indian influence with minimal contemporary composition; small forest green #234d3c details, oatmeal and ivory. Centered, approximately square, no cropped leaves or limbs. Finished illustration only, without a surrounding webpage.
