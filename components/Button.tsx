import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  color: #ffffff;
  padding: 10px 14px;
  font-size: 15px;
  background-color: ${props => props.theme.color.brand};
  font-weight: 600;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: none;
    background-color: #8d4def;
    box-shadow: 0 0 0 1px #e4effa;
  }
`;

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton type="button" {...props} />;
};

export default Button;
