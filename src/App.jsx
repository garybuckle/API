import { useState } from 'react';
import * as React from 'react';

import './App.css';

const API_ENDPOINT =
  'http://api.geonet.org.nz/news/geonet                                                                 ';

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
  const [apiResult, dispatchApiResult] = React.useReducer(apiReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  React.useEffect(() => {
    dispatchApiResult({ type: 'API_FETCH_INIT' });
    fetch(`${API_ENDPOINT}`)
      .then((response) => response.json())
      .then((result) => {
        dispatchApiResult({ type: 'API_FETCH_SUCCESS', payload: result.hits });
      })
      .catch(() => {
        dispatchApiResult({ type: 'API_FETCH_FAILURE' });
      });
  }, []);
  return (
    <>
      <div>
        <h1>API GEONET</h1>
        <hr />
        {apiResult.isError && <p>Ooops!! Unable to load data</p>}
        {apiResult.isLoading ? (
          '(<p>Fetching Content... hold tight!</p>'
        ) : (
          <h2>
            <List list={apiResult.data} />
          </h2>
        )}
      </div>
    </>
  );
}

const List = (list) => {
  <ul>The list of items</ul>;
};
const Item = () => {};
export default App;
