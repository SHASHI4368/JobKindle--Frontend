import React from 'react'
import Header from './header'
import Intro from './intro'
import Featured from './featured'
import Offer from './offer'
import Pros from './pros'
import Footer from './footer'

const Home = () => {
  return (
    <div className='w-full h-full min-h-screen flex flex-col'>
     <Header/>
     <Intro/>
     <Featured/>
     <Offer/>
     <Pros/>
     <Footer/>
    </div>
  );
}

export default Home