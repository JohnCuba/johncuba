<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
// TODO: Take routes from '@/routing'
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
			<template v-for="(entity, index) in LINKS">
				<li
					v-if="route.path !== entity.link"
					:key="index"
				>
					<RouterLink
						:to="entity.link"
						:class="$style.link"
					>
						{{ entity.title }}
					</RouterLink>
				</li>
			</template>
		</ul>
	</nav>
</template>

<style lang="css" module>
.nav {
	font-family: 'New Amsterdam';
	display: flex;
	justify-content: end;
	gap: 1em;
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
