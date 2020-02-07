import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: flex;
  align-items: center;

  & > span {
    display: block;
    margin: 0 0 0 10px;
  }
`;

const Container = styled.div`
  position: relative;
`;

const Switch = styled.span<{
  checked: boolean;
}>`
  position: relative;
  display: block;
  width: 40px;
  height: 20px;
  border-radius: 20px;
  background-color: ${props => (props.checked ? "#9147ff" : "#b2b2b2")};
  cursor: pointer;

  &:before {
    content: "";
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    transform: translateX(${props => (props.checked ? 20 : 0)}px);
    transition: 0.3s;
    background-color: #ffffff;
    border-radius: 50%;
  }
`;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;

  &:focus + ${Switch} {
    box-shadow: 0 0 4px ${props => props.theme.color.brand},
      inset 0 0 0 2px ${props => props.theme.color.brand};
  }
`;

interface ToggleProps {
  text: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

const Toggle = ({ text, checked, onChange, className }: ToggleProps) => {
  return (
    <Label className={className}>
      <Container>
        <Checkbox type="checkbox" checked={checked} onChange={onChange} />
        <Switch checked={checked} />
      </Container>
      <span>{text}</span>
    </Label>
  );
};

export default Toggle;
