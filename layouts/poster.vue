<template>
	<main :class="$style.root">
		<slot />
	</main>
</template>

<style lang="css" module>
.root {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 5rem;
}
</style>