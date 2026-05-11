import { GoogleGenAI } from "@google/genai"

const genAI = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GENAI_API_KEY,
})

export const genaiProvider = {
    async getMovieSuggestions(query) {
        try {
            const response = await genAI.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `
                    You are a movie recommendation system.
                    Based on the user's query, suggest 5 popular and relevant movie names,
                    Reminder :- movie names must be same (same spelling you can refer it from tmdb website for accurate name)
                    Return ONLY valid JSON in this format:
                    {
                    "movies": ["movie1", "movie2", "movie3", "movie4", "movie5"]
                    }
                    User query:${query}
                `,
            })
            //reson of converting to json was for predictable output stucture (so that we use trustfuly use any methods etc....)
            const text = response.text 

            // clean possible markdown formatting
            const cleanedText = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim()

            return JSON.parse(cleanedText)
        } catch (err) {
            console.log("err caught in genaiProvider.js file", err)
            return { movies: [] }
        }
    },
}

/*
    {
        "movies": [
            {
                "movieName: "movie1",
                "lang" : "language",
            },
            {
                "movieName: "movie2",
                "lang" : "language",
            },
        ]
    }
*/