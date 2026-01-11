<script setup lang="ts">
import { useFeatureFlags } from "vue-feature-flags";

const flags = useFeatureFlags();

function toggleBeta() {
	flags.set("betaMode", !flags.isEnabled("betaMode"));
}
</script>
<template>
	<h1>Playground</h1>
	<p>newDashboard: {{ flags.isEnabled("newDashboard") }}</p>
	<p>betaMode: {{ flags.isEnabled("betaMode") }}</p>

	<button @click="toggleBeta">Toggle betaMode</button>
</template>
