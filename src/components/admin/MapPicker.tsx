"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

import {
  DEFAULT_MAP_ZOOM,
  MAX_MAP_ZOOM,
  MIN_MAP_ZOOM,
  clampLat,
  clampLng,
  clampZoom,
  googleMapEmbedUrl,
  googleMapLink,
  parseGoogleMapsUrl,
} from "@/lib/google-map";
import { inputCls } from "./styles";

export type MapPickerValue = {
  lat: number | null;
  lng: number | null;
  zoom: number;
};

type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

const FALLBACK_CENTER: [number, number] = [37.443809, 126.810748];
const INITIAL_VIEW_ZOOM = 16;

function pinIcon() {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:28px;height:36px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.28))"><svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 35S26 22.4 26 13.4A12 12 0 1 0 2 13.4C2 22.4 14 35 14 35Z" fill="#00ac68" stroke="#fff" stroke-width="2"/><circle cx="14" cy="13.4" r="4" fill="#fff"/></svg></span>`,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
  });
}

function NominatimSearch({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(event: React.FormEvent) {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    setBusy(true);
    setError(null);
    setResults([]);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&q=${encodeURIComponent(q)}`,
        { headers: { Accept: "application/json" } },
      );
      if (!response.ok) throw new Error("search failed");
      const data = (await response.json()) as NominatimResult[];
      setResults(data);
      if (data.length === 0) {
        setError("검색 결과가 없습니다. / No results found.");
      }
    } catch {
      setError("주소 검색에 실패했습니다. / Address search failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={search} className="flex items-center gap-1.5">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="주소, 건물명, 장소명 검색 / Address, building or place"
          className={inputCls}
          aria-label="주소 또는 장소 검색 / Search address or place"
        />
        <button
          type="submit"
          disabled={busy}
          className="h-9 shrink-0 rounded-[3px] border border-black/10 px-2.5 text-[11px] font-semibold text-ink/60 transition-colors hover:border-black/20 disabled:opacity-50"
        >
          {busy ? "검색 중… / Searching…" : "검색 / Search"}
        </button>
      </form>
      {error ? <p className="text-[10px] text-[#a51c1c]">{error}</p> : null}
      {results.length > 0 ? (
        <ul className="flex max-h-40 flex-col gap-1 overflow-y-auto rounded-[4px] border border-black/10 p-1">
          {results.map((result) => (
            <li key={result.place_id}>
              <button
                type="button"
                onClick={() => {
                  onPick(Number(result.lat), Number(result.lon));
                  setResults([]);
                  setQuery("");
                }}
                className="w-full rounded-[3px] px-2 py-1.5 text-left text-[11px] leading-[16px] text-ink/70 transition-colors hover:bg-paper hover:text-ink"
              >
                {result.display_name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function MapPicker({
  value,
  onChange,
}: {
  value: MapPickerValue;
  onChange: (next: MapPickerValue) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const lastPointRef = useRef("");
  const [ready, setReady] = useState(false);
  const [googleUrl, setGoogleUrl] = useState("");
  const [googleError, setGoogleError] = useState<string | null>(null);
  const latest = useRef({ value, onChange });

  useEffect(() => {
    latest.current = { value, onChange };
  }, [value, onChange]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [
        value.lat ?? FALLBACK_CENTER[0],
        value.lng ?? FALLBACK_CENTER[1],
      ],
      zoom: value.zoom || INITIAL_VIEW_ZOOM,
      scrollWheelZoom: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);
    map.on("click", (event) => {
      const current = latest.current;
      current.onChange({
        lat: clampLat(event.latlng.lat),
        lng: clampLng(event.latlng.lng),
        zoom: map.getZoom(),
      });
    });
    map.on("zoomend", () => {
      const current = latest.current;
      if (current.value.zoom === map.getZoom()) return;
      current.onChange({ ...current.value, zoom: map.getZoom() });
    });
    mapRef.current = map;
    setReady(true);
    const timer = window.setTimeout(() => map.invalidateSize(), 0);
    return () => {
      window.clearTimeout(timer);
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lat = value.lat;
  const lng = value.lng;
  const zoom = value.zoom;

  useEffect(() => {
    if (!ready) return;
    const map = mapRef.current;
    if (!map) return;
    if (lat === null || lng === null) {
      markerRef.current?.remove();
      markerRef.current = null;
      lastPointRef.current = "";
      return;
    }
    const point: [number, number] = [lat, lng];
    if (!markerRef.current) {
      const marker = L.marker(point, {
        icon: pinIcon(),
        draggable: true,
      }).addTo(map);
      marker.on("dragend", () => {
        const next = marker.getLatLng();
        const current = latest.current;
        current.onChange({
          lat: clampLat(next.lat),
          lng: clampLng(next.lng),
          zoom: map.getZoom(),
        });
      });
      markerRef.current = marker;
    } else {
      markerRef.current.setLatLng(point);
    }
    const key = `${lat},${lng}`;
    if (lastPointRef.current !== key) {
      lastPointRef.current = key;
      map.setView(point, zoom, { animate: false });
    }
  }, [ready, lat, lng, zoom]);

  useEffect(() => {
    if (!ready) return;
    const map = mapRef.current;
    if (!map) return;
    if (map.getZoom() !== zoom) map.setZoom(zoom);
  }, [ready, zoom]);

  return (
    <div className="flex flex-col gap-3">
      <NominatimSearch
        onPick={(nextLat, nextLng) =>
          onChange({
            lat: clampLat(nextLat),
            lng: clampLng(nextLng),
            zoom: zoom || DEFAULT_MAP_ZOOM,
          })
        }
      />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const parsed = parseGoogleMapsUrl(googleUrl);
          if (!parsed) {
            setGoogleError(
              "Google Maps 주소에서 좌표를 찾지 못했습니다. 주소창의 URL을 붙여넣어 주세요. / Could not find coordinates in that Google Maps URL.",
            );
            return;
          }
          setGoogleError(null);
          setGoogleUrl("");
          onChange({
            lat: parsed.lat,
            lng: parsed.lng,
            zoom: parsed.zoom ?? zoom,
          });
        }}
        className="flex flex-col gap-1.5"
      >
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={googleUrl}
            onChange={(event) => setGoogleUrl(event.target.value)}
            placeholder="Google Maps 주소 붙여넣기 / Paste a Google Maps URL"
            className={inputCls}
            aria-label="Google Maps URL"
          />
          <button
            type="submit"
            className="h-9 shrink-0 rounded-[3px] border border-black/10 px-2.5 text-[11px] font-semibold text-ink/60 transition-colors hover:border-black/20"
          >
            적용 / Apply
          </button>
        </div>
        <p className="text-[10px] leading-[15px] text-ink/40">
          브라우저 주소창의 URL을 붙여넣으면 좌표를 자동으로 가져옵니다. 예:
          google.com/maps/@37.4438,126.8107,17z / Paste the browser URL to
          import its coordinates.
        </p>
        {googleError ? (
          <p className="text-[10px] text-[#a51c1c]">{googleError}</p>
        ) : null}
      </form>

      <div
        ref={containerRef}
        className="h-[320px] w-full rounded-[4px] border border-black/10 bg-paper/30"
        style={{ zIndex: 0 }}
        aria-label="지도 선택 / Map picker"
      />

      <div className="flex flex-wrap items-end gap-2">
        <label className="flex min-w-[120px] flex-1 flex-col gap-1">
          <span className="text-[10px] font-semibold text-ink/45">
            위도 / Latitude
          </span>
          <input
            type="number"
            step="any"
            value={lat ?? ""}
            onChange={(event) => {
              const raw = event.target.value.trim();
              if (raw === "") {
                onChange({ ...value, lat: null });
                return;
              }
              const parsed = Number.parseFloat(raw);
              if (!Number.isFinite(parsed)) return;
              onChange({ ...value, lat: clampLat(parsed) });
            }}
            className={inputCls}
            placeholder="37.4438"
          />
        </label>
        <label className="flex min-w-[120px] flex-1 flex-col gap-1">
          <span className="text-[10px] font-semibold text-ink/45">
            경도 / Longitude
          </span>
          <input
            type="number"
            step="any"
            value={lng ?? ""}
            onChange={(event) => {
              const raw = event.target.value.trim();
              if (raw === "") {
                onChange({ ...value, lng: null });
                return;
              }
              const parsed = Number.parseFloat(raw);
              if (!Number.isFinite(parsed)) return;
              onChange({ ...value, lng: clampLng(parsed) });
            }}
            className={inputCls}
            placeholder="126.8107"
          />
        </label>
        <label className="flex w-[100px] flex-col gap-1">
          <span className="text-[10px] font-semibold text-ink/45">
            줌 / Zoom
          </span>
          <input
            type="number"
            min={MIN_MAP_ZOOM}
            max={MAX_MAP_ZOOM}
            value={Number.isFinite(zoom) ? zoom : DEFAULT_MAP_ZOOM}
            onChange={(event) => {
              const parsed = Number.parseInt(event.target.value, 10);
              onChange({
                ...value,
                zoom: Number.isFinite(parsed)
                  ? clampZoom(parsed)
                  : DEFAULT_MAP_ZOOM,
              });
            }}
            className={inputCls}
          />
        </label>
        <button
          type="button"
          onClick={() => onChange({ lat: null, lng: null, zoom })}
          className="h-9 shrink-0 rounded-[3px] border border-black/10 px-2.5 text-[11px] font-semibold text-ink/50 transition-colors hover:text-ink"
        >
          핀 지우기 / Clear pin
        </button>
      </div>

      <p className="text-[10px] leading-[15px] text-ink/40">
        검색과 지도 선택은 OpenStreetMap을 사용하며 API 키가 필요 없습니다. 공개
        페이지는 선택한 좌표로 Google Maps 임베드를 표시합니다. / Search and pin
        placement use OpenStreetMap with no API key. The public page renders a
        Google Maps embed from the selected coordinates.
      </p>

      {lat !== null && lng !== null ? (
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-[4px] border border-black/10">
            <iframe
              src={googleMapEmbedUrl(lat, lng, zoom)}
              title="Google Maps 미리보기 / Google Maps preview"
              className="block h-[220px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={googleMapLink(lat, lng)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-semibold text-brand underline-offset-2 hover:underline"
          >
            Google Maps에서 열기 / Open in Google Maps
          </a>
        </div>
      ) : (
        <p className="rounded-[4px] border border-dashed border-black/15 px-3 py-3 text-center text-[10px] text-ink/35">
          주소를 검색하거나 지도를 클릭해 핀을 설정하세요. / Search for an
          address or click the map to place a pin.
        </p>
      )}
    </div>
  );
}
