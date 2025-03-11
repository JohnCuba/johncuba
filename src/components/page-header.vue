<script setup lang="ts">
import { RouterLink } from 'vue-router';

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
	},
];
</script>

<template>
	<header :class="$style.header">
		<RouterLink
			to="/"
			:class="$style.title"
		>
			John Cuba
		</RouterLink>
		<ul :class="$style.links">
			<li
				v-for="(entity, index) in LINKS"
				:key="index"
			>
				<a
					:href="entity.link"
					:class="$style.link"
					target="_blank"
				>
					{{ entity.title }}
				</a>
			</li>
		</ul>
	</header>
</template>

<style lang="css" module>
.header {
	font-family: 'New Amsterdam';
	display: flex;
	justify-content: space-between;
	font-size: 2em;
	color: inherit;
}

.title {
	margin: 0;
	color: inherit;
	text-decoration: none;
	font-size: inherit;
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
	font-size: inherit;
	color: currentColor;
}
</style>
