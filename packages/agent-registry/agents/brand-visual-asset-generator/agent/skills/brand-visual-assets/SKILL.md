---
name: brand-visual-assets
description: Plan and coordinate brand-aligned SVG asset packs for SaaS and digital products. Use when scoping icons, empty states, hero illustrations, badges, feature graphics, onboarding visuals, changelog art, or dashboard/modal visuals from brand context.
---

# Brand visual asset packs

## When to load
Load before planning or scoping an asset pack from a domain, product description,
or brand profile.

## Default pack for a feature launch
When the user asks for a "visual pack" or "feature launch assets" without listing
items, propose:
1. One hero illustration for the feature page
2. Three matching feature icons
3. One dashboard empty state
4. One "new feature" badge
5. One onboarding visual for the in-app flow

Adjust the pack when the user names specific asset types or channels.

## Brand extraction checklist
From Context.dev (or the user's brand profile), capture:
- Primary and secondary colors (hex)
- Neutral/background tones
- Typography personality (geometric, humanist, monospace accents)
- Logo treatment constraints (wordmark only, symbol allowed, do-not-distort rules)
- Product category and audience (B2B SaaS, developer tools, consumer app)
- Tone adjectives (friendly, precise, enterprise, playful)

## Per-asset brief template
For each asset delegated to `svg-generator`, include:
- `assetType`: icon | empty-state | hero | badge | feature-graphic | onboarding |
  changelog | dashboard-modal
- `filename`: kebab-case suggestion ending in `.svg`
- `purpose`: one sentence on where it ships
- `dimensions`: viewBox or aspect ratio (for example 1200x630 hero, 24x24 icon)
- `palette`: named colors with hex values from brand data
- `subject`: what to depict
- `text`: exact copy if the SVG includes text
- `styleNotes`: stroke weight, corner radius, illustration density, metaphors to
  use or avoid
- `constraints`: must use `currentColor`, no gradients, dark-mode safe, and so on

## Consistency rules across a pack
- Reuse the same stroke width scale and corner radius family across icons.
- Limit palette to brand primaries plus one accent and neutrals.
- Keep character or device metaphors consistent between hero, onboarding, and empty
  states.
- Badge and icon geometry should feel like the same design system.

## Delegation pattern
1. Finish brand extraction and pack planning first.
2. Call `svg-generator` once per asset with a self-contained brief in `message`.
3. Parallelize independent assets (for example three icons) in one turn.
4. Regenerate individual assets that drift from the pack; do not regenerate the
   whole pack unless the brand brief changed.

## Output quality bar
Reject subagent output that:
- is not valid SVG;
- uses raster embeds without approval;
- introduces off-brand colors;
- includes invented logos or claims;
- omits `viewBox` or accessibility labels on meaningful graphics.
