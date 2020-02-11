import React, { useRef } from "react";
import styled from "styled-components";
import Canvas from "./Canvas";
import { EditorInterface } from "./Designer";

export interface EditableFragmentData {
  id: string;
  x: number;
  y: number;
  text: string;
  fontFamily: string;
  fontSize: number;
  fill: string;
  stroke: {
    enabled: boolean;
    color: string;
  };
  centerToggle: boolean;
  downloadToggle: boolean;
  removable: boolean;
  originalSize: {
    width: number;
    height: number;
  };
}

interface EditableProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
  editor: EditorInterface;
  preset: string;
  className?: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const FullSizedCanvas = styled(Canvas)`
  width: 100%;
  height: 100%;
`;

const Editable = ({
  data,
  updateData,
  editor,
  preset,
  className
}: EditableProps) => {
  const containerRef = useRef<HTMLDivElement>();

  return (
    <Container ref={containerRef} className={className}>
      <FullSizedCanvas
        data={data}
        updateData={updateData}
        editor={editor}
        preset={preset}
        parentRef={containerRef}
      />
    </Container>
  );
};

export default Editable;
