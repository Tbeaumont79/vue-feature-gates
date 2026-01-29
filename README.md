# 🚀 vue-feature-gates

Lightweight, type-safe feature flags for Vue 3 with **optional Pinia persistence**.

[![npm version](https://img.shields.io/npm/v/vue-feature-gates.svg)](https://www.npmjs.com/package/vue-feature-gates)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- **Type-safe** - Full TypeScript support with generics
- **Lightweight** - Zero dependencies (Pinia optional)
- **Reactive** - Built on Vue 3's reactivity system
- **Persistence** - Optional localStorage/sessionStorage via Pinia
- **Cross-tab sync** - Real-time synchronization across browser tabs
- **Simple API** - Easy to use composable and plugin
- **Production ready** - No `any` types, fully tested

## Installation

```bash
npm install vue-feature-gates
```

### With Persistence (Optional)

If you want to persist feature flags to localStorage:

```bash
npm install vue-feature-gates pinia
```

## Quick Start

### Basic Usage (No Persistence)

```typescript
// main.ts
import { createApp } from "vue";
import { createFeatureFlags } from "vue-feature-gates";
import App from "./App.vue";

const app = createApp(App);

app.use(
	createFeatureFlags({
		newDashboard: false,
		betaMode: false,
		darkTheme: true,
	}),
);

app.mount("#app");
```

### With Pinia Persistence

```typescript
// main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createFeatureFlags } from "vue-feature-gates";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

// Install Pinia first
app.use(pinia);

// Install feature flags with persistence
app.use(
	createFeatureFlags(
		{
			newDashboard: false,
			betaMode: false,
			darkTheme: true,
		},
		{
			pinia,
			storage: {
				enabled: true,
				storageKey: "my-app-feature-flags",
				storage: localStorage, // or sessionStorage
			},
		},
	),
);

app.mount("#app");
```

## Usage in Components

### Using the Composable

```vue
<template>
	<div>
		<!-- Conditionally render components based on flags -->
		<DashboardV2 v-if="flags.newDashboard" />
		<DashboardV1 v-else />

		<!-- Show beta features -->
		<BetaBanner v-if="flags.betaMode" />

		<!-- Toggle flags -->
		<button @click="toggleDashboard">
			{{ flags.newDashboard ? "Use Old Dashboard" : "Try New Dashboard" }}
		</button>
	</div>
</template>

<script setup lang="ts">
import { useFeatureFlags } from "vue-feature-flags";

const { flags, enable, disable, set } = useFeatureFlags<{
	newDashboard: boolean;
	betaMode: boolean;
	darkTheme: boolean;
}>();

const toggleDashboard = () => {
	set("newDashboard", !flags.newDashboard);
};

// Or use convenience methods
const enableBeta = () => enable("betaMode");
const disableBeta = () => disable("betaMode");
</script>
```

### Feature Flag Control Panel Example

```vue
<template>
	<div class="feature-flags-panel">
		<h3>Feature Flags Control</h3>
		<div v-for="(value, key) in flags" :key="key" class="flag-control">
			<label>
				{{ key }}
				<input type="checkbox" :checked="value" @change="set(key, !value)" />
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFeatureFlags } from "vue-feature-flags";

const { flags, set } = useFeatureFlags();
</script>
```

## API Reference

### `createFeatureFlags(flags, options?)`

Creates the Vue plugin for feature flags.

**Parameters:**

- `flags`: `Record<string, boolean>` - Initial feature flag values
- `options?`: `FeatureFlagOptions` - Optional configuration

**Options:**

```typescript
interface FeatureFlagOptions {
	// Optional Pinia instance for persistence
	pinia?: Pinia;

	// Storage configuration
	storage?: {
		enabled?: boolean; // Enable persistence (default: false)
		storageKey?: string; // localStorage key (default: 'vue-feature-flags')
		storage?: Storage; // Storage API (default: window.localStorage)
	};
}
```

**Example:**

```typescript
app.use(
	createFeatureFlags(
		{ newDashboard: false },
		{
			pinia,
			storage: {
				enabled: true,
				storageKey: "my-app-flags",
			},
		},
	),
);
```

### `useFeatureFlags<T>()`

Composable to access and control feature flags.

**Returns:**

```typescript
{
  flags: T;                                    // Reactive flags object
  isEnabled: (key: keyof T) => boolean;       // Check if flag is enabled
  set: (key: keyof T, value: boolean) => void; // Set flag value
  enable: (key: keyof T) => void;             // Enable a flag
  disable: (key: keyof T) => void;            // Disable a flag
}
```

**Example:**

```typescript
const { flags, enable, disable, set, isEnabled } = useFeatureFlags<{
	newDashboard: boolean;
	betaMode: boolean;
}>();

// Check flag
if (isEnabled("newDashboard")) {
	console.log("New dashboard is enabled!");
}

// Enable/disable
enable("betaMode");
disable("betaMode");

// Set directly
set("newDashboard", true);

// Access reactive flags
console.log(flags.newDashboard); // true
```

## Persistence

When you provide a Pinia instance and enable storage, feature flags automatically:

- **Save to localStorage** on every change
- **Load from localStorage** on app initialization
- **Sync across tabs** in real-time via storage events

**Example with sessionStorage:**

```typescript
app.use(
	createFeatureFlags(
		{ temporaryFeature: false },
		{
			pinia,
			storage: {
				enabled: true,
				storage: sessionStorage, // Cleared when tab closes
			},
		},
	),
);
```

## Real-World Example

Here's a complete example showing A/B testing for a new dashboard:

```typescript
// main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createFeatureFlags } from "vue-feature-gates";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(
	createFeatureFlags(
		{
			newDashboard: false,
			advancedCharts: false,
			exportPDF: true,
		},
		{
			pinia,
			storage: {
				enabled: true,
				storageKey: "analytics-app-flags",
			},
		},
	),
);

app.mount("#app");
```

```vue
<!-- Dashboard.vue -->
<template>
	<div>
		<!-- A/B test: New vs Old Dashboard -->
		<DashboardV2 v-if="flags.newDashboard" />
		<DashboardV1 v-else />

		<!-- Conditional features -->
		<AdvancedCharts v-if="flags.advancedCharts" />
		<ExportButton v-if="flags.exportPDF" format="pdf" />
	</div>
</template>

<script setup lang="ts">
import { useFeatureFlags } from "vue-feature-flags";
import DashboardV1 from "./DashboardV1.vue";
import DashboardV2 from "./DashboardV2.vue";
import AdvancedCharts from "./AdvancedCharts.vue";
import ExportButton from "./ExportButton.vue";

const { flags } = useFeatureFlags<{
	newDashboard: boolean;
	advancedCharts: boolean;
	exportPDF: boolean;
}>();
</script>
```

## Playground

Try the live playground:

```bash
cd playground
npm install
npm run dev
```

The playground demonstrates:

- Real-time flag toggling
- Conditional component rendering
- Persistence across page reloads
- Cross-tab synchronization

## TypeScript Support

Full TypeScript support with type inference:

```typescript
// Define your flags shape
interface AppFeatureFlags {
	newDashboard: boolean;
	betaMode: boolean;
	darkTheme: boolean;
}

// Type-safe everywhere
const { flags, set } = useFeatureFlags<AppFeatureFlags>();

set("newDashboard", true); // OK
set("invalidFlag", true); // Type error
set("darkTheme", "yes"); // Type error (must be boolean)
```

## Architecture

```
src/
├── types/          # TypeScript type definitions
├── stores/         # Pinia store factory
├── plugins/        # Plugin & persistence logic
├── composables/    # useFeatureFlags composable
├── utils/          # Constants & utilities
└── core/           # Core controller (framework-agnostic)
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Thibault Beaumont](https://github.com/Tbeaumont79)

## Links

- [GitHub Repository](https://github.com/Tbeaumont79/vue-feature-gates)
- [NPM Package](https://www.npmjs.com/package/vue-feature-gates)
- [Issue Tracker](https://github.com/Tbeaumont79/vue-feature-gates/issues)

---

**Made with ❤️ for the Vue.js community**
