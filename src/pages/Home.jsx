import React from 'react'
import Header from '../component/Header'
import RecommendedProduct from '../component/RecommendedProduct'
import Service from '../component/Service'
import NewProduct from '../component/NewProduct'
import SpecialOffers from '../component/SpecialOffers'

function Home() {
  return (
    <div>
      <Header/>
      <RecommendedProduct/>
      <Service/>
      <NewProduct/>
      <SpecialOffers/>
    </div>
  )
}

export default Home
