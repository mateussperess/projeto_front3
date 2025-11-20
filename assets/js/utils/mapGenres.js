
export function mapGenres(movieGenreIds, allGenres) {
    return allGenres
           .filter(g => movieGenreIds.includes(g.id))
           .map(g => g.name);
}