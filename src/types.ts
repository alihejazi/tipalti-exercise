export type Expense = {
    id: Number
    merchant: String
    amount: Number
    description: String
    date: String // Date formatted
    category: 'training' | 'travel' | 'meal'
    status: String
}