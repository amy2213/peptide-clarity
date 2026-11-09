import { withOwnerPreview, previewError } from "@/lib/preview-guard";
import { listSubstances } from "@/lib/preview-store";
import { readPage, readSearch } from "@/lib/preview-input";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  return withOwnerPreview(req, async () => {
    const page=readPage(req.url), search=readSearch(req.url);
    if(!page || search===null) return previewError("invalid_query",400);
    return listSubstances(search,page.limit,page.offset);
  });
}
