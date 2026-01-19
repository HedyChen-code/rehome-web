import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Footer from './layout/Footer';
// import { Modal } from 'bootstrap' 使用JS控制Bootstrap元件再打開

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    (async () => {
      const res = await axios.get('https://randomuser.me/api/')
      console.log(res)
    })()    
  }, [])
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rehome</h1>
      <div className="card">
        <button className = 'btn btn-primary' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="h1 text-primary-90 mb-3">
        字體測試 H1 
      </p>
      <p className="h2 text-secondary-40">
        字體測試 H2 Heading   
      </p>
      <p className="h3 text-gray-90 py-3">
        字體測試 H3 Heading
      </p>
      <p className="h4 text-black lh-1">
        字體測試 H4 Heading   
      </p>
      <p className="h5 text-white lh-1">
        字體測試 H5 Heading
      </p>
      <p className="h6">
        字體測試 H6 Heading   
      </p>
      <Footer />
    </>
    
  )
}

export default App
