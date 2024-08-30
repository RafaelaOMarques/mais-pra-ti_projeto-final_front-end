import { DarkModeProvider } from "./context/DarkModeContext/DarkModeContext";
import Header from "./components/Header/Header";
import "./styles/theme.css";

function App() {
  return (
    <DarkModeProvider>
      <Header />
    </DarkModeProvider>
  );
}

export default App;
