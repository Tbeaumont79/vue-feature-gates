<script setup lang="ts">
import { useFeatureFlags } from "vue-feature-flags";
import FeatureFlagPanel from "../components/FeatureFlagPanel.vue";
import NewDashboard from "../components/NewDashboard.vue";
import BetaBanner from "../components/BetaBanner.vue";

const { isEnabled } = useFeatureFlags();
</script>

<template>
	<div class="home">
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
				<p class="subtitle">
					See how components render conditionally based on feature flags
				</p>
			</header>

			<!-- Beta Banner - Only shows when betaMode is enabled -->
			<Transition name="fade">
				<BetaBanner v-if="isEnabled('betaMode')" />
			</Transition>

			<!-- New Dashboard - Only shows when newDashboard is enabled -->
			<Transition name="fade">
				<NewDashboard v-if="isEnabled('newDashboard')" />
			</Transition>

			<!-- Empty state when no features are enabled -->
			<div
				v-if="!isEnabled('betaMode') && !isEnabled('newDashboard')"
				class="empty-state"
			>
				<span class="empty-icon">🚀</span>
				<p>Enable some feature flags below to see components appear!</p>
			</div>

			<!-- Control Panel -->
			<FeatureFlagPanel />

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

<style scoped>
.home {
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
	max-width: 700px;
	margin: 0 auto;
	padding: 60px 20px;
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: 20px;
}

/* Header */
header {
	text-align: center;
	margin-bottom: 20px;
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

/* Empty State */
.empty-state {
	text-align: center;
	padding: 40px 20px;
	background: var(--bg-card);
	border: 1px dashed var(--border-color);
	border-radius: 16px;
}

.empty-icon {
	font-size: 2.5rem;
	display: block;
	margin-bottom: 12px;
}

.empty-state p {
	color: var(--text-secondary);
	font-size: 0.95rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}

/* Footer */
footer {
	text-align: center;
	margin-top: 20px;
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
