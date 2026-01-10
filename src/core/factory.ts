import { FeatureFlagManager } from "./featureFlagManager";
import type { FeatureFlagsShape } from "./types";

export function createFeatureFlagManager<T extends FeatureFlagsShape>(
	flags: T
) {
	return new FeatureFlagManager<T>(flags);
}
