# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Important: actual Expo SDK in use is 54, not 57

AGENTS.md says to read the SDK 57 docs, but this project's dependencies are pinned to **Expo SDK 54** (`expo ^54.0.0`, `react-native 0.81.5`, `react 19.1.0`) because the user's installed Expo Go app only supports up to SDK 54. Do not upgrade `expo`/`react-native`/`react` back toward 57 to "match" AGENTS.md — confirm with the user first, since that previously caused a broken Expo Go connection.

## Commands

- `npm start` — start the Metro dev server (Expo CLI). Requires a real interactive terminal for the QR code to render; running it through a non-TTY tool falls back to plain text output.
- `npm run android` / `npm run ios` / `npm run web` — start the dev server targeting a specific platform.
- `npx tsc --noEmit` — type-check (there is no separate `typecheck` script).

There is no lint config, test runner, or build script configured in this repo yet.

## Architecture

This is a single-screen-stack Expo (React Native + TypeScript) app with no navigation library and no backend — everything is client-side, mock-data-driven.

- **`App.tsx`** is the sole owner of state (`activeTab`, `appointments`, `rewardAvailable`). It renders exactly one of five screens based on `activeTab` via plain conditional JSX (no `react-navigation`), plus a persistent `BottomTabBar`. All data and callbacks are passed down as props — there is no context, store, or global state.
- **`components/`** — one file per screen (`HomeScreen`, `ServicesScreen`, `ScheduleScreen`, `ProgressScreen`, `ProfileScreen`) plus `BottomTabBar` and the reusable `StarRating` control. Screens are presentational: they receive data and callbacks as props and don't fetch or own state themselves. `BottomTabBar` exports the `TabKey` union type that `App.tsx` uses to drive which screen is shown.
- **`data/mockData.ts`** is the single source of truth for domain types (`Service`, `Appointment`, `Customer`, `GardenZoneHealth`, etc.) and seed data (`services`, `initialAppointments`, `initialGardenZones`, `customer`). There is no API layer yet — booking a service in `App.tsx` (`handleBookService`) just prepends a new item to local `appointments` state.
- **`constants/theme.ts`** exports the shared pastel `colors` palette (all screens import from here instead of hardcoding hex values) plus `lawnHealthDisplay`, a label/color lookup keyed by `LawnHealthStatus` used to render health pills consistently on `HomeScreen` and `ProgressScreen`.
- **Loyalty/rewards loop**: `App.tsx` tracks a `rewardAvailable` boolean that flips true whenever total bookings (`appointments.length`) crosses a multiple of 5; it's surfaced as progress copy on `HomeScreen` and a redeemable toggle in `ServicesScreen`'s booking modal, and clears once redeemed (booked appointment gets `isFree: true`).
- **Customer rating vs. provider-set lawn health are two separate, one-directional flows** — don't conflate them. Customers rate a completed appointment via `StarRating` in `ScheduleScreen`, which writes `rating`/`comment` back onto that `Appointment` through `App.tsx`'s `handleRateAppointment`. Lawn health (`Appointment.lawnHealth` and the four-zone `initialGardenZones` shown on `ProgressScreen`) is provider-set, read-only seeded mock data — there's no UI for the customer (or provider) to edit it yet.
- **Retention messaging is UI-only** — there's no backend or `expo-notifications`, so the "we miss you" check-in is just an in-app banner on `HomeScreen` shown when there's no upcoming appointment, not a real push notification.

## Agent skills

### Issue tracker

Issues and specs live as local markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default canonical labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
