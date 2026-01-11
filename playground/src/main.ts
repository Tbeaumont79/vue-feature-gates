import { createApp } from "vue";
import App from "./App.vue";
import { createFeatureFlags } from "vue-feature-flags";
const app = createApp(App)

app.use(
	createFeatureFlags({
		newDashboard: false,
		betaMode: false,
	} as const)
);

app.mount("#app");
