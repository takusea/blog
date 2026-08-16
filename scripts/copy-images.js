import fs from "node:fs/promises";
import path from "node:path";

const srcDir = path.join(process.cwd(), "public/");
const destDir = path.join(process.cwd(), "dist");
const extensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

async function copyRecursive(src, dest) {
	await fs.mkdir(dest, { recursive: true });

	const entries = await fs.readdir(src, { withFileTypes: true });

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			await copyRecursive(srcPath, destPath);
		} else if (extensions.includes(path.extname(entry.name))) {
			try {
				await fs.access(destPath);
			} catch {
				await fs.copyFile(srcPath, destPath);
			}
		}
	}
}

copyRecursive(srcDir, destDir);
