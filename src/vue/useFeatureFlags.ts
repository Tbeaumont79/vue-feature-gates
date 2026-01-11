import { inject } from "vue";
import type { FeatureFlagsShape } from "../core/types";
import { FeatureFlagManager } from "../core/featureFlagManager";
import { FEATURE_FLAGS_KEY } from "./constants";

export function useFeatureFlags<
	T extends FeatureFlagsShape = FeatureFlagsShape
>() {
	const manager = inject<FeatureFlagManager<T>>(FEATURE_FLAGS_KEY);
	if (!manager) {
		throw new Error("FeatureFlags plugin not installed");
	}
	return manager;
}
