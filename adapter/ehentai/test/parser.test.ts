import { expect, test } from "bun:test";

import { ehentai, exhentai } from "../src";
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
