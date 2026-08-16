import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import { debounce } from "~/lib/debounce";
import type { ResultType } from "~/type/pagefind";

type OrderType = "relevance" | "newer" | "older";

type SearchParams = {
	query: string;
	tags: string[];
	order: OrderType;
};

const SEARCH_DEBOUNCE_MS = 300;

const parseSearchParams = (params: URLSearchParams): SearchParams => ({
	query: params.get("q") ?? "",
	tags: params.get("tags")?.split(",").filter(Boolean) ?? [],
	order: (params.get("order") as OrderType) ?? "relevance",
});

const serializeParams = (params: SearchParams) => {
	const next = new URLSearchParams();

	if (params.query) next.set("q", params.query);
	if (params.tags.length > 0) next.set("tags", params.tags.join(","));
	if (params.order && params.order !== "relevance") {
		next.set("order", params.order);
	}

	return next;
};

const readParams = () => {
	if (typeof window === "undefined") {
		return { query: "", tags: [], order: "relevance" } as SearchParams;
	}
	return parseSearchParams(new URLSearchParams(window.location.search));
};

const [searchParams, setSearchParams] = createSignal<SearchParams>(
	readParams(),
);
const [results, setResults] = createSignal<ResultType[]>([]);

const isSearching = createMemo(
	() => searchParams().query !== "" || searchParams().tags.length !== 0,
);

const useSearch = () => {
	const syncFromLocation = () => {
		setSearchParams(readParams());
	};

	if (typeof window !== "undefined") {
		window.addEventListener("popstate", syncFromLocation);
		onCleanup(() => window.removeEventListener("popstate", syncFromLocation));
	}

	const setParams = (params: Partial<SearchParams>) => {
		const merged = { ...searchParams(), ...params };
		const next = serializeParams(merged);

		if (typeof window !== "undefined") {
			const nextUrl = `/${next.size > 0 ? `?${next.toString()}` : ""}`;
			if (window.location.pathname !== "/") {
				window.location.href = nextUrl;
			} else {
				window.history.replaceState({}, "", nextUrl);
			}
		}

		setSearchParams(merged);
	};

	const setQuery = debounce((query: string) => {
		setParams({ query });
	}, SEARCH_DEBOUNCE_MS);

	const toggleSelectedTags = (tag: string) => {
		const { tags } = searchParams();
		const next = tags.includes(tag)
			? tags.filter((t) => t !== tag)
			: [...tags, tag];

		setParams({ tags: next });
	};

	const setOrderType = (order: OrderType) => {
		setParams({ order });
	};

	const search = async (params: SearchParams) => {
		if (typeof window === "undefined" || !window.pagefind) return;

		const sort =
			params.order === "relevance"
				? undefined
				: {
						[params.order]: params.order === "newer" ? "desc" : "asc",
					};

		const res = await window.pagefind.search(params.query || null, {
			filters: { tag: params.tags },
			...sort,
		});

		setResults(res.results);
	};

	createEffect(() => {
		search(searchParams());
	});

	return {
		searchParams,
		results,
		isSearching,
		setQuery,
		toggleSelectedTags,
		setOrderType,
	};
};

export default useSearch;
