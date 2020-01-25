export interface IBooking {
    movieId: number,
    userId: number,
    reservedSeats: number,
    date: string,
    time: string,
    id?: number
}

export interface IBookingSettings {
    maximumAmountBookings: number,
    pricePerTicket: number
}