import type { Gallery } from "@riffyh/commons";
import { BlurredImage } from "modules/layout/BlurredImage";
import type { FunctionComponent } from "react";

interface Props {
  gallery: Omit<Gallery, "pages" | "tags">;
}

export const Poster: FunctionComponent<Props> = ({ gallery }) => {
  return (
    <article className="group relative">
      <div className="flex justify-center">
        <div className="overflow-hidden rounded-lg">
          <BlurredImage
            src={gallery.cover.src}
            dataSource={gallery.key}
            alt={gallery.title.display}
            width={gallery.cover.width}
            height={gallery.cover.height}
            type="cover"
          />
        </div>
      </div>
      <section className="mt-3">
        <div className="flex justify-between space-x-2">
          {gallery.language && <img src={"/flags/" + gallery.language + ".svg"} className="w-6" />}
          <p className="truncate font-medium text-base-content">{gallery.title.display}</p>
        </div>
      </section>
    </article>
  );
};
