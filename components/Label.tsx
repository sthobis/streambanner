import React, { LabelHTMLAttributes } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  color: ${props => props.theme.color.primary};
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 5px 0;
`;

const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return <StyledLabel {...props} />;
};

export default Label;
