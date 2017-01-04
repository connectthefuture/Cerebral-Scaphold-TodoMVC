const GetAllTodosQuery = `query {
  viewer{
    allTodos {
      edges{
        node {
          id
          ref
          title
          completed
          isSaving
        }
      }
    }
  }
}
`
export default GetAllTodosQuery
