import { useState } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import './App.css'


export default function App() {
  const [count, setCount] = useState(0)
 

  return (
    <div className='w-full'>
      <Navbar />
      <div className='h-24'></div>
      <Footer />
    </div>
  )
}

