import { TagType, type Tag } from "@riffyh/commons";
import { Fragment, type FunctionComponent } from "react";
import { Link } from "router";
import { tagTypes } from "./tagTypes";

interface Props {
  tags: Tag[];
}

export const TagsRenderer: FunctionComponent<Props> = ({ tags }) => {
  const sortedTags = tagTypes
    .map(
      (type) =>
        [type, tags.filter((tag) => tag.type === type.type)] as [
          { color: string; type: TagType },
          Tag[],
        ],
    )
    .filter(([_, o]) => o.length !== 0);

  return (
    <Fragment>
      {sortedTags.map(([type, tags]) => (
        <div className="flex pt-2" key={`tag-group-${type.type}`}>
          <span className="pr-2 pt-1 text-sm font-bold uppercase text-gray-700 dark:text-white">
            {type.type}
          </span>
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <Link
                key={`tag-${tag.id}`}
                to="/t/:key/:id"
                params={{ key: tag.key, id: tag.id }}
                className={`rounded-md px-2 py-1 text-xs uppercase text-white ${type.color} m-1 font-semibold`}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </Fragment>
  );
};
