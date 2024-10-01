import cors from "cors";
import express from "express";
import path from "path";
import roomRoutes from "./routers/roomRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomRoutes);

app.use(express.static(path.join(__dirname, "UI/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "UI/dist/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "UI/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
