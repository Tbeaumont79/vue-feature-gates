import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createFeatureFlags } from "vue-feature-flags";

const app = createApp(App);
const pinia = createPinia();

// Install Pinia first
app.use(pinia);

// Install feature flags with Pinia and persistence
app.use(
	createFeatureFlags(
		{
			newDashboard: false,
			betaMode: false,
		} as const,
		{
			pinia,
			storage: {
				enabled: true,
				storageKey: "vue-feature-flags-demo",
			},
		},
	),
);

app.mount("#app");
