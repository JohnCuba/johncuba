<script lang="ts" setup>
import type { StyleValue } from 'vue';

const CIRCLES_COUNT = 20;

const rootRef = ref<HTMLDivElement>();

const circlesCoord = ref<{ x: number; y: number }[]>([]);
const circlesTheta = ref<number[]>([]);

const resetInterval = ref<NodeJS.Timeout>();

const clearResetInterval = () => {
	if (!resetInterval.value) return;
	clearInterval(resetInterval.value);
	resetInterval.value = undefined;
};

const setCoords = () => {
	const length = rootRef.value?.children.length || 0;
	for (let index = 0; index < length; index++) {
		const elem = rootRef.value?.children.item(index);
		if (!elem) return;

		const boundingClientRect = elem.getBoundingClientRect();

		const centerX = boundingClientRect.x + boundingClientRect.width / 2;
		const centerY = boundingClientRect.y + boundingClientRect.height / 2;
		circlesCoord.value[index] = { x: centerX, y: centerY };
	}
};

const calcTheta = (
	target: { x: number; y: number },
	root: { x: number; y: number },
) => {
	const dx = target.x - root.x;
	const dy = target.y - root.y;
	const thetaRange = Math.atan2(dy, dx);
	let thetaDeg = (thetaRange * 180) / Math.PI + 90;
	if (thetaDeg < 0) thetaDeg = 360 + thetaDeg; // range [0, 360)
	return Number(thetaDeg.toFixed(0));
};

const setCirclesTheta = (x: number, y: number) => {
	clearResetInterval();
	circlesTheta.value = circlesCoord.value.map(coords =>
		calcTheta({ x, y }, coords),
	);
};

const resetCirclesTheta = async () => {
	resetInterval.value = setInterval(() => {
		const isReset = circlesTheta.value.every(
			theta => theta === 0 || theta === 360,
		);
		if (isReset) clearResetInterval();
		circlesTheta.value = circlesTheta.value.map((theta) => {
			return theta > 180 ? Math.min(360, theta + 1) : Math.max(0, theta - 1);
		});
	}, 10);
};

const handleMouseMove = (e: MouseEvent) => {
	setCirclesTheta(e.pageX, e.pageY);
};

const handleTouch = (ev: TouchEvent) => {
	const touch = ev.touches[0];
	setCirclesTheta(touch.pageX, touch.pageY);
};

const handleBlur = () => {
	resetCirclesTheta();
};

const getCircleStyle = (index: number): StyleValue => {
	return {
		transform: `rotate(${circlesTheta.value[index]}deg)`,
	};
};

onMounted(() => {
	setCoords();

	document.addEventListener('mousemove', handleMouseMove, false);
	document.addEventListener('mouseleave', handleBlur, false);
	document.addEventListener('touchmove', handleTouch, false);
	document.addEventListener('touchend', handleBlur, false);
});

onUnmounted(() => {
	document.removeEventListener('mousemove', handleMouseMove, false);
	document.removeEventListener('mouseleave', handleBlur, false);
	document.removeEventListener('touchmove', handleTouch, false);
	document.removeEventListener('touchend', handleBlur, false);
});
</script>

<template>
	<div
		ref="rootRef"
		:class="$style.root"
	>
		<div
			v-for="(entity, index) in CIRCLES_COUNT"
			:key="entity"
			:class="$style.circle"
			:style="getCircleStyle(index)"
		/>
	</div>
</template>

<style lang="css" module>
.root {
	--circle-size: calc(min(100vw, 100vh) / 5);
	display: flex;
	flex-wrap: wrap;
	gap: calc(var(--circle-size) / 10);
	max-width: calc(var(--circle-size) * 4.3);
	user-select: none;
}

.circle {
	width: var(--circle-size);
	height: var(--circle-size);
	border-radius: 100%;
	background-image: conic-gradient(from 0deg, #000, #fff);
}

@media screen and (min-width: 768px) {
	.root {
		--circle-size: calc(min(60vw, 60vh) / 5);
	}
}
</style>
