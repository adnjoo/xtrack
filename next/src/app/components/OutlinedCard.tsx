'use client';

import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function OutlinedCard() {
  const [counter, setCounter] = React.useState(1);
  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${counter}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [counter]);

  const handleClick = () => {
    setCounter(counter + 1);
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data.body}
          </Typography>

        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>Get Next</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
