import React, { ChangeEvent } from "react";
import styled from "styled-components";
import presets from "../../../config/presets";
import Label from "../../Label";

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 14px;
  color: #8898aa;
  background-color: ${props => props.theme.color.input};
  font-size: 16px;
  border: none;
  border-radius: 4px;

  &:focus {
    outline: none;
    background-color: ${props => props.theme.color.inputActive};
    box-shadow: 0 0 0 1px ${props => props.theme.color.inputBoxShadow};
  }
`;

interface ThemeInputProps {
  preset: string;
  changePreset: (preset: string) => void;
}

const ThemeInput = ({ preset, changePreset }: ThemeInputProps) => {
  const handlePresetChange = (e: ChangeEvent<HTMLSelectElement>) => {
    changePreset(e.target.value);
  };

  return (
    <>
      <Label>Font Family</Label>
      <StyledSelect onChange={handlePresetChange} value={preset}>
        {Object.keys(presets).map(key => {
          return (
            <option key={key} value={presets[key]}>
              {key}
            </option>
          );
        })}
      </StyledSelect>
    </>
  );
};

export default ThemeInput;
