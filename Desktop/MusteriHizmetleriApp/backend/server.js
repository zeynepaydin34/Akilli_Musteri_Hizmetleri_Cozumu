import express from "express";
import cors from "cors";
import messagesRoute from "./routes/messages.js";
import adminsRoute from "./routes/admin.js";
import resolvedRoute from "./routes/resolved.js";
import loginRoute from "./routes/login.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/messages", messagesRoute); 
app.use("/api/admin", adminsRoute);     
app.use("/api/resolved", resolvedRoute);    
app.use("/api/login", loginRoute);    

// Sunucu başlat
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
