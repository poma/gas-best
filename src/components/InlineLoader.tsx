import ContentLoader from "react-content-loader";
import { useTheme } from "styled-components";

const InlineLoader = ({ width = "100%" }: { width?: string }) => {
  const theme = useTheme();

  return (
    <ContentLoader
      backgroundColor={theme.bg.loader}
      foregroundColor={theme.fg.loader}
      style={{
        display: "inline-block",
        width,
        height: "1em",
        verticalAlign: "top",
        opacity: 0.6,
      }}
    >
      <rect x="0" y="0" rx="2" ry="2" width={width} height="1em" />
    </ContentLoader>
  );
};

export default InlineLoader;
