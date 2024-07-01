import React from 'react';
import Slider, { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const HandleTooltip = ({ value, dragging, index, ...restProps }: any) => (
  <Tooltip
    key={index}
    overlay={`£${value}`}
    visible={dragging}
    placement="top"
  >
    <div
      {...restProps}
      style={{
        ...restProps.style,
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '2px solid #4299e1',
        borderRadius: '50%',
        cursor: 'pointer',
      }}
    />
  </Tooltip>
);

const TooltipSlider: React.FC<SliderProps> = (props) => (
  <Slider
    {...props}
    handleRender={(node, handleProps) => {
      return <HandleTooltip {...handleProps} />;
    }}
    className="w-full"
  />
);

export default TooltipSlider;
