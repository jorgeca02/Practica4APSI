import { MongoClient, Database } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Coche, Concesionario, Vendedor } from "../types.ts";

export type CocheMongoSchema = Omit<Coche, "id"> & {
    _id: ObjectId;
};
export type VendedorMongoSchema = Omit<Vendedor, "id"> & {
    _id: ObjectId;
};
  export type ConcesionarioMongoSchema = Omit<Concesionario, "id"> & {
    _id: ObjectId;
};
const dbName = "graphql"
const connectMongoDB = async (): Promise<Database> => {
    
    const usr = "jorgeca2002"
    const pwd = "1357924680"
    const cluster = "cluster0.aedynyz.mongodb.net"
    const mongo_url = `mongodb+srv://${usr}:${pwd}@${cluster}/${dbName}?authMechanism=SCRAM-SHA-1`;
    console.log("conectando...");
    const client = new MongoClient();
    await client.connect(mongo_url);
    console.log("conectado");
    const db = client.database(dbName);
    return db;
};

const db = await connectMongoDB();
console.info(`MongoDB ${dbName} connected`);

export const CochesCollection = db.collection<CocheMongoSchema>("Coches");
export const VendedoresCollection = db.collection<VendedorMongoSchema>("Vendedores");
export const ConcesionariosCollection = db.collection<ConcesionarioMongoSchema>("Concesionario");