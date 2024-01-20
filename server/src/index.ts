import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send({
    message: 'Hello World',
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
