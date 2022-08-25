import type { ScaleBand, ScaleLinear } from 'd3';
import { NasaEntry } from '../../../services/nasa-api';
import { blue } from '@mui/material/colors';

interface Props {
  entries: NasaEntry[];
  height: number;
  scaleX: ScaleBand<string>;
  scaleY: ScaleLinear<number, number, never>;
}

export const Bars: React.FC<Props> = (props) => {
  const { entries, height, scaleX, scaleY } = props;

  return (
    <>
      {entries.map(({ name, velocity }) => (
        <rect
          key={name}
          x={scaleX(name)}
          y={scaleY(velocity)}
          width={scaleX.bandwidth()}
          height={height - scaleY(velocity)}
          fill={blue[500]}
        />
      ))}
    </>
  );
};
