<template>
	<NuxtLayout
		name="full-screen"
		:class="$style.root"
	>
		<template #content>
			<ClientOnly>
				<Pong />
			</ClientOnly>
		</template>
		<template #header>
			<PageHeader />
		</template>
	</NuxtLayout>
</template>

<style module>
.root {
	color: aliceblue;
}
</style>
