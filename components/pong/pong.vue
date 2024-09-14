<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PongGame } from './lib';

const rootRef = ref<HTMLDivElement>();
const appRef = ref<PongGame>(new PongGame());

onMounted(async () => {
	appRef.value?.init(rootRef.value);
})
</script>

<template>
	<div ref="rootRef" :class="$style.root">
	</div>
</template>

<style module>
.root {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
}
</style>