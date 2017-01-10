import React from 'react'
import {connect} from 'cerebral/react'
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

export default connect({
  // State
  window:'useragent.window.**',
  parameters: 'app.parameters.**'
},{
  // Signals
  toggleGraphiQL: 'app.toggleGraphiQL',
  setParameters: 'app.setParameters',
  setSchema: 'app.setSchema',
  resolveType: 'app.resolveType',
  newVariables: 'app.newVariables',
  newQuery: 'app.newQuery',
  newOperationName: 'app.newOperationName',
  },
  class CustomGraphiQL extends React.Component {
    constructor(props) {
      super(props);
      this.props = props
      this.search = window.location.search;
      this.search.substr(1).split('&').forEach((entry) => {
        const eq = entry.indexOf('=');
        if (eq >= 0) {
          // this.parameters[decodeURIComponent(entry.slice(0, eq))] =
          //   decodeURIComponent(entry.slice(eq + 1));

        }
      });
      if (this.props.parameters.variables) {
        try {
          this.props.newVariables({newVariables: JSON.stringify(JSON.parse(this.parameters.variables), null, 2)})
        } catch (e) {
          // Do nothing, we want to display the invalid JSON as a string, rather
          // than present an error.
        }
      }
      this.onEditQuery = (newQuery) => {
        this.props.newQuery({newQuery: newQuery})
        this.updateURL();
      }
      this.onEditVariables = (newVariables) => {
        this.props.newVariables({newVariables: newVariables})
        this.updateURL();
      }
      this.onEditOperationName = (newOperationName) => {
        this.props.newOperationName({newOperationName: newOperationName})
        this.updateURL();
      }
      this.updateURL = () => {
        const newSearch = '?' + Object.keys(this.props.parameters).filter((key) => {
          return Boolean(this.props.parameters[key]);
        }).map((key) => {
          return encodeURIComponent(key) + '=' +
            encodeURIComponent(this.props.parameters[key]);
        }).join('&');
        history.replaceState(null, null, newSearch);
      }
      this.graphQLFetcher = (graphQLParams) => {
        console.log(graphQLParams);
          return fetch('https://us-west-2.api.scaphold.io/graphql/obese-passenger', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(graphQLParams),
          }).then((response) => {
            return response.text();
          }).then((responseBody) => {
            const json = JSON.parse(responseBody)
            if(json.data.__schema){
              this.props.setSchema({__schema: json})
              return json
            }
            const populateState = (json) =>{
              if(json.data.viewer){
                const viewer = json.data.viewer
                Object.keys(viewer).forEach( key => {
                  if(viewer[key].edges){
                    viewer[key].edges.forEach( edge => {
                      console.log(edge.node.ref);
                      this.props.resolveType({
                        type:edge.node
                      })
                    })
                  }
                })
                return viewer
              }
            }
            populateState(json);
            return json
          });
        }
    }
    render() {
      return (
        <GraphiQL
          style={{height:this.props.window.height, width:this.props.window.width}}
          fetcher={this.graphQLFetcher}
          query={this.props.parameters.query}
          variables={this.props.parameters.variables}
          operationName={this.props.parameters.operationName}
          onEditQuery={this.onEditQuery}
          onEditVariables={this.onEditVariables}
          onEditOperationName={this.onEditOperationNam}
        >
          <GraphiQL.Logo>
            <h3 className="cerebralTitle">Cerebral</h3>
            <h5 className="cerebralSubTitle">make sense of complex apps</h5>
          </GraphiQL.Logo>
          <GraphiQL.Toolbar>
            <button
              onClick={()=>{
                this.props.toggleGraphiQL()
              }}
              className="btn">TodoMVC</button>
          </GraphiQL.Toolbar>
        </GraphiQL>
      );
    }
  }
)
