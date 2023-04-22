import { ReactNode, SyntheticEvent, useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

import { ResizableBox, ResizeCallbackData } from 'react-resizable';

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

  const dragHandleClassName = 'drag-handle';

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
      setSize({ width: size.width, height: size.height });
      if (resizeHandler) resizeHandler(size);
    }
  };

  return (
    <Draggable
      bounds="parent"
      onDrag={handleDrag}
      // handle={`.${dragHandleClassName}`}
    >
      <ResizableBox
        width={size.width}
        height={size.height}
        onResize={handleResize}
        style={{
          position: 'absolute',
          top: initialPosition.y,
          left: initialPosition.x,
          backgroundColor: '#444',
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
