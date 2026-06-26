import { useSettingsAtom } from "modules/atoms/settingsAtom";
import { useActiveServer } from "modules/utils/useActiveServer";
import type { FunctionComponent } from "react";

interface Props {
  type?: "cover" | "page";
  dataSource: string;
  src: string;
  width: number;
  height: number;
  alt?: string | undefined;
  className?: string | undefined;
}

export const BlurredImage: FunctionComponent<Props> = ({
  src,
  width,
  height,
  alt,
  className,
  dataSource,
  type = "page",
}) => {
  const { safemode } = useSettingsAtom();
  const activeServer = useActiveServer();

  return (
    <picture>
      <source
        srcSet={`${activeServer?.config.baseUrl}/image?${new URLSearchParams({ url: src, format: "webp", dataSource, type }).toString()}`}
        type="image/webp"
      />
      <img
        src={`${activeServer?.config.baseUrl}/image?${new URLSearchParams({ url: src, format: "jpeg", dataSource, type }).toString()}`}
        loading="lazy"
        decoding="async"
        {...{
          width,
          height,
          alt,
          className: [className, safemode ? "blur-sm [clip-path:inset(0)]" : ""]
            .filter(Boolean)
            .join(" "),
        }}
      />
    </picture>
  );
};
