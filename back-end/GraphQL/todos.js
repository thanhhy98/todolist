const { gql } = require('apollo-server-express');
const db = require('./../database');

const typeDefs = gql`
  type Query {
    todos: [Todo]
    todo(id: ID!): Todo
  }
  type Todo {
    id: ID
    description: String
    isFinished: Boolean
  }

  type Mutation {
    updateTodo(
      id: Int, 
      description: String, 
      isFinished: Boolean, 
    ): Todo
    createTodo(
      description: String, 
      isFinished: Boolean, 
    ): Todo
    deleteTodo(id: Int): String
  }
`

const resolvers = {
  Query: {
    todos: async () => db.todo.findAll(),
    todo: async (obj, args, context, info) =>
      db.todo.findByPk(args.id),
  },
  Mutation: {
    createTodo: async (root,args,context,info) => {
      todo = await db.todo.create({
        description: args.description,
        isFinished: args.isFinished,
      });
      return todo;
    },
    updateTodo: async (root,args,context,info) => {
      if (!args.id) return;
      todo = await db.todo.update({
        description: args.description,
        isFinished: args.isFinished,
      }, {
        where: { id: args.id}
      });
      return args;
    },
    deleteTodo: async (root,args,context,info) => {
      if (!args.id) return;
      todo = await db.todo.destroy({where: {
        id: args.id
      }})
      return 'Delete success!';
    }
  }
}

module.exports = { typeDefs, resolvers }