<script setup lang="ts">
import { useFeatureFlags } from "vue-feature-flags";

const { isEnabled, set } = useFeatureFlags();

function toggle(flag: string) {
	set(flag, !isEnabled(flag));
}

const flags = ["newDashboard", "betaMode"];
</script>

<template>
	<div class="app">
		<div class="glow glow-1"></div>
		<div class="glow glow-2"></div>

		<div class="container">
			<header>
				<div class="logo">
					<svg viewBox="0 0 128 128" width="48" height="48">
						<path
							fill="#42b883"
							d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110H78.8z"
						/>
						<path
							fill="#35495e"
							d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"
						/>
					</svg>
				</div>
				<h1>Feature Flags <span>Playground</span></h1>
				<p class="subtitle">Test your feature flags in real-time</p>
			</header>

			<div class="flags-grid">
				<div
					v-for="flag in flags"
					:key="flag"
					class="flag-card"
					:class="{ active: isEnabled(flag) }"
				>
					<div class="flag-header">
						<span class="flag-name">{{ flag }}</span>
						<span class="flag-status" :class="{ enabled: isEnabled(flag) }">
							{{ isEnabled(flag) ? "Enabled" : "Disabled" }}
						</span>
					</div>

					<div class="flag-toggle" @click="toggle(flag)">
						<div class="toggle-track">
							<div class="toggle-thumb" :class="{ on: isEnabled(flag) }"></div>
						</div>
					</div>
				</div>
			</div>

			<footer>
				<p>
					Powered by
					<a
						href="https://github.com/Tbeaumont79/vue-feature-gates"
						target="_blank"
						>vue-feature-flags</a
					>
				</p>
			</footer>
		</div>
	</div>
</template>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

:root {
	--vue-green: #42b883;
	--vue-dark: #35495e;
	--bg-dark: #0f0f0f;
	--bg-card: rgba(255, 255, 255, 0.03);
	--border-color: rgba(255, 255, 255, 0.08);
	--text-primary: #ffffff;
	--text-secondary: rgba(255, 255, 255, 0.6);
}

body {
	background: var(--bg-dark);
	min-height: 100vh;
	font-family:
		"Inter",
		-apple-system,
		BlinkMacSystemFont,
		"Segoe UI",
		Roboto,
		sans-serif;
}

.app {
	min-height: 100vh;
	position: relative;
	overflow: hidden;
}

/* Glow effects */
.glow {
	position: fixed;
	border-radius: 50%;
	filter: blur(120px);
	opacity: 0.4;
	pointer-events: none;
	animation: float 8s ease-in-out infinite;
}

.glow-1 {
	width: 500px;
	height: 500px;
	background: var(--vue-green);
	top: -150px;
	right: -100px;
	animation-delay: 0s;
}

.glow-2 {
	width: 400px;
	height: 400px;
	background: var(--vue-dark);
	bottom: -100px;
	left: -100px;
	animation-delay: -4s;
}

@keyframes float {
	0%,
	100% {
		transform: translate(0, 0) scale(1);
	}
	50% {
		transform: translate(30px, 20px) scale(1.1);
	}
}

.container {
	max-width: 600px;
	margin: 0 auto;
	padding: 60px 20px;
	position: relative;
	z-index: 1;
}

/* Header */
header {
	text-align: center;
	margin-bottom: 50px;
}

.logo {
	margin-bottom: 20px;
	animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
	0%,
	100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
}

h1 {
	font-size: 2.5rem;
	font-weight: 700;
	color: var(--text-primary);
	margin-bottom: 8px;
}

h1 span {
	background: linear-gradient(135deg, var(--vue-green), #64d9a8);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
}

.subtitle {
	color: var(--text-secondary);
	font-size: 1rem;
}

/* Flags Grid */
.flags-grid {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.flag-card {
	background: var(--bg-card);
	border: 1px solid var(--border-color);
	border-radius: 16px;
	padding: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: all 0.3s ease;
	backdrop-filter: blur(10px);
}

.flag-card:hover {
	background: rgba(255, 255, 255, 0.05);
	border-color: rgba(66, 184, 131, 0.3);
	transform: translateY(-2px);
}

.flag-card.active {
	border-color: rgba(66, 184, 131, 0.5);
	box-shadow: 0 0 30px rgba(66, 184, 131, 0.1);
}

.flag-header {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.flag-name {
	font-size: 1.1rem;
	font-weight: 600;
	color: var(--text-primary);
	font-family: "JetBrains Mono", "Fira Code", monospace;
}

.flag-status {
	font-size: 0.75rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: var(--text-secondary);
	padding: 4px 10px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 20px;
	width: fit-content;
	transition: all 0.3s ease;
}

.flag-status.enabled {
	color: var(--vue-green);
	background: rgba(66, 184, 131, 0.15);
}

/* Toggle Switch */
.flag-toggle {
	cursor: pointer;
}

.toggle-track {
	width: 56px;
	height: 30px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 15px;
	position: relative;
	transition: all 0.3s ease;
}

.toggle-track:hover {
	background: rgba(255, 255, 255, 0.15);
}

.toggle-thumb {
	width: 24px;
	height: 24px;
	background: var(--text-secondary);
	border-radius: 50%;
	position: absolute;
	top: 3px;
	left: 3px;
	transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toggle-thumb.on {
	left: 29px;
	background: var(--vue-green);
	box-shadow: 0 0 20px rgba(66, 184, 131, 0.6);
}

/* Footer */
footer {
	text-align: center;
	margin-top: 60px;
	color: var(--text-secondary);
	font-size: 0.875rem;
}

footer a {
	color: var(--vue-green);
	text-decoration: none;
	font-weight: 500;
	transition: opacity 0.2s;
}

footer a:hover {
	opacity: 0.8;
}

/* Responsive */
@media (max-width: 480px) {
	h1 {
		font-size: 1.75rem;
	}

	.flag-card {
		padding: 20px;
	}

	.glow-1 {
		width: 300px;
		height: 300px;
	}

	.glow-2 {
		width: 250px;
		height: 250px;
	}
}
</style>
