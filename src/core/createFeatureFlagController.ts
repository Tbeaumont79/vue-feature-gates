import type { FeatureFlagsShape, FeatureFlagController } from "./types";

export function createFeatureFlagController<T extends FeatureFlagsShape>(
	initialFlags: T,
): FeatureFlagController<T> {
	const flags = initialFlags;

	return {
		flags,

		isEnabled<K extends keyof T>(key: K) {
			return flags[key];
		},

		set<K extends keyof T>(key: K, value: T[K]) {
			flags[key] = value;
		},

		enable<K extends keyof T>(key: K) {
			flags[key] = true as T[K];
		},

		disable<K extends keyof T>(key: K) {
			flags[key] = false as T[K];
		},
	};
}
