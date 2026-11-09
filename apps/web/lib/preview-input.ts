export function readPage(url: string) {
  const params = new URL(url).searchParams;
  const rawLimit = Number(params.get("limit") ?? "24");
  const rawOffset = Number(params.get("offset") ?? "0");
  if (!Number.isSafeInteger(rawLimit) || rawLimit < 1 || rawLimit > 50 ||
      !Number.isSafeInteger(rawOffset) || rawOffset < 0 || rawOffset > 5000) {
    return null;
  }
  return { limit:rawLimit, offset:rawOffset };
}
export function readSearch(url: string) {
  const value = new URL(url).searchParams.get("search") ?? "";
  return value.length > 80 || /[\x00-\x1f\x7f]/.test(value) ? null : value.trim();
}
export function validId(id: string) {
  return id.length >= 1 && id.length <= 90 && /^[a-z0-9][a-z0-9-]*$/i.test(id);
}
