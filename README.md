# vue-feature-gates

Lightweight, type-safe feature flags for Vue 3.

**vue-feature-gates** allows you to control feature visibility at runtime in your Vue 3 applications. Instead of using environment variables or config files that require rebuilds, you can toggle features dynamically—perfect for progressive rollouts, A/B testing, beta programs, or environment-based configurations.

A simple and fully typed Vue 3 plugin to manage runtime feature flags, with a strong focus on TypeScript DX and clean architecture.

# Features

- Type-safe feature flags
- Lightweight
- Simple API and easy to use

# Installation

```bash
npm install vue-feature-gates
# or
pnpm install vue-feature-gates
```

# Usage

## Install the plugin

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { createFeatureFlags } from "vue-feature-gates";

const app = createApp(App);
app.use(
	createFeatureFlags({
		feature1: true,
		feature2: false,
	}),
);
app.mount("#app");
```

## Use the plugin in a component

```vue
<template>
	<div v-if="isEnabled('feature1')">Feature 1 is enabled</div>
</template>

<script setup lang="ts">
import { useFeatureFlags } from "vue-feature-gates";

// You can now destructure methods directly!
const { isEnabled, set } = useFeatureFlags();
</script>
```

# API

### `createFeatureFlags(flags)`

Creates a type-safe feature flags instance to be installed in the Vue app.

```ts
createFeatureFlags<T extends Record<string, boolean>>(flags: T);
```

### `useFeatureFlags()`

Returns the feature flag controller. Supports generic typing and safe destructuring.

```ts
const { isEnabled, set, enable, disable, flags } = useFeatureFlags();
```

#### Methods

- `isEnabled(key: string): boolean` - Check if a flag is enabled
- `set(key: string, value: boolean): void` - Set a flag value manually
- `enable(key: string): void` - Enable a flag
- `disable(key: string): void` - Disable a flag

# Type safety

Type inference is based on the object passed to `createFeatureFlags`.

```ts
const flags = createFeatureFlags({
	feature1: true,
	feature2: false,
});

// flags.flags is typed!
```

`isEnabled` method will only accept `feature1` and `feature2` as arguments.

```ts
const { isEnabled } = useFeatureFlags();

isEnabled("feature1"); // boolean
isEnabled("feature2"); // boolean
isEnabled("feature3"); // TS Error
```

# Architecture

- **Framework-agnostic TypeScript core**
- **Vue plugin as an adapter layer**
- **Composable API for runtime access**

This separation ensures:

- Better testability
- Easier evolution (remote flags, CLI, SSR, etc.)
- Clean and maintainable architecture

# What's New in v0.1.1

- **Factory Implementation**: Replaced `FeatureFlagManager` class with `createFeatureFlagController` factory function for better tree-shaking and functional style.
- **Destructuring Support**: You can now safely destructure `isEnabled`, `set`, etc. from `useFeatureFlags()` without losing the `this` context.
- **Improved Typing**: Enhanced internal type safety using Vue's `InjectionKey`.

# Development

```bash
 pnpm install
 pnpm run dev
```

A local vue playground is included to test the plugin in real conditions.

# Roadmap

- [ ] v-feature directive
- [ ] Async / remote feature flags
- [ ] SSR support
- [ ] Feature flags CLI
- [ ] Persistence (localStorage, cookies)

# Contributing

Contributions, issues, and feature requests are welcome !

# Why this project ?

This project focus on :

- Clean API design
- Strong typeScript guarantees
- Separation of concerns
- Developer experience (DX)

It is intentionally small in scope to remain easy to understand and extend.

# License

MIT
