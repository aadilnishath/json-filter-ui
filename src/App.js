import { Grid, TextField } from '@material-ui/core';
import graphql from 'graphql-anywhere';
import gql from 'graphql-tag';
import React from 'react';
import ReactJson from 'react-json-view';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      source: '',
      query: '',
      error: null,
      demo: {
        hello: 'value',
        hi: 5,
        welcome: {
          adil: 'value'
        },
        employees: [
          {
            id: 1
          }, {
            id: 2
          }
        ]
      }
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  something(obj) {
    let keys = [];
    keys = Object.keys(obj);
    keys.forEach(key => {
      if (!obj[key] instanceof Array) {
        let subKeys = this.something(obj[key]);
        subKeys.forEach(subKey => {
          keys.push(key + "." + subKey);
        });
      }
      if (obj[key] instanceof Array) {
        obj[key].forEach(element => {
          let subKeys = this.something(element);
          subKeys.forEach(subKey => {
            keys.push(key + "." + subKey);
          })
        });
      }
    });
    return keys;
  }

  render() {
    const data = Array.from(new Set(this.something(this.state.demo))).sort();
    console.log(data);

    const resolver = (fieldName, root) => root[fieldName];
    let query, source, result;
    try {
      source = JSON.parse(this.state.source);
      query = gql`${this.state.query}`;
      result = graphql(resolver, query, source);
    } catch (e) {

    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Paste JSON here!"
            variant='outlined'
            name='source'
            placeholder='source'
            multiline
            rowsMax='1'
            rows='1'
            value={this.state.source}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          {source && <ReactJson
            src={source}
            displayDataTypes={false}
            displayObjectSize={false}

          />}
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            variant='outlined'
            name='query'
            placeholder="query"
            multiline
            rowsMax='30'
            rows='30'
            value={this.state.query}
            onChange={this.handleChange}
          />
        </Grid>

        <Grid item xs={5}>
          <ReactJson
            src={result}
            displayDataTypes={false}
            displayObjectSize={false}
          />
        </Grid>
      </Grid  >
    );
  }
}


export default App;
