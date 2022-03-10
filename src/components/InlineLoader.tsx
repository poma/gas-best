import ContentLoader from "react-content-loader";

export const InlineLoader = ({ width = "100%" }: { width?: string }) => (
  <ContentLoader
    backgroundColor="#303035"
    foregroundColor="#47474f"
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

export default InlineLoader;
