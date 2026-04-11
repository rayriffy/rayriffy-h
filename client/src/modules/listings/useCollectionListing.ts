import { type ListingResult } from "@riffyh/commons";
import { useQuery } from "@tanstack/react-query";
import { useCollectionsAtom } from "modules/atoms/collectionsAtom";
import { useSearchParams } from "react-router";
import {
  buildMergedAdvancedSearch,
  galleryMatchesAdvancedSearch,
} from "modules/collectionSearch/galleryTransformers";
import { paginateMatches } from "modules/collectionSearch/paginationUtils";

const paginationSizeLimit = 25;

export const useCollectionListing = () => {
  const [searchParams] = useSearchParams();

  const collection = useCollectionsAtom();

  const query = searchParams.get("q");
  const page = Number(searchParams.get("p")) || 1;

  return useQuery({
    queryKey: ["collection", query, page, collection],
    queryFn: async () => {
      if (query === null || query === "") {
        return {
          galleries: collection.slice((page - 1) * paginationSizeLimit, paginationSizeLimit * page),
          maximumPages: Math.ceil(collection.length / paginationSizeLimit),
          currentPage: page,
        } satisfies ListingResult;
      }

      const parsed = buildMergedAdvancedSearch(query, []);
      const { totalPages, items } = paginateMatches(
        collection,
        page,
        (gallery) => galleryMatchesAdvancedSearch(gallery, parsed),
        paginationSizeLimit,
      );

      return {
        galleries: items,
        maximumPages: totalPages,
        currentPage: page,
      } satisfies ListingResult;
    },
  });
};
