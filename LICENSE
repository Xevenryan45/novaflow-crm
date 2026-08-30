import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "NovaFlow API Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});