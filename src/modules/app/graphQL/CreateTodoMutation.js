const CreateTodoMutation = `mutation CreateTodo($CreateTodoInput: CreateTodoInput!){
  createTodo(input:$CreateTodoInput){
    changedTodo{
      id
      ref
      title
      isSaving
      completed
      createdAt
    }
  }
}`

export default CreateTodoMutation
