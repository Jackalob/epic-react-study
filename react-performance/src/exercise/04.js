// Window large lists with react-virtual
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
// 🐨 import the useVirtual hook from react-virtual
// import {useVirtual} from 'react-virtual'
import {useCombobox} from '../use-combobox'
import {getItems} from '../filter-cities'
import {useForceRerender} from '../utils'
import {useVirtual} from 'react-virtual'

// 💰 I made this for you, you'll need it later:
const getVirtualRowStyles = ({size, start}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: size,
  transform: `translateY(${start}px)`,
})

function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
  listRef,
  virtualRows,
  totalHeight,
}) {
  return (
    // 🐨 pass the listRef to the `getMenuProps` prop getter function below:
    // 💰  getMenuProps({ref: listRef})
    <ul {...getMenuProps({ref: listRef})}>
      <div style={{height: totalHeight}}></div>
      {virtualRows.map(({index, size, start}) => {
        const item = items[index]
        return (
          <ListItem
            key={item.id}
            getItemProps={getItemProps}
            item={item}
            index={index}
            isSelected={selectedItem?.id === item.id}
            isHighlighted={highlightedIndex === index}
            style={getVirtualRowStyles({size, start})}
            // 🐨 pass a style prop, you can get the inline styles from getVirtualRowStyles()
            // make sure to pass an object with the size (the height of the row)
            // and start (where the row starts relative to the scrollTop of its container).
          >
            {item.name}
          </ListItem>
        )
      })}
    </ul>
  )
}

function ListItem({
  getItemProps,
  item,
  index,
  isHighlighted,
  isSelected,
  style,
  ...props
}) {
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
          fontWeight: isSelected ? 'bold' : 'normal',
          ...style,
        },
        ...props,
      })}
    />
  )
}

function App() {
  const forceRerender = useForceRerender()
  const [inputValue, setInputValue] = React.useState('')

  const items = React.useMemo(() => getItems(inputValue), [inputValue])
  // const {data: items, run} = useAsync({data: [], status: 'pending'})
  // React.useEffect(() => {
  //   run(getItems(inputValue))
  // }, [inputValue, run])

  const listRef = React.useRef()
  // 🐨 create a listRef with React.useRef
  // which will be used for the parentRef option you pass to useVirtual
  // and should be applied to the <ul /> for our menu. This is how react-virtual
  // knows how to scroll our items as the user scrolls.
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 20, []),
    overscan: 10,
  })
  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({inputValue: newValue}) => setInputValue(newValue),
    onSelectedItemChange: ({selectedItem}) =>
      alert(
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
    // we want to override Downshift's scrollIntoView functionality because
    // react-virtual will handle scrolling for us:
    // 🐨 set scrollIntoView to a "no-op" function
    // 💰 scrollIntoView: () => {},
    // 🐨 when the highlightedIndex changes, then tell react-virtual to scroll
    // to that index.
    // 💰 onHighlightedIndexChange: ({highlightedIndex}) => highlightedIndex !== -1 && rowVirtualizer.scrollToIndex(highlightedIndex),
  })

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({type: 'text'})} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <Menu
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
          // 🐨 pass the following props:
          listRef={listRef}
          virtualRows={rowVirtualizer.virtualItems}
          totalHeight={rowVirtualizer.totalSize}
        />
      </div>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
