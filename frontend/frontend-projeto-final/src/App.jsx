import './App.css'
import Header from './components/Header'
import { DarkModeProvider } from './context/DarkModeContext'
import theme from './theme';


function App() {
  return (
    <>
    <DarkModeProvider>
      <Header theme={theme}/>
    </DarkModeProvider>
    </>
  )
}

export default App
