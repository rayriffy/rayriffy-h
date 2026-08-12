import { expect, test } from "bun:test";
import sharp from "sharp";
import { inspectSourceImage } from "../src/image";

const createAnimatedWebp = async () => {
  const frames = await Promise.all(
    ["red", "blue"].map((background) =>
      sharp({
        create: {
          background,
          channels: 4,
          height: 2,
          width: 2,
        },
      })
        .png()
        .toBuffer(),
    ),
  );

  return sharp(frames, { join: { animated: true } })
    .webp()
    .toBuffer();
};

test("falls back to Sharp metadata for animated WebP", async () => {
  const image = await createAnimatedWebp();
  const imagePrototype = Bun.Image.prototype as { metadata: () => Promise<unknown> };
  const originalMetadata = imagePrototype.metadata;
  imagePrototype.metadata = async () => {
    throw new Error("Image: decode failed");
  };

  try {
    expect(await sharp(image, { animated: true }).metadata()).toMatchObject({
      format: "webp",
      pages: 2,
    });
    await expect(inspectSourceImage(image)).resolves.toMatchObject({
      format: "webp",
      image: null,
      isAnimated: true,
    });
  } finally {
    imagePrototype.metadata = originalMetadata;
  }
});
