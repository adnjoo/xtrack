"use client";

import React from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
  marginY: 2,
};

export default function ExpenseForm({ setIsOpen }: any) {

  const { getToken } = useAuth();
  const [expense, setExpense] = React.useState({
    title: "",
    amount: null,
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
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={expense.title}
          onChange={handleInputChange}
          sx={style}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          value={expense.amount}
          placeholder="0.00"
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={style}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          value={expense.description}
          onChange={handleInputChange}
          sx={style}
          InputLabelProps={{ shrink: true }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={expense.date}
            onChange={(newValue) => {
              setExpense((prevData: any) => ({
                ...prevData,
                date: newValue,
              }));
            }}
            sx={style}
          />
        </LocalizationProvider>
        <Button
          size='large'
          variant='contained'
          onClick={handleSubmit}
          sx={style}
        >
          Submit
        </Button>
      </Stack>
    </Card>
  );
}
