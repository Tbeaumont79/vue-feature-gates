export function createFeatureFlagController(initialFlags) {
    const flags = initialFlags;
    return {
        flags,
        isEnabled(key) {
            return flags[key];
        },
        set(key, value) {
            flags[key] = value;
        },
        enable(key) {
            flags[key] = true;
        },
        disable(key) {
            flags[key] = false;
        },
    };
}
