const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const userRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

app.use(express.json());


app.use("/users", userRouter);
app.use("/admin", adminRouter);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
