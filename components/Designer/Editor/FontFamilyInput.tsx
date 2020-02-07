import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { EditableFragmentData } from "../Editable";
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

export interface GoogleFontObject {
  kind: "webfonts#webfont";
  family: string;
  category: "sans-serif" | "serif" | "display" | "handwriting" | "monospace";
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: string[];
}

interface FontFamilyInputProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
  availableFonts: GoogleFontObject[];
}

const FontFamilyInput = ({
  data,
  updateData,
  availableFonts
}: FontFamilyInputProps) => {
  const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateData({
      ...data,
      fontFamily: e.target.value
    });
  };

  return (
    <>
      <Label>Font Family</Label>
      <StyledSelect onChange={handleFontFamilyChange} value={data.fontFamily}>
        {availableFonts.map(font => {
          return (
            <option key={font.family} value={font.family}>
              {font.family}
            </option>
          );
        })}
      </StyledSelect>
    </>
  );
};

export default FontFamilyInput;
