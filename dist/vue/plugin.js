import { reactive } from "vue";
import { createFeatureFlagController } from "../core/createFeatureFlagController";
import { FEATURE_FLAGS_KEY } from "./constants";
export function createFeatureFlags(flags) {
    const state = reactive({ ...flags });
    const manager = createFeatureFlagController(state);
    return {
        install(app) {
            app.provide(FEATURE_FLAGS_KEY, manager);
        },
    };
}
