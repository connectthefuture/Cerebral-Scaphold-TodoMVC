import React from 'react'
import { connect } from 'cerebral/react'
import NewTodoForm from '../NewTodo'
import TodosList from '../List'
import TodosFooter from '../Footer'
import Recorder from '../Recorder'
import visibleTodosRefs from '../../computed/visibleTodosRefs'

export default connect({
  todos: 'app.todos.**',
  isSaving: 'app.isSaving',
  visibleTodosRefs: visibleTodosRefs
},{
  mounted: 'app.mounted'
},
  class App extends React.Component {
    componentDidMount(){
      this.props.mounted()
    }
    render(){
      return (
        <div id='todoapp-wrapper'>
          <Recorder />
          <section className='todoapp'>
            <header className='header'>
              <h1>todos</h1>
              <NewTodoForm />
            </header>
            {this.props.visibleTodosRefs.length ? <TodosList /> : null}
            {Object.keys(this.props.todos).length ? <TodosFooter /> : null}
          </section>
          <footer className='info'>
            <p>
              Double-click to edit a todo
            </p>
            <p>
              Credits:
              <a href='https://cerebral.github.io/'>Cerebral</a>,
            </p>
            <p>
              Part of <a href='http://todomvc.com'>TodoMVC</a>
            </p>
          </footer>
        </div>
      )
    }
  }
)
