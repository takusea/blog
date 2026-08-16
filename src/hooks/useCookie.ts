import { createEffect, createSignal } from "solid-js";

const getCookieValue = async (key: string) => {
	return (await cookieStore.get(key))?.value;
};

const setCookieValue = async (key: string, value: string) => {
	await cookieStore.set({
		name: key,
		value,
		path: "/",
		expires: Date.now() + 31536000 * 1000,
		sameSite: "lax",
	});
};

const deleteCookieValue = async (key: string) => {
	await cookieStore.delete(key);
};

const useCookie = (key: string) => {
	const [value, setValue] = createSignal<string | undefined>();

	createEffect(() => {
		void getCookieValue(key).then(setValue);
	});

	createEffect(() => {
		const current = value();
		if (current) {
			void setCookieValue(key, current);
		} else {
			void deleteCookieValue(key);
		}
	});

	return [value, setValue] as const;
};

export default useCookie;
