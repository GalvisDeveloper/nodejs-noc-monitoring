import mongoose from "mongoose";


interface ConnectionsOptions {
    mongoUrl: string;
    dbName: string;
}


export class MongoDataSource {

    static async connect(options: ConnectionsOptions) {
        const { mongoUrl, dbName } = options;
        try {
            await mongoose.connect(mongoUrl, {
                dbName,
            })

            console.log('Mongo connected')

        } catch (error) {
            console.log('Mongo connection error')
            throw error;
        }
    }

}