<script setup lang="ts">
import PageHeader from '@/components/page-header.vue';
import Pong from '@/components/pong/pong.vue';
</script>

<template>
	<main :class="$style.root">
		<Pong />
		<PageHeader />
	</main>
</template>

<style lang="css" module>
.root {
	color: aliceblue;
}
</style>
