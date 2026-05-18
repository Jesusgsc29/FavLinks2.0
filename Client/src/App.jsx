// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App




 import { useState } from "react"
import "./App.css"
//form, Table
import Form from "./components/Form.jsx"
import Table from "./components/Table.jsx"

//create app componet to render as our main component

function App(){

  const [favLinks, setFavLinks] = useState([])

  let handleNewSubmission = (data) => {
    setFavLinks([...favLinks,data])
  }



  // all components have to return some jsx

  return(

    <div>
      <h1 className = "testClass"> Submit your fav links </h1>


      <Form  onNewSubmit = {handleNewSubmission}/>

      <Table links = {favLinks}/>

    </div>



  )

  

}


export default App