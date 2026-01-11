import { type App, reactive } from "vue";
import type { FeatureFlagsShape } from "../core/types";
import { FeatureFlagManager } from "../core/featureFlagManager";
import { FEATURE_FLAGS_KEY } from "./constants";

export function createFeatureFlags<T extends FeatureFlagsShape>(flags: T) {
	const state = reactive({ ...flags }) as T;
	const manager = new FeatureFlagManager(state);
	return {
		install(app: App) {
			app.provide(FEATURE_FLAGS_KEY, manager);
		},
	};
}
