export const getCookie = async (key: string) => {
	return (await cookieStore.get(key))?.value;
};

export const setCookie = async (key: string, value: string) => {
	await cookieStore.set({
		name: key,
		value,
		path: "/",
		expires: Date.now() + 31536000 * 1000,
		sameSite: "lax",
	});
};

export const deleteCookie = async (key: string) => {
	await cookieStore.delete(key);
};
