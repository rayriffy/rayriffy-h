import { Elysia } from "elysia";
import {
  acceptsToon,
  encodeToonSync,
  TOON_CONTENT_TYPE_HEADER,
  type ToonEncodeOptions,
} from "@toon-tools/core";

export type { ToonEncodeOptions as ToonOptions } from "@toon-tools/core";

export function toon(options?: ToonEncodeOptions) {
  return new Elysia({ name: "elysia-toon" }).mapResponse("global", ({ request, responseValue }) => {
    if (!acceptsToon(request.headers.get("Accept"))) return;

    if (responseValue === null || responseValue === undefined || typeof responseValue !== "object")
      return;

    const toonBody = encodeToonSync(responseValue, options);
    return new Response(toonBody, {
      headers: { "Content-Type": TOON_CONTENT_TYPE_HEADER },
    });
  });
}
