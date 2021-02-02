const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`Server Up on port: ${process.env.PORT}`);
});
