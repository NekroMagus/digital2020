import app from './src/server';

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Server started ${new Date()} and port ${PORT}`);
});