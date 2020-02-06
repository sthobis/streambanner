import React from "react";
import styled from "styled-components";
import Editable, { EditableFragmentData } from "../Editable";
import { EditorInterface } from "../Designer";

const EditablePanelBanner = styled(Editable)`
  width: 300px;
  height: 100px;
`;

interface PanelBannerProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
  editor: EditorInterface;
  preset: string;
}

const PanelBanner = ({
  data,
  updateData,
  preset,
  editor
}: PanelBannerProps) => {
  return (
    <EditablePanelBanner
      data={data}
      updateData={updateData}
      editor={editor}
      preset={preset}
    />
  );
};

export default PanelBanner;
