import "./App.css"
import "./index.css"
import { gapi } from "gapi-script"
import { useEffect, useState } from "react"
import Nav from "./components/Nav/Nav"
import { useGlobalContext } from "./context"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./Pages/Home"
import UserProfile from "./Pages/UserProfile"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const queryClient = new QueryClient()

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const { clientId } = useGlobalContext()

  useEffect(() => {
    const start = (): void => {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      })
    }

    gapi.load("client:auth2", start)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} />}></Route>
          <Route path="/:id" element={<UserProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
