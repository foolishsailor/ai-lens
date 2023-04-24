import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Point, Size } from '../../types/draw';

interface Props {
  initialPosition: Point;
  initialSize: Size;
  dragHandler?: (position: Point) => void;
  resizeHandler?: (size: Size) => void;
  children: ReactNode;
}
const DragAndResizeContainer = ({
  initialPosition,
  initialSize,
  dragHandler,
  resizeHandler,
  children
}: Props) => {
  const [calculatedPosition, setCalculatedPosition] = useState(initialPosition);
  const [draggablePosition, setDraggablePosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(initialSize);

  const handleDrag: DraggableEventHandler = (event, data) => {
    const { x, y } = data;
    const newPosition = { x: x + initialPosition.x, y: y + initialPosition.y };
    setCalculatedPosition(newPosition);
    setDraggablePosition({ x: data.x, y: data.y });
    if (dragHandler) dragHandler(newPosition);
  };

  const handleResize = (
    event: SyntheticEvent<Element, Event>,
    { size }: Partial<ResizeCallbackData>
  ) => {
    if (size) {
      setSize({ width: size.width, height: size.height });
      if (resizeHandler) resizeHandler(size);
    }
  };

  useEffect(() => {
    if (dragHandler) dragHandler(initialPosition);
    if (resizeHandler) resizeHandler(initialSize);
    setSize(initialSize);
    setCalculatedPosition(initialPosition);
    setDraggablePosition({ x: 0, y: 0 });
  }, [initialSize, initialPosition]);

  return (
    <Draggable
      cancel=".react-resizable-handle"
      bounds="parent"
      onDrag={handleDrag}
      position={draggablePosition}
    >
      <ResizableBox
        width={size.width}
        height={size.height}
        onResize={handleResize}
        style={{
          position: 'absolute',
          top: initialPosition.y,
          left: initialPosition.x,
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 8
        }}
      >
        {children}
      </ResizableBox>
    </Draggable>
  );
};

export default DragAndResizeContainer;
