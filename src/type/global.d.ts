export {};

type SearchOption = {
	filters?: Record<string, string | string[]>;
	sort?: Record<string, "desc" | "asc">;
};

declare global {
	interface Window {
		cookieStore: CookieStore;
		pagefind?: {
			search: (
				query: string | null,
				option: SearchOption,
			) => Promise<{ results: ResultType[] }>;
			filters: () => Promise<Record<string, Record<string, number>>>;
		};
	}
}
