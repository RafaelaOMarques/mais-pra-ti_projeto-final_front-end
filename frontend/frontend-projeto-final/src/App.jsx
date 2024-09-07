import { DarkModeProvider } from "./context/DarkModeContext/DarkModeContext";
import Header from "./components/Header/Header";
import "./styles/theme.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <DarkModeProvider>
      <Header />
      <Outlet/>
    </DarkModeProvider>
  );
}

export default App;
