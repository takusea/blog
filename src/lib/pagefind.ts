type Anchor = {
	element: string;
	id: string;
	text: string;
	location: number;
};

export type ResultData = {
	anchors: Anchor[];
	content: string;
	excerpt: string;
	filters: Record<string, unknown>;
	locations: number[];
	meta: {
		title: string;
	};
	raw_content: string;
	raw_url: string;
	sub_results: unknown[];
	url: string;
	weighted_locations: unknown[];
	word_count: number;
};

export type ResultType = {
	id: string;
	data: () => Promise<ResultData>;
};

type SearchOption = {
	filters?: Record<string, string | string[]>;
	sort?: Record<string, "desc" | "asc">;
};

export interface PagefindWindow extends Window {
	pagefind?: {
		search: (
			query: string | null,
			option: SearchOption,
		) => Promise<{ results: ResultType[] }>;
		filters: () => Promise<Record<string, Record<string, number>>>;
	};
}
