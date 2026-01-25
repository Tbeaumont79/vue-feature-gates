import type { FeatureFlagsShape, FeatureFlagController } from "../core/types";
export declare function useFeatureFlags<T extends FeatureFlagsShape = FeatureFlagsShape>(): FeatureFlagController<T>;
