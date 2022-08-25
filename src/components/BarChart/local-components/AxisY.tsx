import { useEffect, useRef } from 'react';
import { axisLeft, ScaleLinear, select } from 'd3';

interface Props {
  scale: ScaleLinear<number, number, never>;
}

export const AxisY: React.FC<Props> = (props) => {
  const { scale } = props;

  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
};
