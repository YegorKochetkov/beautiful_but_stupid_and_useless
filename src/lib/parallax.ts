/**
 * Linear interpolation between two values:
 * Linear interpolation (lerp) is a mathematical technique
 * used to smoothly transition or blend between two values.
 *
 * Here's a detailed explanation:
 *
 * In the context of the lerp function (a, b, t) => a + (b - a) * t:
 *
 * a is the starting value
 * b is the ending value
 * t is the interpolation factor (typically between 0 and 1)
 *
 * Examples to illustrate:
 *
 * lerp(0, 100, 0.5) → 50 (exactly halfway between 0 and 100)
 * lerp(0, 100, 0.25) → 25 (25% of the way from 0 to 100)
 * lerp(0, 100, 0.75) → 75 (75% of the way from 0 to 100)
 *
 * In this project, lerp is used for smooth animations:
 *
 * Creating gradual transitions in tilt and background position
 * Providing a more natural, fluid motion instead of abrupt changes
 * Allowing fine-grained control over animation progression
 *
 * This creates a soft, eased movement that makes the tilt effect feel more organic
 * and visually appealing.
 */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerpFactor = 0.06;

export interface Vec2 {
	x: number;
	y: number;
}
/**
 * Creates a 2D Vector
 */
export const createVec2 = (x = 0, y = 0) => {
	const state = { x, y };

	/**
	 * Sets vector coordinates
	 */
	const set = (newX: number, newY: number) => {
		state.x = newX;
		state.y = newY;
	};

	/**
	 * Linear interpolation between current and target vector
	 */
	const interpolateVec = (v: Vec2, t: number) => {
		state.x = lerp(state.x, v.x, t);
		state.y = lerp(state.y, v.y, t);
	};

	return {
		get x() {
			return state.x;
		},
		get y() {
			return state.y;
		},
		set,
		interpolate: interpolateVec,
	};
};

export const rotation = {
	current: createVec2(),
	target: createVec2(),
};
export const position = {
	current: createVec2(),
	target: createVec2(),
};
