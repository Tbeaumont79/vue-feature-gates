import type { PiniaPluginContext } from "pinia";
import type { StorageConfig } from "../types";
import { DEFAULT_STORAGE_KEY } from "../utils/constants";

/**
 * Custom Pinia plugin for feature flags persistence
 * Provides fine-grained control over storage behavior
 */
export function createPersistencePlugin(config: StorageConfig) {
	return ({ store }: PiniaPluginContext) => {
		// Only apply to feature flag stores
		if (!store.$id.startsWith("featureFlags-")) {
			return;
		}

		if (!config.enabled) {
			return;
		}

		const storage = config.storage ?? window.localStorage;
		const key = config.storageKey ?? DEFAULT_STORAGE_KEY;

		// Restore persisted state on initialization
		try {
			const stored = storage.getItem(key);
			if (stored) {
				const parsed = JSON.parse(stored);
				// Only update flags that exist in the current state
				if (parsed.flags && store.$state.flags) {
					Object.keys(store.$state.flags).forEach((flagKey) => {
						if (flagKey in parsed.flags) {
							store.$state.flags[flagKey] = parsed.flags[flagKey];
						}
					});
				}
			}
		} catch (error) {
			console.error("[vue-feature-gates] Failed to restore state:", error);
		}

		// Subscribe to changes and persist to storage
		store.$subscribe(
			(_mutation: unknown, state: unknown) => {
				try {
					storage.setItem(key, JSON.stringify(state));
				} catch (error) {
					console.error("[vue-feature-gates] Failed to persist state:", error);
				}
			},
			{ detached: true },
		);

		// Listen for cross-tab storage changes
		if (typeof window !== "undefined") {
			const handleStorageEvent = (event: StorageEvent) => {
				if (event.key === key && event.newValue) {
					try {
						const parsed = JSON.parse(event.newValue);
						if (parsed.flags) {
							// Update store with new values from other tab
							Object.keys(store.$state.flags).forEach((flagKey) => {
								if (flagKey in parsed.flags) {
									store.$state.flags[flagKey] = parsed.flags[flagKey];
								}
							});
						}
					} catch (error) {
						console.error(
							"[vue-feature-gates] Failed to sync from other tab:",
							error,
						);
					}
				}
			};

			window.addEventListener("storage", handleStorageEvent);
		}
	};
}
