import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'index',
			component: () => import('@/views/index.vue'),
		},
		{
			path: '/pong',
			name: 'pong',
			component: () => import('@/views/pong.vue'),
		},
	],
});

export default router;
