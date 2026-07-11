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

- **`App.tsx`** is the sole owner of state (`activeTab`, `appointments`). It renders exactly one of four screens based on `activeTab` via plain conditional JSX (no `react-navigation`), plus a persistent `BottomTabBar`. All data and callbacks are passed down as props — there is no context, store, or global state.
- **`components/`** — one file per screen (`HomeScreen`, `ServicesScreen`, `ScheduleScreen`, `ProfileScreen`) plus `BottomTabBar`. Screens are presentational: they receive data and callbacks as props and don't fetch or own state themselves. `BottomTabBar` exports the `TabKey` union type that `App.tsx` uses to drive which screen is shown.
- **`data/mockData.ts`** is the single source of truth for domain types (`Service`, `Appointment`, `Customer`, etc.) and seed data (`services`, `initialAppointments`, `customer`). There is no API layer yet — booking a service in `App.tsx` (`handleBookService`) just prepends a new item to local `appointments` state.
- Styling is done per-component with `StyleSheet.create`, no shared theme/design-system file — colors (greens: `#2E7D32`, `#1B4332`, etc.) are repeated inline per screen.
