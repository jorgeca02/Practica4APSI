import { gql } from 'https://deno.land/x/graphql_tag@0.0.1/mod.ts'

export const typeDefs =gql`
type Coche{
    id:String!
    modelo:String!
    matricula:String!
    precio:Int!
    vendedor:Vendedor
}

type Vendedor{
    id:String!
    nombre:String!
    apellido:String!
    email:String!
    coches:[Coche]!
    concesionario:Concesionario
}

type Concesionario{
    vendedores:[Vendedor]!
    id:String!
    direccion:String!
    telefono:String!
}

type Query {
    getCoche(id:String!):Coche
    getCoches(min:Int!,max:Int!):[Coche]!
    getVendedor(id:String!):Vendedor
    getConcesionario(id:String!):Concesionario
} 

type Mutation{
    addCoche(matricula:String!,modelo:String!,precio:Int!):Coche
    addVendedor(nombre:String!,apellido:String!,email:String!):Vendedor
    asignarCoche(idCoche:String!,idVendedor:String!):Vendedor
    asignarVendedor(idVendedor:String!,idConcesionario:String!):Concesionario
    addConcesionario(direccion:String!):Concesionario
}
`;