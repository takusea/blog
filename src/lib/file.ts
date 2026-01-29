import fs from "node:fs";
import path from "node:path";

const joinRootPath = (dir: string) => path.join(process.cwd(), dir);

const findFiles = (dir: string, extension: string) => {
	"use server";

	return fs
		.readdirSync(joinRootPath(dir), { withFileTypes: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith(`.${extension}`))
		.map((file) => path.join(dir, file.name));
};

const readFile = (filepath: string) => fs.readFileSync(filepath, "utf-8");

export { findFiles, readFile };
