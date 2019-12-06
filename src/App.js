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
      error: null
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
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
