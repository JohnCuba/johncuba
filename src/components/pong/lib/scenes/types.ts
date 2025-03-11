import type { Container, TickerCallback } from 'pixi.js';

export interface Scene {
	view: Container;
	onStart(): void;
	onTick: TickerCallback<unknown>;
	onFinish(): void;
}
