import { MinusIcon, PlusIcon } from "lucide-react";
import { useCallback, type FunctionComponent } from "react";
import { collectionsAtom, useCollectionsAtom } from "modules/atoms/collectionsAtom";
import type { GalleryResult } from "@riffyh/commons";
import { Button } from "@heroui/react";

interface Props {
  gallery: GalleryResult;
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
          language: gallery.language,
          title: gallery.title,
          cover: gallery.cover,
          tags: gallery.tags,
        },
        ...collections,
      ]);
    }
  }, [isFavorite, collections, collectionsAtom]);

  return (
    <Button
      isIconOnly
      variant="secondary"
      aria-label={isFavorite ? "Remove from collection" : "Add to collection"}
      onPress={handleToggleFavorite}
    >
      {isFavorite ? <MinusIcon className="w-8" /> : <PlusIcon className="w-7" />}
    </Button>
  );
};
