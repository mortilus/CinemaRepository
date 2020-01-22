export interface IBooking {
    movieId: number,
    userId: number,
    reservedSeats: number,
    date: string,
    time: string
}

export interface IBookingSettings {
    maximumAmountBookings: number,
    pricePerTicket: number
}