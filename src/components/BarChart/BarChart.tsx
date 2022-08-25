import { Box } from '@mui/material';
import { NasaEntry } from '../../services/nasa-api';
import { useEffect, useMemo, useRef, useState } from 'react';
import { scaleBand, scaleLinear } from 'd3';
import { Bars } from './local-components/Bars';
import { AxisX } from './local-components/AxisX';
import { AxisY } from './local-components/AxisY';

interface Props {
  entries: NasaEntry[];
}

const MARGIN = 50;
const HEIGHT = 350;

export const BarChart: React.FC<Props> = (props) => {
  const { entries } = props;

  const [baseWidth, setBaseWidth] = useState(300);

  const ref = useRef<HTMLDivElement>(null);
  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;

      setBaseWidth(width);
    })
  );

  useEffect(() => {
    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [ref, observer]);

  const width = useMemo(() => baseWidth - MARGIN * 2, [baseWidth]);

  const scaleX = useMemo(
    () =>
      scaleBand()
        .domain(entries.map(({ name }) => name))
        .range([0, width])
        .padding(0.5),
    [entries, width]
  );

  const scaleY = useMemo(
    () =>
      scaleLinear()
        .domain([0, Math.max(...entries.map(({ velocity }) => velocity))])
        .range([HEIGHT, 0]),
    [HEIGHT, entries]
  );

  return (
    <Box ref={ref}>
      <svg width="100%" height={HEIGHT + MARGIN}>
        <g transform={`translate(${MARGIN * 1.15}, ${MARGIN / 2})`}>
          <AxisY scale={scaleY} />
          <AxisX scale={scaleX} transform={`translate(0, ${HEIGHT})`} />
          <Bars
            entries={entries}
            height={HEIGHT}
            scaleX={scaleX}
            scaleY={scaleY}
          />
        </g>
      </svg>
    </Box>
  );
};
