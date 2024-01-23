"use client";

import React from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function ExpenseForm({ setIsOpen }: any) {
  const { getToken } = useAuth();
  const [expense, setExpense] = React.useState({
    title: "",
    amount: 0,
    description: "",
    date: dayjs(Date.now()),
  });

  const handleSubmit = async () => {
    const token = await getToken();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses/upsert`,
        {
          title: expense.title,
          description: expense.description,
          amount: expense.amount,
          date: expense.date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Expense submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting expense:", error);
    } finally {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setExpense((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          value={expense.amount}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={expense.title}
          onChange={handleInputChange}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          value={expense.description}
          onChange={handleInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Controlled picker"
            value={expense.date}
            onChange={(newValue) => {
              setExpense((prevData) => ({
                ...prevData,
                date: newValue,
              }));
            }}
          />
        </LocalizationProvider>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSubmit}>
          Record Expense
        </Button>
      </CardActions>
    </Card>
  );
}
