import type { FeatureFlagsShape } from "./types";
export declare function createFeatureFlagManager<T extends FeatureFlagsShape>(flags: T): import("./types").FeatureFlagController<T>;
