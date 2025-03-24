import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Carousel from "./components/Carousel"

function App() {

  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <footer>Created by green zombie</footer>
    </>
  )
}

export default App
