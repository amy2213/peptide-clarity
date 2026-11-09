import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

const headers = { "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow" };
export const noStoreHeaders = headers;

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function previewError(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers });
}

export async function withOwnerPreview(
  req: Request,
  handler: () => Promise<unknown>,
): Promise<NextResponse> {
  const secret = process.env.PREVIEW_ACCESS_TOKEN;
  if (!secret || secret.length < 32 || !process.env.DATABASE_URL) {
    return previewError("owner_preview_unconfigured", 503);
  }
  const provided = req.headers.get("x-preview-token") ?? "";
  if (!provided || provided.length > 512 || !timingSafeEqual(digest(provided), digest(secret))) {
    return previewError("unauthorized", 401);
  }
  try {
    return NextResponse.json(await handler(), { status: 200, headers });
  } catch {
    // No raw SQL, patient information, tokens, or supplier data in errors.
    console.error("owner_preview_data_request_failed");
    return previewError("temporary_preview_error", 503);
  }
}
