import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content/articles");

export async function getArticleMarkdown(slug: string) {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { content, data } = matter(fs.readFileSync(filePath, "utf8"));
  const processed = await remark().use(html).process(content);
  return {
    frontmatter: data as Record<string, string>,
    html: processed.toString(),
  };
}
