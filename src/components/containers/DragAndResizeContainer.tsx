import { ReactNode, SyntheticEvent, useState } from 'react';
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
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);

  const handleDrag: DraggableEventHandler = (event, data) => {
    const { x, y } = data;
    const newPosition = { x: x + initialPosition.x, y: y + initialPosition.y };
    setPosition(newPosition);
    if (dragHandler) dragHandler(newPosition);
  };

  const handleResize = (
    event: SyntheticEvent<Element, Event>,
    { size }: Partial<ResizeCallbackData>
  ) => {
    if (size) {
      console.log('size', size);
      setSize({ width: size.width, height: size.height });
      if (resizeHandler) resizeHandler(size);
    }
  };

  return (
    <Draggable
      cancel=".react-resizable-handle"
      bounds="parent"
      onDrag={handleDrag}
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
