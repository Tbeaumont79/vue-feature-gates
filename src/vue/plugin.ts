import { type App, reactive } from "vue";
import type { FeatureFlagsShape } from "../core/types";
import { createFeatureFlagController } from "../core/createFeatureFlagController";
import { FEATURE_FLAGS_KEY } from "./constants";

export function createFeatureFlags<T extends FeatureFlagsShape>(flags: T) {
	const state = reactive({ ...flags }) as T;
	const manager = createFeatureFlagController(state);
	return {
		install(app: App) {
			app.provide(FEATURE_FLAGS_KEY, manager);
		},
	};
}
