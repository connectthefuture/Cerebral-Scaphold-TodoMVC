function mutateFactory (queryString, varsObject = {}) {
  function mutate (context) {
    const query = typeof queryString === 'function' ? queryString(context).value : queryString
    const vars = typeof varsObject === 'function' ? varsObject(context).value : varsObject

    return context.graphQL.query(query, vars)
      .then(result => {
        return context.path.success({result:result})
      })
      .catch(error => {
        return context.path.error({error:error})
      })
  }

  return mutate
}

export default mutateFactory
