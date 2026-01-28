import { useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal } from "solid-js";
import { debounce } from "~/lib/debounce";
import type { ResultType } from "~/type/pagefind";

type OrderType = "relevance" | "newer" | "older";

type SearchParams = {
	query: string;
	tags: string[];
	order: OrderType;
};

const SEARCH_DEBOUNCE_MS = 300;

const parseParams = (
	params: Record<string, string | string[] | undefined>,
): SearchParams => ({
	query: typeof params.q === "string" ? params.q : "",
	tags: typeof params.tags === "string" ? params.tags.split(",") : [],
	order: (params.order as OrderType) ?? "",
});

const serializeParams = (params: SearchParams) => ({
	q: params.query || undefined,
	tags: params.tags?.length ? params.tags.join(",") : undefined,
	order: params.order,
});

const useSearch = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [rawParams, setRawParams] = useSearchParams();
	const searchParams = createMemo<SearchParams>(() => parseParams(rawParams));

	const isSearching = createMemo(() => {
		return searchParams().query !== "" || searchParams().tags.length !== 0;
	});

	const [results, setResults] = createSignal<ResultType[]>([]);

	const setParams = (params: Partial<SearchParams>) => {
		const marged = serializeParams({ ...searchParams(), ...params });
		if (location.pathname !== "/") {
			const paramStr = Object.entries(marged)
				.filter((e) => e[1])
				.map((e) => `${e[0]}=${e[1]}`)
				.join("&");
			navigate(`/?${paramStr}`);
			return;
		}

		setRawParams(marged);
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
		if (!window.pagefind) return;

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
		const params = searchParams();
		search(params);
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
