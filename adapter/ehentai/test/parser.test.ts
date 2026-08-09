import { expect, test } from "bun:test";

import { ehentai, exhentai } from "../src";
import { EhentaiClient } from "../src/client";
import { parseGalleryImagePages, parseImagePage, parseListingPage } from "../src/parser";

test("parses gallery references and pagination from a listing", () => {
  const listing = parseListingPage(
    `<table class="ptt"><tr><td><a>1</a><a>3</a></td></tr></table>
     <a href="/g/123/first-token/">first</a>
     <a href="https://e-hentai.org/g/456/second-token/">second</a>`,
    "https://e-hentai.org",
  );

  expect(listing).toEqual({
    galleries: [
      { gid: "123", token: "first-token" },
      { gid: "456", token: "second-token" },
    ],
    maximumPages: 3,
  });
});

test("parses ordered image page links and their final image", () => {
  const imagePages = parseGalleryImagePages(
    `<div id="gdt">
       <a href="/s/first/123-2"><div title="Page 2: two"></div></a>
       <a href="/s/second/123-1"><div title="Page 1: one"></div></a>
     </div>`,
    "https://e-hentai.org",
  );
  const image = parseImagePage(
    `<div id="i3"><img src="https://img.example/1.jpg" style="height:1200px;width:800px"></div>`,
  );

  expect(imagePages).toEqual([
    { order: 1, url: "https://e-hentai.org/s/second/123-1" },
    { order: 2, url: "https://e-hentai.org/s/first/123-2" },
  ]);
  expect(image).toEqual({ src: "https://img.example/1.jpg", width: 800, height: 1200 });
});

test("requires complete browser-session values for ExHentai", () => {
  expect(() => exhentai({} as never)).toThrow(
    "ExHentai requires: ipb_member_id, ipb_pass_hash, igneous",
  );
  expect(() => exhentai({ ipb_member_id: "member" } as never)).toThrow(
    "ExHentai requires: ipb_pass_hash, igneous",
  );
  expect(() =>
    exhentai({
      ipb_member_id: "member\nmalicious",
      ipb_pass_hash: "pass",
      igneous: "igneous",
    }),
  ).toThrow("ExHentai option values must not contain line breaks or semicolons");
  expect(ehentai().key).toBe("eh");
  expect(
    exhentai({
      ipb_member_id: "member",
      ipb_pass_hash: "pass",
      igneous: "igneous",
    }).key,
  ).toBe("ex");
});

test("returns gallery metadata before resolving paginated image pages", async () => {
  const originalFetch = globalThis.fetch;
  const requests: string[] = [];
  const galleryPage = (from: number, to: number) =>
    `<div id="gdt">${Array.from(
      { length: to - from + 1 },
      (_, index) =>
        `<a href="/s/key-${from + index}/1-${from + index}"><div title="Page ${from + index}"></div></a>`,
    ).join("")}</div>`;

  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    requests.push(url.toString());
    if (url.pathname === "/api.php") {
      return new Response(
        JSON.stringify({
          gmetadata: [
            {
              gid: "1",
              token: "token",
              category: "Misc",
              filecount: "11",
              tags: [],
              thumb: "https://img.example/cover.jpg",
              title: "Gallery",
            },
          ],
        }),
      );
    }
    if (url.pathname === "/g/1/token/") {
      return new Response(url.searchParams.has("p") ? galleryPage(11, 11) : galleryPage(1, 10));
    }
    if (url.pathname.startsWith("/s/")) {
      return new Response(`<div id="i3"><img src="https://img.example/${url.pathname}.jpg"></div>`);
    }
    throw new Error(`Unexpected request: ${url}`);
  };

  try {
    const client = new EhentaiClient("e-hentai.org");
    const gallery = await client.getGallery({ id: "1.token" });

    expect(gallery).toMatchObject({ id: "1.token", pageCount: 11 });
    expect(gallery.tags).toContainEqual(
      expect.objectContaining({ id: "category:misc", name: "Misc" }),
    );
    expect("pages" in gallery).toBe(false);
    expect(requests).toEqual(["https://e-hentai.org/api.php"]);

    const firstPage = await client.getGalleryPages({ id: "1.token", offset: 0, limit: 10 });
    expect(firstPage.pages).toHaveLength(10);
    expect(firstPage.nextOffset).toBe(10);
    expect(requests).toContain("https://e-hentai.org/g/1/token/");

    const secondPage = await client.getGalleryPages({ id: "1.token", offset: 10, limit: 10 });
    expect(secondPage.pages).toHaveLength(1);
    expect(secondPage.nextOffset).toBeNull();
    expect(requests).toContain("https://e-hentai.org/g/1/token/?p=1");
    expect(requests.filter((request) => request === "https://e-hentai.org/api.php")).toHaveLength(
      1,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
