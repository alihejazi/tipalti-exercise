import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { CTable } from "@coreui/react";
import { Expense } from "./types";

export default function App() {

  const [loading, setLoading] = useState<Boolean>(true)
  const [errorFound, setErrorFound] = useState<Boolean>(false)
  const [expenses, setExpenses] = useState<Expense[]>([])

  const fetchData = async () => {

    try {
      const fetchedExpenses: Expense[] = (await axios.get(`${process.env.REACT_APP_API_BASE_URL}/expenses`, {
        headers: {
          "Content-Type": "application/json",
          Username: process.env.REACT_APP_API_USERNAME
        }
      })).data

      setExpenses(fetchedExpenses)
    }

    catch (err) {
      setErrorFound(true)
    }

    finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchData();
  }, [])

  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'date',
      _props: { scope: 'col' },
    },
    {
      key: 'merchant',
      _props: { scope: 'col' },
    },
    {
      key: 'amount',
      _props: { scope: 'col' },
    },
    {
      key: 'category',
      _props: { scope: 'col' },
    },
    {
      key: 'description',
      _props: { scope: 'col' },
    },
    {
      key: 'status',
      _props: { scope: 'col' },
    },
  ]

  if (loading) {
    return <>Loading...</>
  }

  if (errorFound) {
    return <>Sorry, error found! Please seek support!</>
  }

  return (
    <div className="App">

      <div className="container">
        <h1>Expenses</h1>
        <hr />
        <CTable columns={columns} items={expenses.map(expense => {
          // NOTE: could've used `...expense` here (destructuring) but I think
          // it's better to explicitly know what fields you're using
          return {
            id: expense.id,
            date: expense.date,
            merchant: expense.merchant,
            amount: expense.amount,
            category: expense.category,
            description: expense.description,
            status: expense.status,
            _cellProps: { id: { scope: 'row' } },
          }
        })} />
      </div>

    </div>
  );
}
