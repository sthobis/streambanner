import React from "react";
import styled from "styled-components";
import Editable, { EditableFragmentData } from "../Editable";
import { EditorInterface } from "../Designer";

const Container = styled.div`
  position: relative;

  &::before {
    content: "";
    display: block;
    padding-bottom: 31.67%;
  }
`;

const EditableProfileBanner = styled(Editable)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface ProfileBannerProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
  editor: EditorInterface;
  preset: string;
}

const ProfileBanner = ({
  data,
  updateData,
  editor,
  preset
}: ProfileBannerProps) => {
  return (
    <Container>
      <EditableProfileBanner
        data={data}
        updateData={updateData}
        editor={editor}
        preset={preset}
      />
    </Container>
  );
};

export default ProfileBanner;
