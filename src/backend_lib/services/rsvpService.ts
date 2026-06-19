import { getDb } from '../infrastructure/mongodb';
import { ObjectId } from 'mongodb';

export interface RSVP {
  _id?: ObjectId;
  fullName: string;
  attending: boolean;
  guestsCount: number;
  message?: string;
  signature: string;
  createdAt: Date;
}

export class RsvpService {
  private static readonly COLLECTION_NAME = 'rsvps';

  static async createRsvp(data: Omit<RSVP, '_id' | 'createdAt'>): Promise<RSVP> {
    const db = await getDb();
    const collection = db.collection<RSVP>(this.COLLECTION_NAME);

    const newRsvp: RSVP = {
      ...data,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newRsvp as any);
    return { ...newRsvp, _id: result.insertedId };
  }
}
