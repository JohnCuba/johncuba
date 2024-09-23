<template>
	<main :class="$style.root">
		<slot name="navigation" />
		<div :class="$style.header">
			<slot name="header" />
		</div>
		<slot name="content" />
	</main>
</template>

<style lang="css" module>
.root {
	position: relative;
	height: 100vh;
}

.header {
	position: absolute;
	z-index: 1;
	right: 0.5rem;
	left: 0.5rem;
	bottom: 0.5rem;
}
</style>
