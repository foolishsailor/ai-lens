import React, { Children } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface Props {
  children: React.ReactNode;
}

const VirtualizedList: React.FC<Props> = ({ children }) => {
  const items = Children.toArray(children);

  const itemCount = items.length;

  const renderRow = React.useCallback(
    ({ index, style }: ListChildComponentProps) => (
      <div style={style}>{items[index]}</div>
    ),
    [items]
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={typeof height === 'number' ? height : 0}
          width={typeof width === 'number' ? width : 0}
          itemCount={itemCount}
          itemSize={200}
          style={{ backgroundColor: '#1a1a1a' }}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default VirtualizedList;
