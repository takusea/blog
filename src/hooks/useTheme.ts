import { createEffect, createSignal } from "solid-js";
import { deleteCookie, getCookie, setCookie } from "~/lib/cookie";

const COOKIE_KEY = "theme";

const useTheme = () => {
	const [value, setValue] = createSignal();

	const setValueFromCookie = async () => {
		const value = await getCookie(COOKIE_KEY);
		setValue(value ?? "device");
	};

	createEffect(() => {
		setValueFromCookie();
	});

	const updateValue = (next: string | undefined) => {
		setValue(next);
		if (next) {
			document.documentElement.dataset.theme = next;
			setCookie(COOKIE_KEY, next);
		} else {
			document.documentElement.dataset.theme = "";
			deleteCookie(COOKIE_KEY);
		}
	};

	return [value, updateValue] as const;
};

export default useTheme;
