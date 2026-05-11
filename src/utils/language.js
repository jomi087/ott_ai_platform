
export const LANG = Object.freeze({
  ENGLISH: "en",
  HINDI: "hi",
  MALAYALAM : "ml"
})

export const SUPPORTED_LANGUAGES = [
  {identifier : LANG.ENGLISH, name : "English" },
  {identifier : LANG.HINDI , name : "Hindi" },
  {identifier : LANG.MALAYALAM , name : "Malayalam" }
]

const lang = {
  [LANG.ENGLISH]: {
    search: "Search",
    processing: "processing...",
    searchPlaceholder: "what would you like to watch today?",
  },

  [LANG.HINDI]: {
    search: "खोज",
    processing: "processing...",
    searchPlaceholder: "आज आप क्या देखना चाहेंगे?",
  },

  [LANG.MALAYALAM]: {
    search: "തിരയുക",
    processing: "processing...",
    searchPlaceholder:
      "ഇന്ന് നിങ്ങൾ എന്താണ് കാണാൻ ആഗ്രഹിക്കുന്നത് ?",
  },
}

export default lang