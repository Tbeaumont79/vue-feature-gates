<script setup lang="ts">
import Home from "./views/Home.vue";
</script>

<template>
	<Home />
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
</style>
