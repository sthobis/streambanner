import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EditableFragmentData } from "../Editable";
import TextInput from "./TextInput";
import ColorInput from "./ColorInput";
import FontSizeInput from "./FontSizeInput";
import FontFamilyInput, { GoogleFontObject } from "./FontFamilyInput";
import PositionInput from "./PositionInput";
import Button from "../../Button";

const Container = styled.div`
  position: fixed;
  top: ${props => props.theme.headerHeight};
  right: 0;
  width: ${props => props.theme.editorWidth};
  height: calc(100vh - ${props => props.theme.headerHeight});
  padding: 30px;
  box-shadow: 0 0 0 1px #e4effa;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  & + & {
    margin-top: 20px;
  }
`;

interface EditorProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
  centerText: () => void;
  removeBanner: () => void;
}

const Editor = ({
  data,
  updateData,
  centerText,
  removeBanner
}: EditorProps) => {
  const [availableFonts, setAvailableFonts] = useState<GoogleFontObject[]>([]);

  useEffect(() => {
    async function fetchAvailableFonts() {
      const result = await fetch(
        "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBUf2UqPsMpV8uppSs_wmxH2bNMJP9aE2Y&sort=alpha"
      );
      if (result.status === 200) {
        const fonts = (await result.json()).items as GoogleFontObject[];
        setAvailableFonts(fonts);
      }
    }
    fetchAvailableFonts();
  }, []);

  return (
    <Container>
      {data ? (
        <>
          <Row>
            <TextInput data={data} updateData={updateData} />
          </Row>
          <Row>
            <ColorInput data={data} updateData={updateData} />
          </Row>
          <Row>
            <FontSizeInput data={data} updateData={updateData} />
          </Row>
          <Row>
            <FontFamilyInput
              data={data}
              updateData={updateData}
              availableFonts={availableFonts}
            />
          </Row>
          <Row>
            <PositionInput
              data={data}
              updateData={updateData}
              centerText={centerText}
            />
          </Row>
          {data.removable && (
            <Row>
              <Button onClick={removeBanner}>Remove This Panel</Button>
            </Row>
          )}
        </>
      ) : (
        "No active element"
      )}
    </Container>
  );
};

export default Editor;
