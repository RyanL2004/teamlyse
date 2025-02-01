import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
const Layouts = ({children}) => {
  return (
    <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    </>
  )
}

export default Layouts;
