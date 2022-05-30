import express from 'express';
import chatbot from './routes/chatbot';

import notFound from './middleware/notFound';
import index from './middleware/index';
import cors from './middleware/cors';

const app = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", index);
app.use("/chatbot", chatbot);
app.use(notFound);

app.listen(3000, () => 
{
    console.log("Server is Runnig");
});