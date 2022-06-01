import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
}

const Home: NextPage = () => {
  const [ search, setSearch ] = useState('');
  const [ results, setResults ] = useState<Results>({
    totalPrice: 0,
    data: []
  }) ;

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();
    
    const totalPrice =  data.reduce((acc: any, product: any) => {
      return acc + product.price;
    }, 0)

    setResults({data, totalPrice});
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, []);


  return (
    <div>
      <h1>Search</h1>

      <p>{`Valor total: ${results.totalPrice}`}</p>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults 
        results={results.data} 
        onAddToWishList={addToWishList}
      />
    </div>
  )
}

export default Home
