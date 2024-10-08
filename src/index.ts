import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import roomRoutes from "./routers/roomRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomRoutes);

app.use(express.static(path.join(__dirname, "../UI/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../UI/dist/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../UI/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
