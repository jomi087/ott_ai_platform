import OpenAI from "openai";

//! Secret key should not implimented in frontEnd (read below context)
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,  //this option allow us to use in front end 
});

export const openAiProvider = {
  async getMovieSuggestions(query) {
    try {
      const response = await openai.responses.create({
        model: "gpt-4-nano",
        instructions: `
          You are a movie recommendation system.
          Suggest 5 popular movie names based on user query.
          Return ONLY valid JSON:
          {
            "movies": ["movie1", "movie2", "movie3", "movie4", "movie5"]
          }
        `,
        //reason for converting to json was for predictable output sturcture 
        input: query,
        max_output_tokens: 80,  //optional - to avoid execeed api limit  
      })

      const text = response.output_text

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()

      return JSON.parse(cleanedText)

    } catch (err) {
      console.log("err caught in openaiProvider.js file", err)
      return { movies: [] }
    }
  },
}

/*
// Normally this is NOT recommended because API keys
// should never be exposed in the frontend. (y cz any one can use it and make api call which exeeds limit and eventualy cause u to pay more)
// Secret keys must be kept in the backend/server.
//
// But for learning purposes, we are temporarily using
// dangerouslyAllowBrowser: true


exmple in backend to do 

export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

app.post("/api/ai/search_movie_suggestion", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.responses.create({
            model: "gpt-5-nano",
            instructions: `Extract movie genres and moods.Return JSON only.`,
            input: prompt,
            max_output_tokens: 80, (optional)
        });

        res.json({
            result: response.output_text,
        });

    } catch (error) {
        console.log(error);
    }
});

*/

