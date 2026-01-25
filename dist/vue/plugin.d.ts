import { type App } from "vue";
import type { FeatureFlagsShape } from "../core/types";
export declare function createFeatureFlags<T extends FeatureFlagsShape>(flags: T): {
    install(app: App): void;
};
