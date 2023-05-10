import { useState, useEffect } from 'react';
import * as React from 'react';
import './App.css';
import axios from 'axios';

const API_ENDPOINT = 'http://api.geonet.org.nz/news/geonet';
const requestOptions = {
  headers: { 'Content-Type': 'application/json' },
};
const apiReducer = (state, action) => {
  switch (action.type) {
    case 'API_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'API_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'API_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      throw new error(console.log('Error'));
  }
};

function App() {
  const [url, setUrl] = React.useState(`${API_ENDPOINT}`);
  const [apiResult, dispatchApiResult] = React.useReducer(apiReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchAPI = React.useCallback(async () => {
    dispatchApiResult({ type: 'API_FETCH_INIT' });

    try {
      const result = await axios.get(url);

      dispatchApiResult({
        type: 'API_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchApiResult({ type: 'API_FETCH_FAILURE' });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchAPI();
  }, [handleFetchAPI]);
  return (
    <>
      <div>
        <h1>API GEONET V2.0</h1>
        <hr />

        {apiResult.isError && <p>Oops unable to load data</p>}
        {apiResult.isLoading ? (
          <p>Loading data ...</p>
        ) : (
          <h2>
            <List list={apiResult.data} />
          </h2>
        )}
      </div>
    </>
  );
}

const List = ({ list }) => <ul>{}</ul>;

const Item = ({ item }) => (
  <li>
    <p>{item.title}</p>
  </li>
);

export default App;
