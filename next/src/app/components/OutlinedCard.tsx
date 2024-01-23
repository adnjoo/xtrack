"use client";

import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "@clerk/nextjs";

export default function ExpenseForm() {
  const { getToken } = useAuth();
  const [expense, setExpense] = React.useState({
    title: "",
    amount: 0,
    description: "",
    date: new Date().toISOString().split('T')[0],
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
          date: new Date(expense.date),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Expense submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting expense:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpense((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Expense Title:
            <input
              type="text"
              name="title"
              value={expense.title}
              onChange={handleInputChange}
              placeholder="Enter a captivating title"
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Amount Spent:
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleInputChange}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description:
            <input
              type="text"
              name="description"
              value={expense.description}
              onChange={handleInputChange}
              placeholder="Briefly describe your expense"
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Expense Date:
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleInputChange}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleSubmit}>
            Record Expense
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
