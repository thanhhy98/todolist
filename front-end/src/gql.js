import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      description
      isFinished
    }
  }
`;

export const ADD_TODO = gql`
  mutation CreateTodo($description: String, $isFinished: Boolean) {
    createTodo(description: $description, isFinished: $isFinished) {
      id
      description
      isFinished  
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo( $id: Int, $description: String, $isFinished: Boolean) {
    updateTodo(id: $id, description: $description, isFinished: $isFinished) {
      id
      description
      isFinished  
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo( $id: Int ) {
    deleteTodo(id: $id) 
  }
`;
