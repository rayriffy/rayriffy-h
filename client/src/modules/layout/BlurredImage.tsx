import { useSettingsAtom } from "modules/atoms/settingsAtom";
import { useActiveServer } from "modules/utils/useActiveServer";
import type { FunctionComponent } from "react";

interface Props {
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
}) => {
  const { safemode } = useSettingsAtom();
  const activeServer = useActiveServer();

  return (
    <picture>
      <source
        srcSet={`${activeServer?.config.baseUrl}/image?${new URLSearchParams({ url: src, format: "webp", dataSource }).toString()}`}
      />
      <img
        src={`${activeServer?.config.baseUrl}/image?${new URLSearchParams({ url: src, format: "jpg", dataSource }).toString()}`}
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
