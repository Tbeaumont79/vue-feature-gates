<script setup lang="ts">
import { useFeatureFlags } from "vue-feature-flags";

const { isEnabled, set } = useFeatureFlags();

function toggleBeta() {
	set("betaMode", !isEnabled("betaMode"));
}
</script>
<template>
	<h1>Playground</h1>
	<p>newDashboard: {{ isEnabled("newDashboard") }}</p>
	<p>betaMode: {{ isEnabled("betaMode") }}</p>

	<button @click="toggleBeta">Toggle betaMode</button>
</template>
