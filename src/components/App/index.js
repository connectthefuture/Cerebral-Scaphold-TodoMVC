import React from 'react'
import { connect } from 'cerebral/react'
import NewTodoForm from '../NewTodo'
import TodosList from '../List'
import TodosFooter from '../Footer'
import Recorder from '../Recorder'
import GraphiQL from '../CustomGraphiQL'
import visibleTodosRefs from '../../computed/visibleTodosRefs'

export default connect({
  window: 'useragent.window.**',
  todos: 'app.todos.**',
  isSaving: 'app.isSaving',
  graphQLMode: 'app.graphQLMode',
  visibleTodosRefs: visibleTodosRefs
},{
  mounted: 'app.mounted',
  toggleGraphiQL : 'app.toggleGraphiQL'
},
  class App extends React.Component {
    componentDidMount(){
      this.props.mounted()
    }
    render(){
      return (
        <div id="app-wrapper" style={{width:this.props.window.width, height:this.props.window.height}}>
          { !this.props.graphQLMode ?
            <div id='todoapp-wrapper'>
              <section className='todoapp'>
                <div className="app-title">Cerebral Scaphold TodoMVC</div>
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
                <div className="btn-container">
                  <Recorder className="btn" />
                  <div onClick={()=>{
                    this.props.toggleGraphiQL()
                  }} className="btn">GraphiQL</div>
                </div>
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
            </div> : null}
          {this.props.graphQLMode ? <GraphiQL /> : null}
        </div>
      )
    }
  }
)
