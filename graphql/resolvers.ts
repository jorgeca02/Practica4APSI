import { ConcesionarioMongoSchema, ConcesionariosCollection } from "../mongo/db.ts";
import { VendedorMongoSchema } from "../mongo/db.ts";
import { VendedoresCollection } from "../mongo/db.ts";
import { CochesCollection } from "../mongo/db.ts";
import { CocheMongoSchema } from "../mongo/db.ts";
import { Vendedor } from "../types.ts";

const idCoche:number=0;
const idVendedor:number=0;
const idConcesionario:number=0;
export const resolvers = {
    Query: {
        getCoche: async (_:unknown, args: { id: string }): Promise<CocheMongoSchema|undefined> => {
            const coche: CocheMongoSchema | undefined = await CochesCollection.findOne({id:args.id});
            return coche;
        },
        getCoches: async (_:unknown, args: { min:number,max:number }): Promise<CocheMongoSchema[]|undefined> => {
            const coches:any= await CochesCollection.find({price:{$lt:args.max,$gt:args.min}});
            return coches;
        },
        getVendedor: async (_:unknown, args: { id: string }): Promise<VendedorMongoSchema|undefined> => {
            const vendedor: VendedorMongoSchema | undefined = await VendedoresCollection.findOne({id:args.id});
            return vendedor;
        },
        getConcesionario: async (_:unknown, args: { id: string }): Promise<ConcesionarioMongoSchema|undefined> => {
            const concesionario: ConcesionarioMongoSchema | undefined = await ConcesionariosCollection.findOne({id:args.id});
            return concesionario;
        },

    },
    Mutation: {
        addCoche: (_:unknown, args: { matricula:string,modelo:string,precio:number }):CocheMongoSchema => {
            const coche:CocheMongoSchema=({
                matricula: args.matricula,
                modelo:args.modelo,
                id: "1",
                precio:args.precio
            } as unknown as CocheMongoSchema);
            CochesCollection.insertOne(coche)
            return coche;
        },

        addVendedor: (_:unknown, args: { nombre:string,apellido:string,email:string}):VendedorMongoSchema => {
            const vendedor:VendedorMongoSchema=({
                nombre: args.nombre,
                apellido: args.apellido,
                id: "1",
                coches: [],
                email:args.email
            } as unknown as VendedorMongoSchema);
            VendedoresCollection.insertOne(vendedor)
            return vendedor;
        },
        addConcesionario: (_:unknown, args: { direccion:string,telefono:string }):ConcesionarioMongoSchema => {
            const concesionario:ConcesionarioMongoSchema = ({
                matricula: args.direccion,
                id: "1",
                vendedores:[],
                telefono:args.telefono
            } as unknown as ConcesionarioMongoSchema);
            ConcesionariosCollection.insertOne(concesionario);
            return concesionario;
        },
        asignarCoche:async (_:unknown, args: { idCoche:string, idVendedor:string}):Promise<VendedorMongoSchema|undefined> =>{
            const vendedor:VendedorMongoSchema|undefined = 
            await VendedoresCollection.findAndModify({
                query: {id:args.idVendedor},
                update:{coches:[... args.idCoche]},
                options:{update: true, upsert: true}
                
            })
            return vendedor;
        }


    },
};
