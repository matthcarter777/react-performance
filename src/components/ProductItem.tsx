/* eslint-disable react/display-name */
import { memo, useState } from 'react';
import { AddProductToWishListProps } from './AddProductToWishList'
import dynamic from 'next/dynamic';
import lodash from 'lodash';


const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
});

interface ProductItemProps {
  product: {
    id: number;
    title: string;
    price: number;
   }
   onAddToWishList: (id: number) => void;
  }

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [ isAddingToWishList, setIsAddingToWishList ] = useState(false);

  return (
    <div>
      {product.title} - <strong>{ product.price }</strong>
      <button onClick={() => setIsAddingToWishList(true)} >Adicionar aos favoritos</button>

      { isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
});
