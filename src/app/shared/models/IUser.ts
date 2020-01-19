export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    password: string,
    role: string
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