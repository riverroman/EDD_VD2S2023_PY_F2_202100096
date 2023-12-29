import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Form from './components/form'
import Header from './components/Header'
import "./index.css"

function App() {  
  const [count, setCount] = useState(0);
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='w-full p-3 flex items-center justify-center bg-slate-800 text-white'>
        <Header/>
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <Form/>
      </div>
      <div className='w-full p-3 flex items-center justify-center bg-slate-800 text-white'>
        <footer>
          <h2 className='font-mono text-1xl'>&copy; River Roman - 2023</h2>
        </footer>
      </div>
    </div>
  );
}

export default App
