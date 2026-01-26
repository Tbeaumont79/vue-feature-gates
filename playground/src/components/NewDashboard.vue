<script setup lang="ts">
// Mock data for the dashboard
const stats = [
	{ label: "Active Users", value: "2,847", change: "+12.5%", up: true },
	{ label: "Revenue", value: "$48.2K", change: "+8.2%", up: true },
	{ label: "Conversion", value: "3.24%", change: "-0.4%", up: false },
];
</script>

<template>
	<div class="dashboard">
		<div class="dashboard-header">
			<span class="badge">✨ New Feature</span>
			<h3>Analytics Dashboard</h3>
			<p>
				This component only renders when <code>newDashboard</code> flag is
				enabled
			</p>
		</div>

		<div class="stats-grid">
			<div v-for="stat in stats" :key="stat.label" class="stat-card">
				<span class="stat-label">{{ stat.label }}</span>
				<span class="stat-value">{{ stat.value }}</span>
				<span class="stat-change" :class="{ up: stat.up, down: !stat.up }">
					{{ stat.change }}
				</span>
			</div>
		</div>

		<div class="chart-placeholder">
			<div class="chart-bars">
				<div class="bar" style="--height: 60%"></div>
				<div class="bar" style="--height: 80%"></div>
				<div class="bar" style="--height: 45%"></div>
				<div class="bar" style="--height: 90%"></div>
				<div class="bar" style="--height: 70%"></div>
				<div class="bar" style="--height: 85%"></div>
				<div class="bar" style="--height: 55%"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.dashboard {
	background: linear-gradient(
		135deg,
		rgba(66, 184, 131, 0.1),
		rgba(53, 73, 94, 0.1)
	);
	border: 1px solid rgba(66, 184, 131, 0.3);
	border-radius: 16px;
	padding: 24px;
	animation: slideIn 0.4s ease;
}

@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.dashboard-header {
	margin-bottom: 20px;
}

.badge {
	display: inline-block;
	background: linear-gradient(135deg, #42b883, #35495e);
	color: white;
	font-size: 0.7rem;
	font-weight: 600;
	padding: 4px 10px;
	border-radius: 20px;
	margin-bottom: 8px;
}

h3 {
	color: #fff;
	font-size: 1.25rem;
	margin-bottom: 4px;
}

p {
	color: rgba(255, 255, 255, 0.5);
	font-size: 0.85rem;
}

code {
	background: rgba(66, 184, 131, 0.2);
	color: #42b883;
	padding: 2px 6px;
	border-radius: 4px;
	font-size: 0.8rem;
}

.stats-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 12px;
	margin-bottom: 20px;
}

.stat-card {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.stat-label {
	color: rgba(255, 255, 255, 0.5);
	font-size: 0.75rem;
}

.stat-value {
	color: #fff;
	font-size: 1.5rem;
	font-weight: 700;
}

.stat-change {
	font-size: 0.75rem;
	font-weight: 600;
}

.stat-change.up {
	color: #42b883;
}

.stat-change.down {
	color: #e74c3c;
}

.chart-placeholder {
	background: rgba(255, 255, 255, 0.03);
	border-radius: 12px;
	padding: 20px;
	height: 120px;
	display: flex;
	align-items: flex-end;
}

.chart-bars {
	display: flex;
	align-items: flex-end;
	gap: 12px;
	width: 100%;
	height: 100%;
}

.bar {
	flex: 1;
	height: var(--height);
	background: linear-gradient(to top, #42b883, rgba(66, 184, 131, 0.3));
	border-radius: 4px 4px 0 0;
	animation: grow 0.6s ease;
}

@keyframes grow {
	from {
		height: 0;
	}
}

@media (max-width: 480px) {
	.stats-grid {
		grid-template-columns: 1fr;
	}
}
</style>
