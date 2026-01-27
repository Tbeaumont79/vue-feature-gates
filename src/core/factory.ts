import { createFeatureFlagController } from "./createFeatureFlagController";
import type { FeatureFlagsShape } from "../types";

export function createFeatureFlagManager<T extends FeatureFlagsShape>(
	flags: T,
) {
	return createFeatureFlagController<T>(flags);
}
