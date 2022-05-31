import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: string;
    title: string;
    price: number;
  }>
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div>
      {results.map(product => {
        return (
          <ProductItem key={product.id} product={product} />
        )
      }) }
    </div>
  )
}