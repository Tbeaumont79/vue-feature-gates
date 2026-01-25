import { createFeatureFlagController } from "./createFeatureFlagController";
export function createFeatureFlagManager(flags) {
    return createFeatureFlagController(flags);
}
