import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransaction } from '../../hooks/useTransaction'

const newTransactionFormSchema = z.object({
  description: z.string(),
  category: z.string(),
  price: z.number(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const { createTransaction } = useTransaction()

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, category, price, type } = data

    createTransaction({ description, category, price, type })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />

          <input
            type="text"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />

          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton value="income" variant="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
