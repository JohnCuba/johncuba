<script lang="ts" setup>
import type { StyleValue } from 'vue';

const circlesCoord = ref<{cX: number, cY: number}[]>([]);
const circlesTheta = ref<number[]>([]);

const setCircleRef = (ref: Element | ComponentPublicInstance | null) => {
	if (!ref) return;
	if (circlesCoord.value.length >= 20) return;
	const boundingClientRect = (<HTMLElement>ref).getBoundingClientRect()

	const centerX = boundingClientRect.x + (boundingClientRect.width / 2);
	const centerY = boundingClientRect.y + (boundingClientRect.height / 2);
	circlesCoord.value.push({cX: centerX, cY: centerY})
}

const handleMouseMove = (e: MouseEvent) => {
	circlesCoord.value.forEach((circleCoord, index) => {
		const dx = e.pageX - circleCoord.cX;
		const dy = e.pageY - circleCoord.cY;
		const thetaRange = Math.atan2(dy, dx); // range (-PI, PI]
		let thetaDeg = (thetaRange * 180 / Math.PI) + 90; // rads to degs, range (-180, 180]
		circlesTheta.value[index] = Number(thetaDeg.toFixed(0));
	})
}

const getCircleStyle = (index: number): StyleValue => {
	const targetRange = circlesTheta.value[index];
	let targetDeg = targetRange;
	if (targetDeg < 0) targetDeg = 360 + targetDeg; // range [0, 360)
	return {
		backgroundImage: `conic-gradient(from ${targetDeg}deg, #000, #fff)`,
	}
}

onMounted(() => {
	document.onmousemove = handleMouseMove;
})

onUnmounted(() => {
	document.onmousemove = null;
})
</script>

<template>
	<div :class="$style.root">
		<div
			v-for="(entity, index) in 20"
			:key="entity"
			:class="$style.circle"
			:ref="setCircleRef"
			:style="getCircleStyle(index)"
		>
		</div>
	</div>
</template>

<style lang="css" module>
.root {
	--circle-size: calc(min(60vw, 60vh) / 5);
	display: flex;
	flex-wrap: wrap;
	gap: calc(var(--circle-size) / 10);
	max-width: calc(var(--circle-size) * 4.3);
	user-select: none;
}

.circle {
	--circle-theta: attr(data-theta);
	width: var(--circle-size);
	height: var(--circle-size);
	border-radius: 100%;
	will-change: background-image;
	background-image: conic-gradient(from 0deg, #000, #fff);
}
</style>