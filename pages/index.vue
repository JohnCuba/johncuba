<template>
	<NuxtLayout name="poster" :class="$style.root">
		<template #navigation>
			<Navigation />
		</template>
		<template #content>
			<GradientCircles />
		</template>
		<template #header>
			<Header />
		</template>
	</NuxtLayout>
</template>

<style module>
.root {
	color: #2e2e2e;
}
</style>
