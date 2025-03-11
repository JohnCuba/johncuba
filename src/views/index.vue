<script setup lang="ts">
import GradientCircles from '@/components/gradient-circles.vue';
import PageHeader from '@/components/page-header.vue';
import PageNavigation from '@/components/page-navigation.vue';
</script>

<template>
	<main :class="$style.root">
		<div>
			<PageNavigation />
			<GradientCircles />
			<PageHeader />
		</div>
	</main>
</template>

<style lang="css" module>
.root {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100dvh;
}
</style>