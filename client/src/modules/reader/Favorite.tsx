import { MinusIcon, PlusIcon } from "lucide-react";
import { useCallback, type FunctionComponent } from "react";
import { collectionsAtom, useCollectionsAtom } from "modules/atoms/collectionsAtom";
import type { Gallery } from "@riffyh/commons";

interface Props {
  gallery: Gallery;
}

export const Favorite: FunctionComponent<Props> = ({ gallery }) => {
  const collections = useCollectionsAtom();

  const isFavorite = collections.find(
    (collection) => collection.id === gallery.id && collection.key === gallery.key,
  );

  const handleToggleFavorite = useCallback(() => {
    // if exist then remove hentai from collection, otherwise add hentai to collection
    if (isFavorite) {
      collectionsAtom.set(collections.filter((o) => o.id !== gallery.id));
    } else {
      collectionsAtom.set([
        {
          id: gallery.id,
          key: gallery.key,
          title: gallery.title,
          cover: gallery.cover,
          tags: gallery.tags,
        },
        ...collections,
      ]);
    }
  }, [isFavorite, collections, collectionsAtom]);

  return (
    <button className="btn btn-square btn-secondary" onClick={handleToggleFavorite}>
      {isFavorite ? <MinusIcon className="w-8" /> : <PlusIcon className="w-7" />}
    </button>
  );
};
