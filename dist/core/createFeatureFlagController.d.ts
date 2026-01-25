import type { FeatureFlagsShape, FeatureFlagController } from "./types";
export declare function createFeatureFlagController<T extends FeatureFlagsShape>(initialFlags: T): FeatureFlagController<T>;
