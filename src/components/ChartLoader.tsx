import ContentLoader from "react-content-loader";
import { useTheme } from "styled-components";

interface ChartLoaderProps {
  width: number;
  height: number;
  data: number[];
}

export const ChartLoader: React.FC<ChartLoaderProps> = ({
  width,
  height,
  data,
}) => {
  const theme = useTheme();
  const section = width / data.length;
  const barWidth = section / 2;
  const gap = section / 2;

  return (
    <div style={{ width, height }}>
      <ContentLoader
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor={theme.bg.loader}
        foregroundColor={theme.fg.loader}
        style={{ paddingLeft: gap / 2 }}
      >
        {data.map((value, i) => {
          return (
            <rect
              key={i}
              x={i * (barWidth + gap)}
              y={height - value}
              rx="1"
              ry="1"
              width={barWidth}
              height={value}
            />
          );
        })}
      </ContentLoader>
    </div>
  );
};

export default ChartLoader;
