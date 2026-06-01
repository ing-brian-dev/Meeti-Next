
export interface IMeetiAttendeesRepository {
    isUserAttending(userId: string, meetiId: string): Promise<boolean>;
}

class MeetiAttendeesRepository implements IMeetiAttendeesRepository {
    async isUserAttending(userId: string, meetiId: string) {
        return true;
    }
}

export const meetiAttendeesRespository = new MeetiAttendeesRepository();