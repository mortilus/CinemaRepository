export interface IMovie {
    id: number,
    imdbId: string,
    imdbRating: number,
    title: string,
    poster: string,
    backdrop: string,
    trailer: string,
    overview: string,
    director: string,
    cast: string[],
    release_date: string,
    showing: string,
    runtime: number,
    mpaa: string
}