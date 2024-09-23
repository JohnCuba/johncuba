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
	},
];
</script>

<template>
	<header :class="$style.header">
		<NuxtLink
			to="/"
			:class="$style.title"
		>
			John Cuba
		</NuxtLink>
		<ul :class="$style.links">
			<li
				v-for="(entity, index) in LINKS"
				:key="index"
			>
				<NuxtLink
					:to="entity.link"
					:class="$style.link"
					target="__blank"
				>
					{{ entity.title }}
				</NuxtLink>
			</li>
		</ul>
	</header>
</template>

<style module>
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
