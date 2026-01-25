import { inject } from "vue";
import { FEATURE_FLAGS_KEY } from "./constants";
export function useFeatureFlags() {
    const manager = inject(FEATURE_FLAGS_KEY);
    if (!manager) {
        throw new Error("FeatureFlags plugin not installed");
    }
    return manager;
}
