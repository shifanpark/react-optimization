import React from 'react';
import { VariableSizeList } from 'react-window';

import RowComponent from './RowComponent';

import items from './mock.json';

const Row = ({ index, style }) => (
  <RowComponent image={items[index]} num={index} style={style} />
);

const getItemSize = () => Math.floor(Math.random() * 200) + 130;

const ListComponent = () => (
  <VariableSizeList
    height={1000}
    width={500}
    itemCount={items.length}
    itemSize={getItemSize}
    className="list-container"
  >
    {Row}
  </VariableSizeList>
);

export default ListComponent;
