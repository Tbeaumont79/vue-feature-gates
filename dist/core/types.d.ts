export type FeatureFlagsShape = Record<string, boolean>;
export interface FeatureFlagController<T extends FeatureFlagsShape> {
    flags: T;
    isEnabled<K extends keyof T>(key: K): T[K];
    set<K extends keyof T>(key: K, value: T[K]): void;
    enable<K extends keyof T>(key: K): void;
    disable<K extends keyof T>(key: K): void;
}
