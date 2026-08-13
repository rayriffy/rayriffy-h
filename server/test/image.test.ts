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

const createStaticImage = (format: "png" | "webp") =>
  sharp({
    create: {
      background: "red",
      channels: 4,
      height: 2,
      width: 2,
    },
  })
    [format]()
    .toBuffer();

test("uses Sharp metadata for every WebP", async () => {
  const image = await createStaticImage("webp");

  await expect(new Bun.Image(image).metadata()).resolves.toMatchObject({
    format: "webp",
  });
  await expect(inspectSourceImage(image)).resolves.toMatchObject({
    format: "webp",
    image: null,
    isAnimated: false,
  });
});

test("uses Bun metadata for non-WebP images", async () => {
  const sourceImage = await inspectSourceImage(await createStaticImage("png"));

  expect(sourceImage).toMatchObject({
    format: "png",
    isAnimated: false,
  });
  expect(sourceImage.image).toBeInstanceOf(Bun.Image);
});

test("uses Sharp for animated WebP Bun fails to transform", async () => {
  const image = await createAnimatedWebp();
  const bunImage = new Bun.Image(image);
  bunImage.resize(1);
  bunImage.webp({ quality: 72 });

  await expect(bunImage.buffer()).rejects.toMatchObject({
    code: "ERR_IMAGE_DECODE_FAILED",
    message: "Image: decode failed",
  });
  expect(await sharp(image, { animated: true }).metadata()).toMatchObject({
    format: "webp",
    pages: 2,
  });
  await expect(inspectSourceImage(image)).resolves.toMatchObject({
    format: "webp",
    image: null,
    isAnimated: true,
  });
  const resizedImage = await sharp(image, { animated: true })
    .resize({ width: 1 })
    .webp({ quality: 72 })
    .toBuffer();
  expect(await sharp(resizedImage, { animated: true }).metadata()).toMatchObject({
    format: "webp",
    pages: 2,
  });
});
