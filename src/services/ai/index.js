import { genaiProvider } from "./genaiProvider"
import { openAiProvider } from "./openaiProvider"

const PROVIDER = import.meta.env.VITE_AI_PROVIDER

const providers = {
   openai: openAiProvider,
   genai: genaiProvider,
}

const ai = providers[PROVIDER]

export default ai