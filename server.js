import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: userMessage }],
  });

  const aiMessage = response.data.choices[0].message.content;

  res.json({ aiMessage });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
