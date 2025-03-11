import { defineConfig, mergeConfig } from 'vite';
import commonConfig from './vite.config';

// https://vite.dev/config/
export default defineConfig(
	mergeConfig(
		{
			build: {
				outDir: 'gp'
			}
		},
		commonConfig
	)
);
