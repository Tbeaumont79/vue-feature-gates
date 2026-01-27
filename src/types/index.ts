import { Pinia } from "pinia";

export type FeatureFlagsShape = Record<string, boolean>;

export interface FeatureFlagController<T extends FeatureFlagsShape> {
	flags: T;
	isEnabled<K extends keyof T>(key: K): T[K];
	set<K extends keyof T>(key: K, value: T[K]): void;
	enable<K extends keyof T>(key: K): void;
	disable<K extends keyof T>(key: K): void;
}

export interface StorageConfig {
	enabled?: boolean;
	storageKey?: string;
	storage?: Storage; // localStorage | sessionStorage
}

export interface FeatureFlagOptions {
	storage?: StorageConfig;
	pinia?: Pinia;
}
