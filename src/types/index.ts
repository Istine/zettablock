import { gql } from "apollo-server";


export type TypeDefs = ReturnType<typeof gql>


type ArgsType = {
    message:string
}
export type ResolversType = {
    Query: {
        records: (parent:any, args:ArgsType, context:any,info:any) => void | any
    }
}