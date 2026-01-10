import { FeatureFlagsShape } from "./types";

export class FeatureFlagManager<T extends FeatureFlagsShape> {
	private flags: T;

	constructor(initialFlags: T) {
		this.flags = initialFlags;
	}

	isEnabled<K extends keyof T>(key: K) {
		return this.flags[key];
	}

	set<K extends keyof T>(key: K, value: boolean) {
		this.flags[key] = value;
	}

	enable<K extends keyof T>(key: K) {
		this.flags[key] = true;
	}

	disable<K extends keyof T>(key: K) {
		this.flags[key] = false;
	}
}
