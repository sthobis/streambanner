import React, { ChangeEvent } from "react";
import { EditableFragmentData } from "../Editable";
import Label from "../../Label";
import Input from "../../Input";

interface FontSizeInputProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
}

const FontSizeInput = ({ data, updateData }: FontSizeInputProps) => {
  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateData({
      ...data,
      fontSize: parseInt(e.target.value)
    });
  };

  return (
    <>
      <Label>Font Size</Label>
      <Input
        type="number"
        value={data.fontSize}
        onChange={handleFontSizeChange}
      />
    </>
  );
};

export default FontSizeInput;
