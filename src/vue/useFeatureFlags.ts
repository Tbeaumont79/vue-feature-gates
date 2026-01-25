import { inject } from "vue";
import type { FeatureFlagsShape, FeatureFlagController } from "../core/types";
import { FEATURE_FLAGS_KEY } from "./constants";

export function useFeatureFlags<
	T extends FeatureFlagsShape = FeatureFlagsShape,
>() {
	const manager = inject(FEATURE_FLAGS_KEY);
	if (!manager) {
		throw new Error("FeatureFlags plugin not installed");
	}
	return manager as FeatureFlagController<T>;
}
