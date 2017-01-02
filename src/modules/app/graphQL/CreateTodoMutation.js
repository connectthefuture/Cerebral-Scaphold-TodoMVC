const CreateTodoMutation = `mutation CreateTodo($CreateTodoInput: CreateTodoInput!){
  createTodo(input:$CreateTodoInput){
    changedTodo{
      id
      title
      isSaving
      completed
      createdAt
    }
  }
}`

export default CreateTodoMutation
