# Learnings - UI Optimization

## Conventions & Patterns

(Subagents will append findings here)

## [2026-01-28T00:00:00Z] Task 1: Contract.tsx color fix
- Replaced text-orange-500 with text-muted-foreground at lines 134, 153
- Pattern: Warning/prompt text uses muted-foreground for subtle styling
- Verified: grep confirms no text-orange remaining in Contract.tsx

## [2026-01-28T00:00:00Z] Task 3: NotFound.tsx color confirmation
- FuzzyText color `#ee9a00ff` confirmed as acceptable
- Theme primary: `oklch(0.67 0.16 58)` (amber)
- Current hex color already visually close to theme amber
- Reason: Canvas API cannot read CSS variables, current color pragmatic choice
- Alternative approaches (hardcode oklch or runtime reading) add complexity without significant benefit
- Decision: Keep current color, document as intentional exception to semantic color rule
- Pattern: Canvas-based components may use hex colors when CSS variables are not accessible

## [2026-01-28T00:00:00Z] Task 2: Preview.tsx Badge color fix
- Removed className overrides (bg-green-600, bg-orange-500) from Badge component
- Badge now uses variant system: default (primary/amber) and secondary (gray)
- Pattern: Use Badge variant prop instead of className for semantic styling
- Verified: grep confirms no bg-green/bg-orange remaining in Preview.tsx
- Build: TypeScript compilation and Vite build passed successfully

## [2026-01-28T00:00:00Z] Task 4: Home.tsx spacing and Grid adjustment
- Changed container padding from p-6 to py-8 px-6 (larger vertical spacing)
- Changed Grid from lg:grid-cols-3 to md:grid-cols-2 (2-column layout at medium screens)
- Increased card gap from gap-4 to gap-6 (consistent with other pages)
- Home page maintains full-width layout (no max-w constraint)
- Pattern: Landing pages use full width, content pages use max-w-4xl
- Build verification: ✅ Passed with no TypeScript errors

## [2026-01-28T00:00:00Z] Task 5: About.tsx spacing and max-width adjustment
- Changed container padding from p-6 to py-8 px-6 (larger vertical spacing)
- Added max-w-4xl mx-auto for content width constraint (896px centered)
- Changed skills Grid gap from gap-4 to gap-6 (consistent spacing)
- Pattern: Content pages use max-w-4xl for better readability on large screens
- Build verification: Passed successfully with no TypeScript errors

## [2026-01-28T00:00:00Z] Task 6: Contract.tsx spacing adjustment
- Changed all container padding from p-6 to py-8 px-6 (3 containers at lines 124, 143, 171)
- Changed max-width from max-w-[800px] to max-w-4xl (800px → 896px standard Tailwind)
- Changed Card gap from gap-4 to gap-6 (line 172)
- Pattern: Use Tailwind standard max-w-4xl instead of custom pixel values for consistency
- Build verification: ✓ TypeScript compilation successful, no errors

## [2026-01-28T00:00:00Z] Task 7: Preview.tsx spacing adjustment
- Changed container padding from p-6 to py-8 px-6 (larger vertical spacing)
- Changed max-width from max-w-[800px] to max-w-4xl (800px → 896px)
- Changed Card gap from gap-8 to gap-6 (unified spacing)
- Pattern: All content pages now use consistent py-8 px-6 max-w-4xl mx-auto
- Build verification: ✅ TypeScript compilation successful, no errors

## [$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Task 8: Global Verification Complete

### Terminal Verification Results
✅ `grep -r "text-orange" src/` → No matches (all hardcoded orange text colors removed)
✅ `grep -r "bg-green-" src/` → No matches (all hardcoded green backgrounds removed)
✅ `grep -r "bg-orange-" src/` → No matches (all hardcoded orange backgrounds removed)
✅ `pnpm run build` → Successful (TypeScript + Vite compilation passed)

### Changes Summary
**Wave 1 - Color Fixes:**
- Contract.tsx: text-orange-500 → text-muted-foreground (2 locations)
- Preview.tsx: Removed Badge className overrides, using variant system
- NotFound.tsx: Confirmed #ee9a00ff acceptable (Canvas API limitation)

**Wave 2 - Spacing & Layout:**
- Home.tsx: py-8 px-6, Grid md:grid-cols-2, gap-6 (full-width layout)
- About.tsx: py-8 px-6 max-w-4xl mx-auto, gap-6
- Contract.tsx: py-8 px-6 max-w-4xl mx-auto (3 containers), gap-6
- Preview.tsx: py-8 px-6 max-w-4xl mx-auto, gap-6

### Established Patterns
1. **Semantic Colors**: Use Tailwind/shadcn semantic tokens (text-muted-foreground, variant props)
2. **Page Spacing**: py-8 px-6 for all pages (larger vertical breathing room)
3. **Content Width**: max-w-4xl (896px) for content pages, full-width for landing pages
4. **Card Spacing**: gap-6 (1.5rem) unified across all pages
5. **Grid Layout**: Home uses md:grid-cols-2 for 2-column responsive layout

### Browser Verification Recommended
Manual browser testing recommended for:
- `/` - Verify full-width layout, 2-column Grid at md breakpoint
- `/about` - Verify max-w-4xl centering, increased spacing
- `/contract` - Verify warning text color (muted-foreground), max-w-4xl
- `/preview` - Verify Badge semantic colors, max-w-4xl
- `/nonexistent` - Verify FuzzyText color acceptable

### Success Criteria Met
✅ All hardcoded colors removed (except FuzzyText - documented exception)
✅ All pages use py-8 px-6 padding
✅ All content pages use max-w-4xl (except Home - full-width)
✅ All Card containers use gap-6
✅ Home Grid uses md:grid-cols-2
✅ Build passes with no errors
