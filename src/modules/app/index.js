import redirectToAll from './chains/redirectToAll'
import setTitle from './chains/setTitle'
import submitTodo from './chains/submitTodo'
import setTodoNewTitle from './chains/setTodoNewTitle'
import overwriteTodoTitle from './chains/overwriteTodoTitle'
import removeTodo from './chains/removeTodo'
import editTodo from './chains/editTodo'
import toggleAllChecked from './chains/toggleAllChecked'
import toggleTodoCompleted from './chains/toggleTodoCompleted'
import stopEditingTodo from './chains/stopEditingTodo'
import clearCompletedTodos from './chains/clearCompletedTodos'
import setFilter from './chains/setFilter'
import mounted from './chains/mounted'
import toggleGraphiQL from './chains/toggleGraphiQL';
import {state, input, set, merge,when} from 'cerebral/operators'
export default {
  state: {
    graphQLMode: false,
    newTodoTitle: '',
    parameters: {},
    todos: {},
    filter: 'all',
    isSaving: false
  },
  signals: {
    rootRouted: redirectToAll,
    newTodoTitleChanged: setTitle,
    newTodoSubmitted: submitTodo,
    todoNewTitleChanged: setTodoNewTitle,
    todoNewTitleSubmitted: overwriteTodoTitle,
    removeTodoClicked: removeTodo,
    todoDoubleClicked: editTodo,
    toggleAllChanged: toggleAllChecked,
    toggleTodoCompletedChanged: toggleTodoCompleted,
    todoNewTitleAborted: stopEditingTodo,
    clearCompletedClicked: clearCompletedTodos,
    filterClicked: setFilter,
    mounted:mounted,
    toggleGraphiQL:toggleGraphiQL,
    newVariables: [set(state`app.parameters.variables`,input`newVariables`)],
    newQuery: [set(state`app.parameters.query`,input`newQuery`)],
    newOperationName: [set(state`app.parameters.operationName`,input`newOperationName`)],
    setParameters: [set(state`app.parameters`,input`parameters`)],
    setSchema: [set(state`app._schema`,input`__schema`)],
    resolveType: [
      when(state`app.${input`type.type`}.${input`type.ref`}`), {
        true:[merge(state`app.${input`type.type`}.${input`type.ref`}`,input`type`)],
        false:[
          set(state`app.${input`type.type`}`,{}),
          set(state`app.${input`type.type`}.${input`type.ref`}`,input`type`),
        ]
      }

    ],
  }
}
