export type JsonObject = Record<string, unknown>;

const MAX_MERGE_DEPTH = 32;

const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);

export function isPlainObject(value: unknown): value is JsonObject {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function mergeObjects(
  base: JsonObject,
  override: JsonObject,
  depth: number,
): JsonObject {
  if (depth >= MAX_MERGE_DEPTH) return base;
  const result: JsonObject = {};
  for (const [key, value] of Object.entries(base)) {
    if (UNSAFE_KEYS.has(key)) continue;
    result[key] = value;
  }
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined || UNSAFE_KEYS.has(key)) continue;
    result[key] = Object.prototype.hasOwnProperty.call(result, key)
      ? mergeObjectsValue(result[key], value, depth + 1)
      : value;
  }
  return result;
}

function mergeObjectsValue(
  base: unknown,
  override: unknown,
  depth: number,
): unknown {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }
  return mergeObjects(base, override, depth);
}

export function deepMerge<T>(base: T, override: unknown): T {
  return mergeObjectsValue(base, override, 0) as T;
}

export function applyOverride<T>(fallback: T, override: unknown): T {
  if (override === undefined || override === null) return fallback;
  return deepMerge(fallback, override);
}

export function isLocalizedValue(
  value: unknown,
): value is { ko: string; en?: string } {
  return (
    isPlainObject(value) &&
    typeof value.ko === "string" &&
    (value.en === undefined || typeof value.en === "string")
  );
}

export function resolveLeaf(locale: string, value: unknown): unknown {
  if (isLocalizedValue(value)) {
    if (locale === "en") return value.en || value.ko;
    return value.ko;
  }
  return value;
}

export type Localized<T> = T | { ko: T; en?: T };

export function localizeTree<T>(locale: string, value: T): T {
  if (isLocalizedValue(value)) {
    return resolveLeaf(locale, value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((entry) => localizeTree(locale, entry)) as unknown as T;
  }
  if (isPlainObject(value)) {
    const result: JsonObject = {};
    for (const [key, entry] of Object.entries(value)) {
      result[key] = localizeTree(locale, entry);
    }
    return result as T;
  }
  return value;
}
