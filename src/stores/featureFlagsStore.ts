import { defineStore } from "pinia";
import type { FeatureFlagsShape } from "../types";

export interface FeatureFlagStoreState<T extends FeatureFlagsShape> {
	flags: T;
}

/**
 * Factory function to create a Pinia store for feature flags
 */
export function createFeatureFlagStore<T extends FeatureFlagsShape>(
	initialFlags: T,
	storeId: string,
) {
	return defineStore(storeId, {
		state: () => ({
			flags: { ...initialFlags } as T,
		}),

		getters: {
			/**
			 * Check if a feature flag is enabled
			 */
			isEnabled(): <K extends keyof T>(key: K) => T[K] {
				return <K extends keyof T>(key: K): T[K] => {
					return (this.flags as T)[key];
				};
			},

			/**
			 * Get all flags
			 */
			allFlags(): T {
				return this.flags as T;
			},
		},

		actions: {
			/**
			 * Set a flag to a specific value
			 */
			set<K extends keyof T>(key: K, value: T[K]) {
				(this.flags as Record<string, boolean>)[key as string] =
					value as boolean;
			},

			/**
			 * Enable a flag (set to true)
			 */
			enable<K extends keyof T>(key: K) {
				(this.flags as Record<string, boolean>)[key as string] = true;
			},

			/**
			 * Disable a flag (set to false)
			 */
			disable<K extends keyof T>(key: K) {
				(this.flags as Record<string, boolean>)[key as string] = false;
			},

			/**
			 * Reset all flags to initial values
			 */
			reset() {
				Object.assign(this.flags, initialFlags);
			},
		},
	});
}
