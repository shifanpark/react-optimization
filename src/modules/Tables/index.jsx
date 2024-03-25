import React from 'react';
import { FixedSizeList, VariableSizeList } from 'react-window';
import { Column, Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './style.css';

const Tables = () => {
  const [arr, setArr] = React.useState([]);
  const [initalArray, setInitalArray] = React.useState([]);
  const [searchText, setSearchtext] = React.useState('');
  const [isShowReactWindow, setIsShowReactWindow] = React.useState(false);

  React.useEffect(() => {
    let intArray = [];
    for (let i = 0; i < 10000; i++) {
      // intArray = [...intArray, { number: i, name: 'uwu' }];
      intArray.push({ number: i, name: 'uwu' });
    }

    setArr(intArray);
    setInitalArray(intArray);
  }, []);

  const searchCallback = React.useCallback((e) => {
    setSearchtext(e);
  }, []);

  React.useMemo(() => {
    console.log('searchText changes', searchText);
    if (searchText) {
      setArr([
        ...initalArray.filter((item) =>
          item.number.toString().includes(searchText.toString())
        ),
      ]);
    } else {
      setArr(initalArray);
    }
  }, [initalArray, searchText]);

  const RowComponent = ({ index, style }) => (
    <div style={style} className={'list-group-item-odd'}>
      <div className="details" style={{ margin: '50px' }}>
        <div className="info">
          <p className="number">{arr[index].number}</p>
        </div>
      </div>
    </div>
  );

  console.count('Tablesss');

  return (
    <>
      <div className={styles.app}>
        <h1>Hello CodeSandbox</h1>

        <input
          type="text"
          name="name"
          onChange={(e) => searchCallback(e.target.value)}
        />

        <label class="container">
          Show React window implementation
          <input
            type="checkbox"
            checked={isShowReactWindow}
            onChange={() => {
              setIsShowReactWindow(!isShowReactWindow);
            }}
          />
          <span class="checkmark"></span>
        </label>

        <div style={{ height: '80vh', width: '90vw' }}>
          <AutoSizer>
            {({ height, width }) => {
              return !isShowReactWindow ? (
                <Table
                  gridStyle={{ outline: 'none' }}
                  width={width}
                  height={height}
                  headerHeight={20}
                  rowHeight={70}
                  rowCount={arr.length}
                  rowGetter={({ index }) => arr[index]}
                >
                  {/* {RenderRow} */}
                  <Column width={width / 2} label="Number" dataKey="number" />
                  <Column width={width / 2} label="Name" dataKey="name" />
                </Table>
              ) : (
                <VariableSizeList
                  rowHeight={15}
                  height={height}
                  itemCount={arr.length}
                  // itemSize={35}
                  itemSize={(index) => 50 + 20}
                  width={width}
                >
                  {RowComponent}
                </VariableSizeList>
              );
            }}
          </AutoSizer>
        </div>
      </div>
    </>
  );
};

export default Tables;
