export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    password: string,
    role: string,
    reservations?: IReservation[],
    fedelitycards?: IFedelityCard
}
export interface IReservation {
    userId: number,
    movieId: number,
    reservedSeats: number,
    date: string,
    time: string,
    id: number
}

export interface ILoggedUser {
    id: number,
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    role: string,
    token: string
}
export interface IRegisterUser {
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    password: string,
    role: string
}
export interface IFedelityCard {
    id: number,
    userId: number,
    code: string
}