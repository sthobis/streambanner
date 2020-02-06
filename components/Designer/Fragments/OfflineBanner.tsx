import React from "react";
import styled from "styled-components";
import Editable, { EditableFragmentData } from "../Editable";
import { EditorInterface } from "../Designer";

const Container = styled.div`
  position: relative;

  &::before {
    content: "";
    display: block;
    padding-bottom: 56.25%;
  }
`;

const EditableOfflineBanner = styled(Editable)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface OfflineBannerProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
  editor: EditorInterface;
  preset: string;
}

const OfflineBanner = ({
  data,
  updateData,
  preset,
  editor
}: OfflineBannerProps) => {
  return (
    <Container>
      <EditableOfflineBanner
        data={data}
        updateData={updateData}
        editor={editor}
        preset={preset}
      />
    </Container>
  );
};

export default OfflineBanner;
