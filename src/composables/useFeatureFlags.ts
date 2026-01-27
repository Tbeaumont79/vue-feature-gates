import { inject } from "vue";
import type { FeatureFlagsShape, FeatureFlagController } from "../types";
import { FEATURE_FLAGS_KEY } from "../utils/constants";

/**
 * Composable to access feature flags
 * Works with both Pinia-based and simple reactive implementations
 */
export function useFeatureFlags<
	T extends FeatureFlagsShape = FeatureFlagsShape,
>(): FeatureFlagController<T> {
	const manager = inject(FEATURE_FLAGS_KEY);
	if (!manager) {
		throw new Error(
			"[vue-feature-gates] FeatureFlags plugin not installed. Did you forget to call app.use(createFeatureFlags(...))?",
		);
	}
	return manager as FeatureFlagController<T>;
}
