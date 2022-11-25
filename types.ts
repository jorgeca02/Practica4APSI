export type Coche = {
    id:string
    modelo:string
    matricula:string
    precio:number
    vendedor:Vendedor
}

export type Vendedor = {
    id:string
    nombre:string
    apellido:string
    email:string
    coches:Coche[]
    concesionario?:Concesionario
}

export type Concesionario = {
    vendedores:Vendedor[]
    id:string
    direccion:string
    telefono:string
}