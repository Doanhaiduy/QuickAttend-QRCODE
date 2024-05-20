interface AuthType {
    id: string;
    email: string;
    accessToken: string;
}

enum TimeStatus {
    Upcoming = 'upcoming',
    Ongoing = 'ongoing',
    Expired = 'expired',
}
export { AuthType, TimeStatus };
