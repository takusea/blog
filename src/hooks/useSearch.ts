import { createMemo, createResource, createSignal, onMount } from "solid-js";
import { debounce } from "~/lib/debounce";

type OrderType = "relevance" | "newer" | "older";

type SearchParams = {
	query: string;
	tags: string[];
	order: OrderType;
};

const SEARCH_DEBOUNCE_MS = 300;

const readParams = () => {
	if (typeof window === "undefined") {
		return { query: "", tags: [], order: "relevance" } as SearchParams;
	}

	const params = new URLSearchParams(window.location.search);

	return {
		query: params.get("q") ?? "",
		tags: params.get("tags")?.split(",") ?? [],
		order: (params.get("order") as OrderType) ?? "relevance",
	};
};

const writeParams = (params: Partial<SearchParams>) => {
	const merged = { ...searchParams(), ...params };
	const next = new URLSearchParams();

	if (merged.query) next.set("q", merged.query);
	if (merged.tags.length > 0) next.set("tags", merged.tags.join(","));
	if (merged.order && merged.order !== "relevance") {
		next.set("order", merged.order);
	}

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

const search = async (params: SearchParams) => {
	if (typeof window === "undefined" || !window.pagefind) return [];

	const sort: Record<string, "asc" | "desc"> | undefined =
		params.order === "relevance"
			? undefined
			: {
					date: params.order === "newer" ? "desc" : "asc",
				};

	const res = await window.pagefind.search(params.query || null, {
		filters: { tag: params.tags },
		sort,
	});
	return res.results;
};

const [searchParams, setSearchParams] = createSignal<SearchParams>({
	query: "",
	tags: [],
	order: "relevance",
});

const isSearching = createMemo(
	() => searchParams().query !== "" || searchParams().tags.length !== 0,
);

const useSearch = () => {
	onMount(() => {
		setSearchParams(readParams());
	});

	const [results] = createResource(searchParams, search);

	const setQuery = debounce((query: string) => {
		writeParams({ query });
	}, SEARCH_DEBOUNCE_MS);

	const toggleSelectedTags = (tag: string) => {
		const { tags } = searchParams();
		const next = tags.includes(tag)
			? tags.filter((t) => t !== tag)
			: [...tags, tag];

		writeParams({ tags: next });
	};

	const setOrderType = (order: OrderType) => {
		writeParams({ order });
	};

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
