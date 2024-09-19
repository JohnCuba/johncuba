import { Color, FillGradient, Text, TextStyle, type TextOptions } from 'pixi.js';

export class StyledText extends Text {
	constructor(options: TextOptions) {
		super({
			style: new TextStyle({
				fontFamily: 'New Amsterdam',
				fontSize: 64,
				fill: new FillGradient(0, 0, 0, 0).addColorStop(0, Color.shared.setValue(0xffffff)),
				...options.style,
			}),
			...options
		});
	}
}