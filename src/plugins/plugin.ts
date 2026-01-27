import type { App } from "vue";
import { reactive } from "vue";
import type { FeatureFlagsShape, FeatureFlagOptions } from "../types";
import { FEATURE_FLAGS_KEY } from "../utils/constants";
import { DEFAULT_STORAGE_KEY } from "../utils/constants";
import { createFeatureFlagController } from "../core/createFeatureFlagController";
import { createFeatureFlagStore } from "../stores/featureFlagsStore";
import { createPersistencePlugin } from "./persistencePlugin";

/**
 * Create feature flags plugin
 * Supports both Pinia-based (with persistence) and simple reactive implementations
 */
export function createFeatureFlags<T extends FeatureFlagsShape>(
	initialFlags: T,
	options?: FeatureFlagOptions,
) {
	const storageConfig = options?.storage ?? { enabled: false };
	const pinia = options?.pinia;

	return {
		install(app: App) {
			// If Pinia instance is provided, use Pinia store
			if (pinia) {
				try {
					// Register persistence plugin if storage is enabled
					if (storageConfig.enabled) {
						pinia.use(createPersistencePlugin(storageConfig));
					}

					// Create unique store ID
					const storeId = `featureFlags-${storageConfig.storageKey ?? DEFAULT_STORAGE_KEY}`;
					const useStore = createFeatureFlagStore<T>(initialFlags, storeId);
					const store = useStore(pinia);

					// Provide controller interface that matches FeatureFlagController
					const controller = {
						get flags() {
							return store.allFlags;
						},
						isEnabled: <K extends keyof T>(key: K): T[K] => {
							return store.isEnabled(key);
						},
						set: <K extends keyof T>(key: K, value: T[K]) => {
							store.set(key, value);
						},
						enable: <K extends keyof T>(key: K) => {
							store.enable(key);
						},
						disable: <K extends keyof T>(key: K) => {
							store.disable(key);
						},
					};

					app.provide(FEATURE_FLAGS_KEY, controller);
				} catch (error) {
					console.error(
						"[vue-feature-gates] Failed to initialize Pinia store. Make sure Pinia is installed:",
						error,
					);
					throw error;
				}
			} else {
				// Fallback: simple reactive implementation (no persistence)
				const state = reactive({ ...initialFlags }) as T;
				const controller = createFeatureFlagController(state);

				app.provide(FEATURE_FLAGS_KEY, controller);

				if (storageConfig.enabled) {
					console.warn(
						"[vue-feature-gates] Storage is enabled but no Pinia instance was provided. Persistence will not work. Pass a Pinia instance to enable persistence.",
					);
				}
			}
		},
	};
}
