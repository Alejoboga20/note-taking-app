require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const noteRouter = require('./routers/note');
const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);
app.use(noteRouter);

app.listen(port, () => {
  console.log(`Server Up on port: ${port}`);
});
