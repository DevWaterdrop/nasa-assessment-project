import { useEffect, useRef } from 'react';
import { axisBottom, ScaleBand, select } from 'd3';

interface Props {
  scale: ScaleBand<string>;
  transform: string;
}

export const AxisX: React.FC<Props> = (props) => {
  const { scale, transform } = props;

  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
};
