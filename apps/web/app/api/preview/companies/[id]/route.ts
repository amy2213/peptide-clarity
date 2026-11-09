import { withOwnerPreview } from "@/lib/preview-guard";
import { findCompany } from "@/lib/preview-store";
import { validId } from "@/lib/preview-input";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req:Request,{params}:{params:Promise<{id:string}>}) {
  return withOwnerPreview(req,async () => {
    const {id}=await params;
    if(!validId(id))return {error:"invalid_id"};
    return await findCompany(id) ?? {error:"not_found"};
  });
}
