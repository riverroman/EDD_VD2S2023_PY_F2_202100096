import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Form from './components/form'
import "./index.css"

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center lg:w-1/2'>
          <Form/>
      </div>
      <div className='hidden relative lg:flex h-full w-1/2 items-center justify-center bg-amber-50'>
        <div className='flex justify-center items-center bg-slate-400 rounded-3xl absolute w-1/2 h-1/4'>
              <img className='h-40 p-2' src="https://seeklogo.com/images/U/universidad-de-san-carlos-de-guatemala-logo-4B7C23A157-seeklogo.com.png" alt="usac" />
        <div className='font-mono text-lg font-bold text-white' >
              <h2>River Anderson Ismalej Roman</h2>
              <h2>202100096</h2>
              <h2>Estructura De Datos</h2>
        </div>
        </div>  
      </div>
    </div>
  )
}

export default App
