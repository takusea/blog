import { experimental_getFontFileURL, fontData } from "astro:assets";
import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";

type Props = {
	title: string;
	tags: string[];
	thumbnail?: string;
	url: URL;
};

const getFontData = async (fontPath: string, url: URL) => {
	const fontUrl = experimental_getFontFileURL(fontPath, url);
	return await fetch(fontUrl).then((res) => res.arrayBuffer());
};

export const renderOgImage = async (props: Props) => {
	const tags = props.tags
		.map(
			(tag) =>
				`<span style="background-color:#f0f0f0;padding:16px;margin:16px;border-radius:16px; font-size:32px;">${tag}</span>`,
		)
		.join("");
	const thumbnail = props.thumbnail
		? `<img src="${props.thumbnail}" width="100" height="100" alt="Thumbnail" />`
		: "";
	const card =
		html(`<div style="display:flex;flex-direction:column;background-color:#fff;padding:32px;box-sizing:border-box;width:100%;height:100%">
		<h2 style="font-size:64px;">${props.title}</h2>
		<div style="display:flex">${tags}</div>
    ${thumbnail}
	</div>`);

	const svg = await satori(card, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: "Press Start 2P",
				data: await getFontData(
					fontData["--font-press-start-2p"][0]?.src[0]?.url,
					props.url,
				),
				weight: 400,
				style: "normal",
			},
			{
				name: "DotGothic16",
				data: await getFontData(
					fontData["--font-dot-gothic-16"][0]?.src[0]?.url,
					props.url,
				),
				weight: 400,
				style: "normal",
			},
		],
	});
	const png = await sharp(Buffer.from(svg)).png().toBuffer();
	return png;
};
