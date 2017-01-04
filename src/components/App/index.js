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
            <div
              style={{
                paddingTop: 25,
                marginTop: 25
              }}>
              <img
                style={{
                  width:'25%',
                  marginLeft: "12.5%"
                }} src={process.env.PUBLIC_URL + '/cerebral.png'} alt={'cerebral'}/>
              <img
                style={{
                  width:'25%',
                  marginLeft: "25%"
                }} src={process.env.PUBLIC_URL + '/scaphold.webp'} alt={'scaphold'}/>
            </div>
            <h1>todos</h1>

            <header className='header'>
              <NewTodoForm />
            </header>
            {this.props.visibleTodosRefs.length ? <TodosList /> : null}
            {Object.keys(this.props.todos).length ? <TodosFooter /> : null}
          </section>
          <footer className='info'>
            <h3>
              Double-click to edit a todo
            </h3>
            <h3>
              Credits:
              <a href='https://cerebral.github.io/'>Cerebral</a>,
            </h3>
            <h3>
              Part of <a href='http://todomvc.com'>TodoMVC</a>
            </h3>
          </footer>
        </div>
      )
    }
  }
)
