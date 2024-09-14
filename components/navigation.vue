<script setup lang="ts">
const LINKS = [
	{
		title: 'home',
		link: '/',
	},
	{
		title: 'pong',
		link: '/pong',
	},
];

const route = useRoute();
</script>

<template>
	<nav :class="$style.nav">
		<ul :class="$style.links">
			<template v-for="entity in LINKS">
				<li v-if="route.path !== entity.link">
					<NuxtLink :to="entity.link" :class="$style.link">
						{{ entity.title }}
					</NuxtLink>
				</li>
			</template>
		</ul>
	</nav>
</template>

<style module>
.nav {
	font-family: 'New Amsterdam';
	display: flex;
	justify-content: space-between;
	color: #2e2e2e;
}

.links {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	gap: 0.25rem;
}

.link {
	text-decoration: none;
	font-size: 1.5em;
	color: currentColor;
}
</style>