<script setup lang="ts">
const LINKS = [
	{
		title: 'GH',
		link: 'https://github.com/JohnCuba',
	},
	{
		title: 'TG',
		link: 'https://t.me/johncuba',
	},
	{
		title: 'IG',
		link: 'https://instagram.com/john_cubaaaaaa',
	}
]
</script>

<template>
	<NuxtLayout name="poster">
		<div>
			<GradientCircles />
			<div :class="$style.header">
				<h1 :class="$style.title">John Cuba</h1>
				<ul :class="$style.links">
					<li v-for="entity in LINKS">
						<NuxtLink :to="entity.link" :class="$style.link" target="__blank">
							{{ entity.title }}
						</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
	</NuxtLayout>
</template>

<style lang="css" module>
.header {
	font-family: 'New Amsterdam';
	display: flex;
	justify-content: space-between;
	font-size: 1em;
	color: #2e2e2e;
}

.title {
	margin: 0;
}

.links {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	gap: 0.5rem;
}

.link {
	text-decoration: none;
	font-size: xx-large;
	color: currentColor;
}
</style>