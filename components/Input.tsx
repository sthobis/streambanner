import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
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

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <StyledInput {...props} />;
};

export default Input;
