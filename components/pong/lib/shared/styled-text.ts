import {
	Color,
	FillGradient,
	Text,
	type TextOptions,
	TextStyle,
} from 'pixi.js';

export class StyledText extends Text {
	constructor(options: TextOptions) {
		super({
			style: new TextStyle({
				fontFamily: 'New Amsterdam',
				fontSize: 64,
				fill: new FillGradient({
					type: 'linear',
					colorStops: [
						{
							offset: 0,
							color: Color.shared.setValue(0xffffff),
						},
					],
				}),
				...options.style,
			}),
			...options,
		});
	}
}
