import sharp from "sharp";

export type SourceImage = {
  format: string;
  image: Bun.Image | null;
  isAnimated: boolean;
};

const isWebp = (input: Buffer) =>
  input.length >= 12 &&
  input.subarray(0, 4).equals(Buffer.from("RIFF")) &&
  input.subarray(8, 12).equals(Buffer.from("WEBP"));

export const inspectSourceImage = async (input: Buffer): Promise<SourceImage> => {
  if (isWebp(input)) {
    const metadata = await sharp(input, { animated: true }).metadata();

    return {
      format: metadata.format,
      image: null,
      isAnimated: (metadata.pages ?? 1) > 1,
    };
  }

  try {
    const image = new Bun.Image(input);
    const metadata = await image.metadata();

    return {
      format: metadata.format,
      image,
      isAnimated: false,
    };
  } catch {
    const metadata = await sharp(input, { animated: true }).metadata();
    return {
      format: metadata.format,
      image: null,
      isAnimated: (metadata.pages ?? 1) > 1,
    };
  }
};
