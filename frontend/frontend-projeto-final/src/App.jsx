import { DarkModeProvider } from "./context/DarkModeContext/DarkModeContext";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import "./styles/theme.css";

function App() {
  return (
    <DarkModeProvider>
      <Header />
      <Outlet/>
    </DarkModeProvider>
  );
}

export default App;
