interface AuthType {
    id: string;
    email: string;
    accessToken: string;
}

enum TimeStatus {
    Upcoming = 'Upcoming',
    Ongoing = 'Ongoing',
    Expired = 'Expired',
}
export { AuthType, TimeStatus };
