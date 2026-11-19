/**
 * Google Maps helpers that do not require an API key.
 *
 * The public map is rendered with Google's keyless `output=embed` endpoint,
 * generated from the coordinates the admin picks in the dashboard.
 */

export const DEFAULT_MAP_ZOOM = 16;
export const MIN_MAP_ZOOM = 1;
/** OSM tiles stop at 19; the same cap keeps the picker and Google preview aligned. */
export const MAX_MAP_ZOOM = 19;

export type MapPoint = {
  lat: number;
  lng: number;
  zoom?: number;
};

export function clampLat(value: number): number {
  return Math.min(90, Math.max(-90, value));
}

export function clampLng(value: number): number {
  return Math.min(180, Math.max(-180, value));
}

export function clampZoom(value: number): number {
  return Math.min(MAX_MAP_ZOOM, Math.max(MIN_MAP_ZOOM, Math.round(value)));
}

export function parseCoordinate(value: unknown): number | undefined {
  const parsed =
    typeof value === "number"
      ? value
      : Number.parseFloat(String(value ?? "").trim());
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function parseLat(value: unknown): number | undefined {
  const parsed = parseCoordinate(value);
  return parsed === undefined ? undefined : clampLat(parsed);
}

export function parseLng(value: unknown): number | undefined {
  const parsed = parseCoordinate(value);
  return parsed === undefined ? undefined : clampLng(parsed);
}

export function parseZoom(value: unknown): number {
  const parsed = parseCoordinate(value);
  return parsed === undefined ? DEFAULT_MAP_ZOOM : clampZoom(parsed);
}

export function googleMapEmbedUrl(
  lat: number,
  lng: number,
  zoom: number = DEFAULT_MAP_ZOOM,
): string {
  return `https://maps.google.com/maps?q=${clampLat(lat)},${clampLng(lng)}&z=${clampZoom(zoom)}&output=embed`;
}

export function googleMapLink(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${clampLat(lat)},${clampLng(lng)}`;
}

/** Keyless Google Maps embed for an address/place query (no pin required). */
export function googleMapQueryEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query.trim())}&output=embed`;
}

/** Extract the place name from a Google Maps `/maps/place/<name>/…` URL. */
export function googlePlaceQueryFromUrl(input: string): string | undefined {
  try {
    const url = new URL(input);
    const match = /^\/maps\/place\/([^/]+)/.exec(url.pathname);
    if (!match) return undefined;
    const query = decodeURIComponent(match[1].replace(/\+/g, " ")).trim();
    return query || undefined;
  } catch {
    return undefined;
  }
}

function pointOf(lat: number, lng: number, zoom?: number): MapPoint | null {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return {
    lat,
    lng,
    zoom:
      zoom === undefined || !Number.isFinite(zoom)
        ? undefined
        : clampZoom(zoom),
  };
}

/**
 * Extract coordinates from a normal Google Maps browser URL.
 * Supports the `@lat,lng,zoomz` segment, `!3dlat!4dlng` place data, and
 * `?q=lat,lng` / `?ll=lat,lng` query parameters. The `pb=` embed parameter is
 * opaque and intentionally not parsed.
 */
export function parseGoogleMapsUrl(input: string): MapPoint | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let text = trimmed;
  try {
    text = decodeURIComponent(trimmed);
  } catch {
    text = trimmed;
  }

  const at = /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(\d+(?:\.\d+)?)z?/i.exec(
    text,
  );
  if (at) return pointOf(Number(at[1]), Number(at[2]), Number(at[3]));

  const place =
    /(?:!|%21)3d(-?\d+(?:\.\d+)?)(?:%21|!)4d(-?\d+(?:\.\d+)?)/i.exec(text);
  if (place) return pointOf(Number(place[1]), Number(place[2]));

  const query =
    /[?&](?:q|query|ll|center)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:,(\d+(?:\.\d+)?)z?)?/i.exec(
      text,
    );
  if (query) {
    return pointOf(
      Number(query[1]),
      Number(query[2]),
      query[3] ? Number(query[3]) : undefined,
    );
  }

  const plain = /^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/.exec(text);
  if (plain) return pointOf(Number(plain[1]), Number(plain[2]));

  return null;
}
