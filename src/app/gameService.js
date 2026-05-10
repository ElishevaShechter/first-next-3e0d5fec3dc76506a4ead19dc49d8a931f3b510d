import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const DB_NAME = "main";
const COLLECTION_NAME = "games";

async function getCollection() {
    const client = await clientPromise;
    return client.db(DB_NAME).collection(COLLECTION_NAME);
}

export const gameService = {
    async getAll() {
        const collection = await getCollection();
        return await collection.find({}).toArray();
    },

    async create(game) {
        const collection = await getCollection();
        const result = await collection.insertOne(game);
        return { ...game, _id: result.insertedId };
    },

    async update(id, updateData) {
        const collection = await getCollection();
        const { _id, ...data } = updateData;
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data },
            { returnDocument: 'after' }
        );
        return result;
    },

    async delete(id) {
        const collection = await getCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    }
};