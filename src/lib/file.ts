import fs from "node:fs";
import path from "node:path";

const findFiles = (dir: string, extension: string) => {
	return fs
		.readdirSync(dir, { withFileTypes: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith(`.${extension}`))
		.map((file) => path.join(dir, file.name))
		.map((filepath) => fs.readFileSync(filepath, "utf-8"));
};

export { findFiles };
