import { List, ListRowRenderer } from 'react-virtualized';
import { useMemo } from 'react';

import { ProductItem } from "./ProductItem";


interface SearchResultsProps {
  results: Array<{
    id: number;
    title: string;
    price: number;
  }>
  onAddToWishList: (id: number) => void;
}

export function SearchResults({ results, onAddToWishList }: SearchResultsProps) {
/*   const totalPrice = useMemo(() => {
    return results.reduce((acc, product) => {
      return acc + product.price;
    }, 0)
  }, [results]) */

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem 
          product={results[index]} 
          onAddToWishList={onAddToWishList}
        />
      </div>
    )
  }

  return (
    <div>
      <List 
        height={300}
        rowHeight={20}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  )
}