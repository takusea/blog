import "mdast";

type SearchOption = {
	filters?: Record<string, string | string[]>;
	sort?: Record<string, "desc" | "asc">;
};

declare module "mdast" {
	interface Data {
		hName?: string;
		hProperties?: Record<string, unknown>;
	}
}

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
