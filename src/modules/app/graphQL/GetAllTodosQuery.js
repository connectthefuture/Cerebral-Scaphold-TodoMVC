const GetAllTodosQuery = `query {
  viewer{
    allTodos {
      edges{
        node {
          id
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
