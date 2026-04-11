import { useQuery } from "@tanstack/react-query";
import { BlurredImage } from "modules/layout/BlurredImage";
import { useEden } from "modules/utils/useEden";
import { Fragment } from "react/jsx-runtime";
import { useParams } from "router";
import { BookOpenTextIcon } from "lucide-react";
import { TagsRenderer } from "modules/reader/TagsRenderer";
import { Favorite } from "modules/reader/Favorite";
import { CenterLayout } from "modules/layout/CenterLayout";
import { Loading } from "modules/listings/Loading";
import { Failure } from "modules/listings/Failure";

const Page = () => {
  const { key, id } = useParams("/g/:key/:id");
  const eden = useEden();
  const { isLoading, data, error } = useQuery({
    queryKey: ["gallery", key, id],
    queryFn: async () => {
      const response = await eden!.gallery.get({
        query: {
          id,
          dataSource: key,
        },
      });
      return response.data;
    },
  });

  if (isLoading)
    return (
      <CenterLayout className="min-h-[calc(100dvh-4rem)]">
        <Loading />
      </CenterLayout>
    );

  if (error || !data)
    return (
      <CenterLayout className="min-h-[calc(100dvh-4rem)]">
        <Failure error={!data ? new Error("unalbe to parse gallery") : error!} />
      </CenterLayout>
    );

  return (
    <Fragment>
      <section className="flex flex-col items-center space-y-6 p-4 container-lg">
        <div className="overflow-hidden rounded-xl shadow-md">
          <BlurredImage
            dataSource={data.key}
            src={data.cover.src}
            width={data.cover.width}
            height={data.cover.height}
            className="w-80"
          />
        </div>
        <article className="w-full">
          <span className="font-semibold text-gray-600 dark:text-gray-300">{data.id}</span>
          <h1 className="pt-2 text-2xl font-bold leading-tight text-gray-700 dark:text-white">
            {data.title.display}
          </h1>
          <h2 className="text-md font-bold text-gray-500 dark:text-gray-400">
            {data.title.original}{" "}
          </h2>
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">
            {data.pages.length} pages
          </h3>
          <div className="pt-2">
            <TagsRenderer tags={data.tags} />
          </div>
        </article>
        <div className="w-full">
          <Favorite gallery={data} />
        </div>
      </section>
      <div className="divider-item divider mb-8 container-4xl">
        <BookOpenTextIcon className="w-12" />
      </div>
      <section className="overflow-hidden container-4xl">
        {data.pages.map((page) => (
          <BlurredImage
            key={`reader-${page.order}`}
            dataSource={data.key}
            src={page.src}
            width={page.width}
            height={page.height}
            alt={`page ${page.order}`}
          />
        ))}
      </section>
    </Fragment>
  );
};

export default Page;
