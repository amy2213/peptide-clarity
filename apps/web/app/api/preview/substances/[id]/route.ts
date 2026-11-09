import { withOwnerPreview, previewError } from "@/lib/preview-guard";
import { findSubstance } from "@/lib/preview-store";
import { validId } from "@/lib/preview-input";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req:Request, {params}:{params:Promise<{id:string}>}) {
  return withOwnerPreview(req, async () => {
    const {id}=await params;
    if(!validId(id)) return { error:"invalid_id" };
    const found=await findSubstance(id);
    return found ?? {error:"not_found"};
  });
}
