interface ILocation {
    latitude: number;
    longitude: number;
}

interface IEvent {
    eventName: string;
    description: string;
    location: ILocation;
    locationName: string;
    type: string;
    privateCode?: string;
    authorId: string;
    QRCodeUrl?: string;
    startAt: string;
    endAt: string;
}

export default IEvent;
