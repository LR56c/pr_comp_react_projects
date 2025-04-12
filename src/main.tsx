import { scan } from "react-scan"

import { StrictMode }         from "react"
import { createRoot }         from "react-dom/client"
import "./app.css"
import App                    from "./App"
import { BrowserRouter }      from "react-router"

scan( {
  enabled: true
} )

createRoot( document.getElementById( "root" )! ).render(
  <StrictMode>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </StrictMode>
)
