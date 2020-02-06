import React, { ChangeEvent } from "react";
import { EditableFragmentData } from "../Editable";
import Input from "../../Input";
import Label from "../../Label";

interface TextInputProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
}

const TextInput = ({ data, updateData }: TextInputProps) => {
  const id = "textInput";

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateData({
      ...data,
      text: e.target.value
    });
  };

  return (
    <>
      <Label htmlFor={id}>Text</Label>
      <Input
        id={id}
        type="text"
        value={data.text}
        placeholder="Insert text"
        onChange={handleTextChange}
      />
    </>
  );
};

export default TextInput;
