# vue-feature-gates

Lightweight, type-safe feature flags for Vue 3.

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
	})
);
app.mount("#app");
```

## Use the plugin in a component

```vue
<template>
	<div v-if="featureFlags.isEnabled('feature-1')">Feature 1 is enabled</div>
</template>

<script setup lang="ts">
import { useFeatureFlags } from "vue-feature-gates";

const featureFlags = useFeatureFlags();
</script>
```

# API

createFeatureFlags(flags)

It create a feature flags instance that can be used in the application.

```ts
createFeatureFlags<T extends Record<string, boolean>>(flags: T);
```

useFeatureFlags()

Returns the feature flag manager.

```ts
const flags = useFeatureFlags();
```

Methods:

- isEnabled(key: string): boolean
- set(key: string, value: boolean): void

# Type safety

Type inference is based on the object passed to createFeatureFlags.

```ts
const flags = createFeatureFlags({
	feature1: true,
	feature2: false,
});

flags.feature1; // boolean
flags.feature2; // boolean
```

isEnabled method would only accept feature1 and feature2 as arguments.

```ts
flags.isEnabled("feature1"); // boolean
flags.isEnabled("feature2"); // boolean
flags.isEnabled("feature3"); // Error
```

# Architecture

- Framework-agnostic TypeScript core

- Vue plugin as an adapter layer

- Composable API for runtime access

This separation ensures:

- better testability

- easier evolution (remote flags, CLI, SSR, etc.)

- clean and maintainable architecture

# Development

```bash
 pnpm install
 pnpm run dev
```

A local vue playground is included to test the plugin in real conditions.

# Roadmap

- v-feature directive

- Async / remote feature flags

- SSR support

- Feature flags CLI

- Persistence (localStorage, cookies)

# Contributing

Contributions, issues, and feature requests are welcome !

# License

MIT

# Why this project ?

This project focus on :

- Clean API design
- Strong typeScript guarantees
- Separation of concerns
- Developer experience (DX)

It is intentionally small in scope to remain easy to understand and extend.
