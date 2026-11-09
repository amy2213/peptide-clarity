import { withOwnerPreview, previewError } from "@/lib/preview-guard";
import { listCompanies } from "@/lib/preview-store";
import { readPage } from "@/lib/preview-input";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  return withOwnerPreview(req, async () => {
    const page=readPage(req.url);
    return page ? listCompanies(page.limit,page.offset) : previewError("invalid_query",400);
  });
}
