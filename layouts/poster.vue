<template>
	<main :class="$style.root">
		<div>
			<slot name="navigation" />
			<slot name="content" />
			<slot name="header" />
		</div>
	</main>
</template>

<style lang="css" module>
.root {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}
</style>
