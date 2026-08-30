import { createSignal, onMount } from "solid-js";
import { getCookie, setCookie } from "~/lib/cookie";

type ThemeType = "light" | "dark" | "device";

const COOKIE_KEY = "theme";

const [value, setValue] = createSignal<ThemeType>();

const setValueFromCookie = async () => {
	const value = await getCookie(COOKIE_KEY);
	setValue(
		value === "light" || value === "dark" || value === "device"
			? value
			: "device",
	);
};

const useTheme = () => {
	onMount(setValueFromCookie);

	const updateValue = (next: ThemeType) => {
		setValue(next);
		document.documentElement.dataset.theme = next;
		setCookie(COOKIE_KEY, next);
	};

	return [value, updateValue] as const;
};

export default useTheme;
