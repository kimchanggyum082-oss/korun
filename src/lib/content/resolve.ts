import { applyOverride } from "./merge";
import { getPublished, listEntities } from "./store";

export async function resolveEntity<T>(
  entityKey: string,
  fallback: T,
): Promise<T> {
  try {
    return applyOverride(fallback, await getPublished(entityKey));
  } catch (error) {
    console.error(
      `[content] failed to load published entity "${entityKey}"`,
      error,
    );
    return fallback;
  }
}

export async function resolveCollection<T extends Record<string, unknown>>(
  prefix: string,
  fallback: T,
  collectionKey?: string,
): Promise<T> {
  try {
    let result: T = fallback;
    if (collectionKey) {
      result = applyOverride(result, await getPublished(collectionKey));
    }
    const overrides = await listEntities(prefix);
    for (const row of overrides) {
      if (row.publishedJson === null || row.publishedJson === undefined) {
        continue;
      }
      const key = row.key.slice(prefix.length);
      if (!Object.prototype.hasOwnProperty.call(result, key)) continue;
      result = {
        ...result,
        [key]: applyOverride(result[key], row.publishedJson),
      };
    }
    return result;
  } catch (error) {
    console.error(
      `[content] failed to load published collection "${prefix}"${
        collectionKey ? ` (key "${collectionKey}")` : ""
      }`,
      error,
    );
    return fallback;
  }
}
