const MILLISECONDS_OF_ONE_DAY = 86400000;
const HUE_RESOLUTION = 360;

export const getCurrentHue = () => {
	return (
		((Date.now() % MILLISECONDS_OF_ONE_DAY) / MILLISECONDS_OF_ONE_DAY) *
		HUE_RESOLUTION
	);
};
