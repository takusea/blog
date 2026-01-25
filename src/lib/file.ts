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

const copyFile = (fromDir: string, toDir: string) => {
	"use server";

	const from = joinRootPath(fromDir);
	const to = joinRootPath(toDir);

	fs.mkdirSync(path.dirname(to), { recursive: true });

	if (!fs.existsSync(from)) {
		console.error(`image cannot find: ${from}`);
	} else if (fs.existsSync(to)) {
		console.error(`image already exists: ${to}`);
	} else {
		fs.copyFileSync(from, to);
		console.log(`image copied: ${to}`);
	}
};

export { findFiles, copyFile, readFile };
