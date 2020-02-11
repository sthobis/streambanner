import React, { useState, useEffect, useRef, RefObject } from "react";
import useImage from "use-image";
import { Stage, Layer, Image, Text, Rect, useStrictMode } from "react-konva";
import Konva from "konva";
import styled from "styled-components";
import Button from "../Button";
import { EditableFragmentData } from "./Editable";
import { EditorInterface } from "./Designer";
import { useGoogleFont } from "../../libs/useGoogleFont";
import { usePrevious } from "../../libs/usePrevious";

useStrictMode(true);

function dataURLtoBlob(dataurl): Blob {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

type CursorTypes = "pointer" | "move";

interface StageWithCursorProps {
  cursor: CursorTypes;
}

const DownloadButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: none;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &:hover ${DownloadButton} {
    display: flex;
  }
`;

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
  const [hoverRect, setHoverRect] = useState({
    width: 0,
    height: 0
  });
  const updateHoverRect = () => {
    const textWidth = textRef.current.measureSize(data.text).width;
    const textHeight = textRef.current.measureSize(data.text).height;
    setHoverRect({
      width: textWidth,
      height: textHeight
    });
  };

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
    updateHoverRect();
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

  const prevCenterToggle = usePrevious(data.centerToggle);
  useEffect(() => {
    if (data.centerToggle !== prevCenterToggle && data.centerToggle) {
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

  const stageRef = useRef<Konva.Stage>();
  const prevDownloadToggle = usePrevious(data.downloadToggle);
  useEffect(() => {
    if (data.downloadToggle !== prevDownloadToggle && data.downloadToggle) {
      downloadImage();
      updateData({
        ...data,
        downloadToggle: false
      });
    }
  }, [data]);
  const downloadImage = () => {
    // resize canvas output to match original size
    // since canvas size are limited to viewport size
    const pixelRatio = data.originalSize.width / canvasRect.width;

    const canvasDataURL = stageRef.current?.toDataURL({
      x: 0,
      y: 0,
      width: canvasRect.width,
      height: canvasRect.height,
      pixelRatio
    });
    const blob = dataURLtoBlob(canvasDataURL);
    const objectUrl = URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.href = objectUrl;
    link.download = data.text + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const strokeColor = data.stroke.enabled ? data.stroke.color : undefined;

  return (
    <Container>
      <DownloadButton aria-label="Download" onClick={downloadImage}>
        <img src="/icon/download.svg" alt="Download" />
      </DownloadButton>
      <StageWithCursor
        ref={stageRef}
        width={canvasRect.width}
        height={canvasRect.height}
        cursor={cursor}
      >
        <Layer onClick={editor.toggle}>
          <Image image={image} />
          {isHover && (
            <Rect
              x={data.x - 10}
              y={data.y - 10}
              width={hoverRect.width + 20}
              height={hoverRect.height + 20}
              fill="black"
              opacity={0.2}
              cornerRadius={Math.floor(data.fontSize / 12)}
            />
          )}
          <Text
            ref={textRef}
            x={data.x}
            y={data.y}
            text={data.text}
            fontSize={data.fontSize}
            fontFamily={data.fontFamily}
            fill={data.fill}
            stroke={strokeColor}
            draggable={true}
            onDragStart={editor.open}
            onDragMove={handleDragMove}
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
    </Container>
  );
};

export default Canvas;
