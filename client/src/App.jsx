import { useState } from 'react';
import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'

function App() {
  const [search, setSearch] = useState('');

  const getSearch = (e) => {
    const text = e.toLowerCase()
    setSearch(text)
  }
 
  return (
    <>
      <Header getSearch={getSearch}></Header>
      <Main getSearch={search}></Main>
    </>
  )
}

export default App
