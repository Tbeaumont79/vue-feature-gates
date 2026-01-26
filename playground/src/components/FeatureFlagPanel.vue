<script setup lang="ts">
import { useFeatureFlags } from "vue-feature-flags";

const { isEnabled, set, flags } = useFeatureFlags();

function toggle(flag: string) {
	set(flag, !isEnabled(flag));
}

const flagNames = Object.keys(flags);
</script>

<template>
	<div class="panel">
		<h2>🎛️ Feature Flags Control</h2>
		<p class="panel-subtitle">
			Toggle flags to see components appear/disappear
		</p>

		<div class="flags-list">
			<div
				v-for="flag in flagNames"
				:key="flag"
				class="flag-item"
				:class="{ active: isEnabled(flag) }"
				@click="toggle(flag)"
			>
				<div class="flag-info">
					<span class="flag-name">{{ flag }}</span>
					<span class="flag-status" :class="{ enabled: isEnabled(flag) }">
						{{ isEnabled(flag) ? "ON" : "OFF" }}
					</span>
				</div>
				<div class="toggle-track">
					<div class="toggle-thumb" :class="{ on: isEnabled(flag) }"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.panel {
	background: rgba(255, 255, 255, 0.03);
	border: 1px solid rgba(255, 255, 255, 0.08);
	border-radius: 16px;
	padding: 24px;
	backdrop-filter: blur(10px);
}

h2 {
	font-size: 1.25rem;
	font-weight: 600;
	color: #fff;
	margin-bottom: 4px;
}

.panel-subtitle {
	color: rgba(255, 255, 255, 0.5);
	font-size: 0.875rem;
	margin-bottom: 20px;
}

.flags-list {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.flag-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	background: rgba(255, 255, 255, 0.02);
	border: 1px solid rgba(255, 255, 255, 0.06);
	border-radius: 12px;
	cursor: pointer;
	transition: all 0.2s ease;
}

.flag-item:hover {
	background: rgba(255, 255, 255, 0.05);
}

.flag-item.active {
	border-color: rgba(66, 184, 131, 0.4);
	background: rgba(66, 184, 131, 0.05);
}

.flag-info {
	display: flex;
	align-items: center;
	gap: 12px;
}

.flag-name {
	font-family: "JetBrains Mono", "Fira Code", monospace;
	font-size: 0.9rem;
	color: #fff;
}

.flag-status {
	font-size: 0.65rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 1px;
	padding: 3px 8px;
	border-radius: 4px;
	background: rgba(255, 255, 255, 0.1);
	color: rgba(255, 255, 255, 0.5);
}

.flag-status.enabled {
	background: rgba(66, 184, 131, 0.2);
	color: #42b883;
}

.toggle-track {
	width: 44px;
	height: 24px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 12px;
	position: relative;
	transition: all 0.2s ease;
}

.toggle-thumb {
	width: 18px;
	height: 18px;
	background: rgba(255, 255, 255, 0.4);
	border-radius: 50%;
	position: absolute;
	top: 3px;
	left: 3px;
	transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toggle-thumb.on {
	left: 23px;
	background: #42b883;
	box-shadow: 0 0 12px rgba(66, 184, 131, 0.6);
}
</style>
