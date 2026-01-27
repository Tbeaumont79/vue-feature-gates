import type { StorageConfig } from "../types";
import { DEFAULT_STORAGE_KEY } from "./constants";

/**
 * Load feature flags from storage
 */
export function loadFromStorage<T extends Record<string, boolean>>(
	config: StorageConfig,
	defaults: T,
): Partial<T> {
	if (!config.enabled) return {};

	const storage = config.storage ?? window.localStorage;
	const key = config.storageKey ?? DEFAULT_STORAGE_KEY;

	try {
		const stored = storage.getItem(key);
		if (stored) {
			const parsed = JSON.parse(stored);
			// Only return values that exist in defaults to avoid orphaned flags
			const result: Partial<T> = {};
			for (const k in parsed) {
				if (k in defaults) {
					result[k as keyof T] = parsed[k];
				}
			}
			return result;
		}
	} catch (error) {
		console.error("[vue-feature-gates] Failed to load from storage:", error);
	}

	return {};
}

/**
 * Save feature flags to storage
 */
export function saveToStorage<T extends Record<string, boolean>>(
	config: StorageConfig,
	flags: T,
): void {
	if (!config.enabled) return;

	const storage = config.storage ?? window.localStorage;
	const key = config.storageKey ?? DEFAULT_STORAGE_KEY;

	try {
		storage.setItem(key, JSON.stringify(flags));
	} catch (error) {
		console.error("[vue-feature-gates] Failed to save to storage:", error);
	}
}

/**
 * Listen to storage events for cross-tab synchronization
 */
export function onStorageChange<T extends Record<string, boolean>>(
	config: StorageConfig,
	callback: (flags: Partial<T>) => void,
): (() => void) | null {
	if (!config.enabled || typeof window === "undefined") return null;

	const key = config.storageKey ?? DEFAULT_STORAGE_KEY;

	const handler = (event: StorageEvent) => {
		if (event.key === key && event.newValue) {
			try {
				const parsed = JSON.parse(event.newValue);
				callback(parsed);
			} catch (error) {
				console.error(
					"[vue-feature-gates] Failed to parse storage event:",
					error,
				);
			}
		}
	};

	window.addEventListener("storage", handler);

	return () => {
		window.removeEventListener("storage", handler);
	};
}
