export type Expense = {
    id: number
    merchant: string
    amount: number
    description: string
    date: string // Date formatted
    category: 'training' | 'travel' | 'meal'
    status: string
}