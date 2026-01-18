export function debounce<T>(func: (arg: T) => void, delay: number) {
	let timeoutId: number | undefined;
	return (arg: T) => {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
		}
		timeoutId = window.setTimeout(() => {
			func(arg);
		}, delay);
	};
}
