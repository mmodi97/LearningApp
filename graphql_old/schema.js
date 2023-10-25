const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }
    type Story {
        _id:ID!
        title:String!
        description:String!
        writter:String!
        date:String!

    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        posts: [Post!]!
        stories:[Story]!
        type:String!
        userid:String!
        gender:String!
        dob:String!
        mobile:String!
        alternatemobile:String!
        country:String!
        grade:String!
        timezone:String!
    }

    type Authorization {
        email:String!
        token:String!
        posts:[Post!]!
        occupation:[Cocd!]!
        gender:[Cocd]!
    }

    type Cocd{
        code:String!
        description:String!
    }

    type Success {
        email:String!
    }
    input UserInputData {
        email: String!
        name: String!
        parentName: String!
        password: String!
        gender:String!
        dob:String!
        type:String!
        mobile:String!
        alternatemobile:String!
        country:String!
        grade:String!
        timezone:String!
    }

    input LoginInputData {
        email: String!
        password: String!
    }

    input PostInputData {
        title: String!
        imageUrl: String!
        content: String!
    }

    type RootQuery {
        login(loginInput: LoginInputData): Authorization!
        
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput:PostInputData): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
