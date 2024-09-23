import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../../UI/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../UI/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
