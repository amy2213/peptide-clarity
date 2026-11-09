import { withOwnerPreview } from "@/lib/preview-guard";
import { snapshotHealth } from "@/lib/preview-store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  return withOwnerPreview(req, snapshotHealth);
}
