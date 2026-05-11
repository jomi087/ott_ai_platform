export function normalizeMovieTitle(title) {
    return title
        .normalize("NFD") // separates accents from letters
        .replace(/[\u0300-\u036f]/g, "") // removes accents
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") // optional: remove spaces/punctuation
}