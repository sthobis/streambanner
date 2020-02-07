import React, { useState } from "react";
import styled from "styled-components";
import { ChromePicker, ColorResult } from "react-color";
import { EditableFragmentData } from "../Editable";
import Label from "../../Label";

interface ColorButtonProps {
  fill: string;
}

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

interface ColorInputProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
}

const ColorInput = ({ data, updateData }: ColorInputProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorButtonClick = () => {
    setShowColorPicker(prevState => !prevState);
  };

  const handleColorChange = (color: ColorResult) => {
    updateData({
      ...data,
      fill: color.hex
    });
  };

  return (
    <>
      <Label>Font Color</Label>
      <ColorButton
        type="button"
        aria-label="Change color"
        fill={data.fill}
        onClick={handleColorButtonClick}
      >
        <span />
      </ColorButton>
      {showColorPicker && (
        <ChromePicker
          disableAlpha={true}
          color={data.fill}
          onChange={handleColorChange}
        />
      )}
    </>
  );
};

export default ColorInput;
