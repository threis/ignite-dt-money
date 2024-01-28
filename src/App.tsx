import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Transaction } from './pages/Transactions'
import { TransactionsProvider } from './contexts/TransactionsContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>
        <Transaction />
      </TransactionsProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
