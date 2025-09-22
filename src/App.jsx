import "./App.css";
import Login from "./components/pages/Login";
import { BrowserRouter } from "react-router-dom"; // Add this import

function App() {
  return (
    <BrowserRouter>
    
        <Login />

    </BrowserRouter>
  );
}

export default App;
