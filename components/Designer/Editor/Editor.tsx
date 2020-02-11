import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EditableFragmentData } from "../Editable";
import TextInput from "./TextInput";
import ColorInput from "./ColorInput";
import StrokeInput from "./StrokeInput";
import FontSizeInput from "./FontSizeInput";
import FontFamilyInput, { GoogleFontObject } from "./FontFamilyInput";
import PositionInput from "./PositionInput";
import PresetInput from "./PresetInput";
import Button from "../../Button";

const Container = styled.div`
  position: fixed;
  top: ${props => props.theme.headerHeight};
  right: 0;
  width: ${props => props.theme.editorWidth};
  height: calc(100vh - ${props => props.theme.headerHeight});
  padding: 30px;
  box-shadow: 0 0 0 1px ${props => props.theme.color.sectionBoxShadow};
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  & + & {
    margin-top: 20px;
  }

  &:last-child {
    margin-top: 30px;
  }
`;

const Info = styled.p`
  font-size: 13px;
  margin: 10px 0 0 0;
`;

const ExportInfo = styled.p`
  font-size: 15px;
  margin: 0 0 5px 0;
  font-weight: 600;
`;

const Table = styled.table`
  border-spacing: 0;
  font-size: 13px;
`;

interface EditorProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
  centerText: () => void;
  removeBanner: () => void;
  preset: string;
  changePreset: (preset: string) => void;
  downloadAll: () => void;
}

const Editor = ({
  data,
  updateData,
  centerText,
  removeBanner,
  preset,
  changePreset,
  downloadAll
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
            <StrokeInput data={data} updateData={updateData} />
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
        <>
          <Row>Click on any banner on the left to start editing.</Row>
          <Row>
            <ExportInfo>Export Size Table</ExportInfo>
            <Table>
              <tbody>
                <tr>
                  <td>Profile Banner:</td>
                  <td>1200x480</td>
                </tr>
                <tr>
                  <td>Offline Banner:</td>
                  <td>1920x1080</td>
                </tr>
                <tr>
                  <td>Panel Banner:</td>
                  <td>320x100</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <PresetInput preset={preset} changePreset={changePreset} />
            <Info>More presets coming soon.</Info>
          </Row>
          <Row>
            <Button onClick={downloadAll}>Download All</Button>
            <Info>
              Your browser will ask for permission to download multiple files
              when you download. Press "Allow".
            </Info>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Editor;
