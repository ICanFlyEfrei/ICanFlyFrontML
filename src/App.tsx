import './App.css'
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar/SearchBar'
import { Routes, Route, useNavigate } from "react-router-dom"
import { HomePage } from './pages/HomePage/HomePage'
import { useEffect, useState } from 'react'
import { LoginPage } from './pages/Login/LoginPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [type, setType] = useState<string | null>(null)

  const navigate = useNavigate();

  // useEffect(() => {
  //   setIsLoggedIn((localStorage.getItem("isLoggedIn")==="true"))
  //   setType(localStorage.getItem("userType"))

  //   if (isLoggedIn && type === "company") {
  //     navigate("/head")
  //   } else if (isLoggedIn && type === "client"){
  //     navigate("/search")
  //   }
  // }, [navigate, isLoggedIn, type])

  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/head" element={<Header />}/>
          <Route path="/search" element={<SearchBar />}/>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </>
  )
}

export default App
