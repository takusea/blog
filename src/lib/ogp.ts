import { experimental_getFontFileURL, fontData } from "astro:assets";
import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";
import type { PostMetadata } from "~/type/post";

type Props = {
	post: PostMetadata;
	thumbnailPath: string;
	url: URL;
};

const imagePathToBase64 = async (path: string) => {
	const data = await readFile(path);

	const extension = extname(path).toLowerCase().slice(1) || "png";
	const mimeType = extension === "jpg" ? "jpeg" : extension;

	return `data:image/${mimeType};base64,${data.toString("base64")}`;
};

const getFontData = async (fontPath: string, url: URL) => {
	const fontUrl = experimental_getFontFileURL(fontPath, url);
	return await fetch(fontUrl).then((res) => res.arrayBuffer());
};

export const renderOgImage = async (props: Props) => {
	const tags = props.post.tags
		.map(
			(tag) =>
				`<span style="background-color:#fff8;color:#000;padding:16px 32px;font-size:32px;">${tag}</span>`,
		)
		.join("");
	const thumbnail = props.post.thumbnail
		? `<img src="${await imagePathToBase64(`src/content/posts/${props.thumbnailPath}`)}" width="${props.post.thumbnail.width}" height="${props.post.thumbnail.height}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0.2;filter:blur(2px);" alt="Thumbnail" />`
		: "";
	const card =
		html(`<div style="display:flex;flex-direction:column;gap:16px;background-color:#000;color:#fff;padding:64px 96px;width:100%;height:100%">
    ${thumbnail}
    <img src="${await imagePathToBase64(`public/ogp-border.png`)}" width="1200" height="630" style="position:absolute;top:0;left:0;width:100%;height:100%" alt="Border" />
		<h2 style="font-size:64px;line-height:1.25">${props.post.title}</h2>
		<div style="display:flex;gap:32px;">${tags}</div>
    <div style="position:absolute;bottom:96px;right:96px;display:flex;align-items:center;gap:8px;font-size:32px;color:#fff8;">
      <img src="${await imagePathToBase64("public/favicon-2x.png")}" width="auto" height="auto" style="vertical-align:middle;margin-right:8px;width:32px;height:32px;image-rendering:pixelated;" alt="Logo" />
      たくしいのこんせき
    </div>
	</div>`);

	const svg = await satori(card, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: "DotGothic16",
				data: await getFontData(
					fontData["--font-dot-gothic-16"][0]?.src[0]?.url,
					props.url,
				),
			},
		],
	});
	const png = await sharp(Buffer.from(svg)).png().toBuffer();
	return png;
};
