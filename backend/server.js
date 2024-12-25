const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
// const cors = require("cors");

dotenv.config(); // Load environment variables

connectDB(); // connection to mongodb



const app = express(); // Initialize Express

app.use(express.json());

// app.use(cors()); // Use CORS middleware

// Routes
app.get('/', (req, res) => {
    res.send("API is running");
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.use('/api/users',userRoutes)

app.use(notFound);
app.use(errorHandler)

// Server setup
const PORT = process.env.PORT || 6000;
console.log(`PORT: ${PORT}`);
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`)
);


