// import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { GiffyContextProvider } from "./contexts/GiffyContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GiffyContextProvider>
    <App />
  </GiffyContextProvider>,
  // </React.StrictMode>,
)
