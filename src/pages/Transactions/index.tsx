import { Header } from '../../components/Header'
import { SearchForm } from './SearchForm'
import { Summary } from '../../components/Summary'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useTransaction } from '../../hooks/useTransaction'

export function Transaction() {
  const { transactions } = useTransaction()

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
