import { gql } from "apollo-server"
import { getMentionedUsers, getEmoticons, getLinks } from "../utils"
export const typeDefs = gql`

type RecordType {
    mentions:[String]
    emoticons:[String]
    links:[LinkType]
}

type LinkType {
    title:String
    url:String
}

type Query {
    records(message:String):RecordType
}
`

export const resolvers = {
    Query:{
        records(_parent: any, args: { message: string }, _context: any, _info: any){
        const {message} = args
          const mentions = getMentionedUsers(message)
          const emoticons = getEmoticons(message)
          const links = getLinks(message)
          return {
            mentions,
            links,
            emoticons
          }  
        }
    }
}