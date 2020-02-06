import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { EditableFragmentData } from "../Editable";
import Label from "../../Label";
import Input from "../../Input";
import Button from "../../Button";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px 0;

  & div {
    width: 50%;
  }

  & div + div {
    margin-left: 20px;
  }
`;

interface PositionInputProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
  centerText: () => void;
}

const PositionInput = ({
  data,
  updateData,
  centerText
}: PositionInputProps) => {
  const handlePositionChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateData({
      ...data,
      [e.target.id]: parseInt(e.target.value)
    });
  };

  return (
    <>
      <Row>
        <div>
          <Label>Top</Label>
          <Input
            id="y"
            type="number"
            value={data.y}
            placeholder="Insert text"
            onChange={handlePositionChange}
          />
        </div>
        <div>
          <Label>Left</Label>
          <Input
            id="x"
            type="number"
            value={data.x}
            placeholder="Insert text"
            onChange={handlePositionChange}
          />
        </div>
      </Row>
      <Button onClick={centerText}>Reset To Center</Button>
    </>
  );
};

export default PositionInput;
