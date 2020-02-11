import React, { useState } from "react";
import styled from "styled-components";
import { ChromePicker, ColorResult } from "react-color";
import { EditableFragmentData } from "../Editable";
import Label from "../../Label";
import Toggle from "../../Toggle";

interface ColorButtonProps {
  fill: string;
}

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const ColorButton = styled.button<ColorButtonProps>`
  border: none;
  background: ${props => props.theme.color.input};
  border-radius: 4px;
  width: 55px;
  height: 43px;
  padding: 8px;
  cursor: pointer;

  span {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-color: ${props => props.fill};
  }

  &:focus {
    outline: none;
    background-color: ${props => props.theme.color.inputActive};
    box-shadow: 0 0 0 1px ${props => props.theme.color.inputBoxShadow};
  }
`;

interface StrokeInputProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
}

const StrokeInput = ({ data, updateData }: StrokeInputProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleStrokeToggle = () => {
    updateData({
      ...data,
      stroke: {
        ...data.stroke,
        enabled: !data.stroke.enabled
      }
    });
  };

  const handleColorButtonClick = () => {
    setShowColorPicker(prevState => !prevState);
  };

  const handleColorChange = (color: ColorResult) => {
    updateData({
      ...data,
      stroke: {
        ...data.stroke,
        color: color.hex
      }
    });
  };

  return (
    <>
      <Label>Stroke Color</Label>
      <Row>
        <Toggle
          text=""
          checked={data.stroke.enabled}
          onChange={handleStrokeToggle}
        />
        {data.stroke.enabled && (
          <ColorButton
            aria-label="Change stroke color"
            fill={data.stroke.color}
            onClick={handleColorButtonClick}
          >
            <span />
          </ColorButton>
        )}
      </Row>
      {showColorPicker && (
        <ChromePicker color={data.stroke.color} onChange={handleColorChange} />
      )}
    </>
  );
};

export default StrokeInput;
