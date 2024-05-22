interface ILocation {
    latitude: number;
    longitude: number;
}

interface IEvent {
    eventName: string;
    description: string;
    location: ILocation;
    locationName: string;
    distanceLimit: number;
    type: string;
    privateCode?: string;
    authorId: string;
    QRCodeUrl?: string;
    startAt: string;
    endAt: string;
    eventCode?: string;
}

export default IEvent;
