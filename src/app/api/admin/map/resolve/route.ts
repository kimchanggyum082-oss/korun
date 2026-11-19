import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/auth/session";
import {
  clampLat,
  clampLng,
  clampZoom,
  googlePlaceQueryFromUrl,
  parseGoogleMapsUrl,
} from "@/lib/google-map";

export const runtime = "nodejs";

const MAX_HOPS = 6;
const TIMEOUT_MS = 12_000;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

const ALLOWED_HOSTS = new Set([
  "maps.app.goo.gl",
  "goo.gl",
  "google.com",
  "www.google.com",
  "maps.google.com",
]);

function isAllowed(url: URL): boolean {
  return url.protocol === "https:" && ALLOWED_HOSTS.has(url.hostname);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "로그인이 필요합니다. / Sign in required." },
      { status: 401 },
    );
  }

  const payload = (await request.json().catch(() => null)) as {
    url?: unknown;
  } | null;
  if (!payload || typeof payload.url !== "string") {
    return NextResponse.json(
      {
        error: "Google Maps URL을 입력해 주세요. / Enter a Google Maps URL.",
      },
      { status: 400 },
    );
  }

  let current: URL;
  try {
    current = new URL(payload.url.trim());
  } catch {
    return NextResponse.json(
      {
        error:
          "올바른 Google Maps URL이 아닙니다. / That is not a valid Google Maps URL.",
      },
      { status: 400 },
    );
  }
  if (!isAllowed(current)) {
    return NextResponse.json(
      {
        error:
          "Google Maps 주소만 확인할 수 있습니다. / Only Google Maps URLs are supported.",
      },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let response: Response | null = null;
    for (let hop = 0; hop < MAX_HOPS; hop += 1) {
      if (!isAllowed(current)) {
        return NextResponse.json(
          { error: "허용되지 않은 주소로 이동했습니다." },
          { status: 400 },
        );
      }
      response = await fetch(current, {
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml",
        },
      });
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location) break;
        const next = new URL(location, current);
        if (!isAllowed(next)) {
          return NextResponse.json(
            {
              error:
                "허용되지 않은 주소로 이동했습니다. / The link redirected to a disallowed host.",
            },
            { status: 400 },
          );
        }
        current = next;
        continue;
      }
      break;
    }

    if (!response) {
      return NextResponse.json(
        {
          error:
            "Google Maps 링크를 확인하지 못했습니다. / Could not resolve the Google Maps link.",
        },
        { status: 502 },
      );
    }
    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Google Maps 링크를 확인하지 못했습니다. / Could not resolve the Google Maps link.",
        },
        { status: 502 },
      );
    }

    const finalUrl = current.toString();
    const html = await response.text();
    const point = parseGoogleMapsUrl(finalUrl) ?? parseGoogleMapsUrl(html);
    if (point) {
      return NextResponse.json({
        lat: clampLat(point.lat),
        lng: clampLng(point.lng),
        zoom: point.zoom === undefined ? undefined : clampZoom(point.zoom),
        finalUrl,
      });
    }

    const query = googlePlaceQueryFromUrl(finalUrl);
    if (query) {
      return NextResponse.json({ query, finalUrl });
    }

    return NextResponse.json(
      {
        error:
          "링크에서 좌표를 찾지 못했습니다. Google Maps 주소창의 URL을 복사해 붙여넣어 주세요. / Could not find coordinates. Paste the URL from the Google Maps address bar.",
      },
      { status: 422 },
    );
  } catch {
    return NextResponse.json(
      { error: "Google Maps 링크를 확인하지 못했습니다." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
