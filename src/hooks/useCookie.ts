import { createEffect, createSignal } from "solid-js";

const signal = createSignal<string | undefined>();

const useCookie = (key: string) => {
	const [value, setValue] = signal;

	const readCookie = async () => {
		const cookie = await window.cookieStore.get(key);
		return cookie?.value;
	};

	const writeCookie = async (value: string) => {
		await window.cookieStore.set({
			name: key,
			value,
		});
	};

	const deleteCookie = async () => {
		await window.cookieStore.delete(key);
	};

	createEffect(() => {
		readCookie().then(setValue);
	});

	createEffect(() => {
		const v = value();
		if (v) {
			writeCookie(v);
		} else {
			deleteCookie();
		}
	});

	return signal;
};

export default useCookie;
