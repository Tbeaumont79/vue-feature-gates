<template>
	<div class="beta-banner">
		<div class="beta-content">
			<span class="beta-icon">🧪</span>
			<div class="beta-text">
				<strong>Beta Mode Active</strong>
				<p>
					You're testing experimental features. Some things may not work as
					expected.
				</p>
			</div>
		</div>
		<div class="beta-indicator">
			<span class="pulse"></span>
			BETA
		</div>
	</div>
</template>

<style scoped>
.beta-banner {
	background: linear-gradient(
		135deg,
		rgba(155, 89, 182, 0.15),
		rgba(52, 152, 219, 0.15)
	);
	border: 1px solid rgba(155, 89, 182, 0.4);
	border-radius: 12px;
	padding: 16px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	animation: slideDown 0.3s ease;
}

@keyframes slideDown {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.beta-content {
	display: flex;
	align-items: center;
	gap: 12px;
}

.beta-icon {
	font-size: 1.5rem;
}

.beta-text strong {
	color: #fff;
	font-size: 0.9rem;
	display: block;
}

.beta-text p {
	color: rgba(255, 255, 255, 0.5);
	font-size: 0.8rem;
	margin: 0;
}

.beta-indicator {
	display: flex;
	align-items: center;
	gap: 8px;
	background: rgba(155, 89, 182, 0.3);
	color: #bb8fce;
	font-size: 0.7rem;
	font-weight: 700;
	letter-spacing: 1px;
	padding: 6px 12px;
	border-radius: 20px;
}

.pulse {
	width: 8px;
	height: 8px;
	background: #9b59b6;
	border-radius: 50%;
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
		transform: scale(1);
	}
	50% {
		opacity: 0.5;
		transform: scale(1.2);
	}
}

@media (max-width: 480px) {
	.beta-banner {
		flex-direction: column;
		gap: 12px;
		text-align: center;
	}

	.beta-content {
		flex-direction: column;
	}
}
</style>
