<template>
	<NuxtLayout
		name="poster"
		:class="$style.root"
	>
		<template #navigation>
			<PageNavigation />
		</template>
		<template #content>
			<GradientCircles />
		</template>
		<template #header>
			<PageHeader />
		</template>
	</NuxtLayout>
</template>

<style module>
.root {
	color: #2e2e2e;
}
</style>
