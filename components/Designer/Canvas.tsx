import React, { useState, useEffect, useRef, RefObject } from "react";
import useImage from "use-image";
import { Stage, Layer, Image, Text, useStrictMode } from "react-konva";
import Konva from "konva";
import styled from "styled-components";
import { EditableFragmentData } from "./Editable";
import { EditorInterface } from "./Designer";
import { useGoogleFont } from "../../libs/useGoogleFont";
import { usePrevious } from "../../libs/usePrevious";

useStrictMode(true);

type CursorTypes = "pointer" | "move";

interface StageWithCursorProps {
  cursor: CursorTypes;
}

const StageWithCursor = styled(Stage)<StageWithCursorProps>`
  cursor: ${props => props.cursor};
`;

interface CanvasProps {
  data: EditableFragmentData;
  updateData: (data: EditableFragmentData) => void;
  editor: EditorInterface;
  preset: string;
  parentRef: RefObject<HTMLElement>;
}

const Canvas = ({
  data,
  updateData,
  editor,
  preset,
  parentRef
}: CanvasProps) => {
  const [image] = useImage(preset);
  const [cursor, setCursor] = useState<CursorTypes>("pointer");

  const [isHover, setIsHover] = useState(false);
  const [canvasRect, setCanvasRect] = useState({
    width: 0,
    height: 0
  });
  useEffect(() => {
    if (parentRef.current) {
      resizeCanvas();
    }
  }, [parentRef]);
  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const resizeCanvas = () => {
    setCanvasRect({
      width: parentRef.current.getBoundingClientRect().width,
      height: parentRef.current.getBoundingClientRect().height
    });
  };

  const [fontLoaded, fontError] = useGoogleFont(data.fontFamily);

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    updateData({
      ...data,
      x: Math.round(e.target.x()),
      y: Math.round(e.target.y())
    });
  };

  const handleMouseOver = () => {
    setIsHover(true);
    setCursor("move");
  };

  const handleMouseOut = () => {
    setIsHover(false);
    setCursor("pointer");
  };

  const textRef = useRef<Konva.Text>();

  const centerText = () => {
    const textWidth = textRef.current.measureSize(data.text).width;
    const centerX = Math.round(canvasRect.width / 2 - textWidth / 2);
    const textHeight = textRef.current.measureSize(data.text).height;
    const centerY = Math.round(canvasRect.height / 2 - textHeight / 2);

    updateData({
      ...data,
      x: centerX,
      y: centerY
    });
  };

  const prevPosition = usePrevious(data.position);
  useEffect(() => {
    if (data.position !== prevPosition && data.position === "center") {
      centerText();
    }
  }, [data]);

  const [initialCenter, setInitialCenter] = useState(false);
  useEffect(() => {
    if (!initialCenter && fontLoaded) {
      setInitialCenter(true);
      centerText();
    }
  }, [fontLoaded]);

  return (
    // TODO: fix Stage broken typings
    // @ts-ignore
    <StageWithCursor
      width={canvasRect.width}
      height={canvasRect.height}
      cursor={cursor}
    >
      <Layer onClick={editor.toggle}>
        <Image image={image} />
        <Text
          ref={textRef}
          x={data.x}
          y={data.y}
          text={data.text}
          fontSize={data.fontSize}
          fontFamily={data.fontFamily}
          fill={data.fill}
          stroke={isHover ? "white" : undefined}
          draggable={true}
          onDragStart={editor.open}
          onDragEnd={handleDragMove}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          align="center"
        />
        {!fontLoaded && (
          <Text
            x={5}
            y={(canvasRect.height || 35) - 30}
            fontSize={30}
            fill={"black"}
            text={`Loading font ${data.fontFamily}...`}
          />
        )}
        {fontError && (
          <Text
            x={5}
            y={(canvasRect.height || 35) - 30}
            fontSize={30}
            fill={"black"}
            text={`Failed to load font ${data.fontFamily}...`}
          />
        )}
      </Layer>
    </StageWithCursor>
  );
};

export default Canvas;
