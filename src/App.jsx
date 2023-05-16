import { useState } from 'react';
import * as React from 'react';
import axios from 'axios';

import './App.css';

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
  const endPoints = {
    news: { url: 'http://api.geonet.org.nz/news/geonet' },
    strong: {
      url: 'http://api.geonet.org.nz/geonet/intensity/strong/processed/',
    },
    intensity: { url: 'http://api.geonet.org.nz/intensity?type=measured' },
  };
  const fetchUrl = 'https://hn.algolia.com/api/v1/search?query=';
  const [apiResult, dispatchApiResult] = React.useReducer(apiReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchApi = React.useCallback(() => {
    dispatchApiResult({ type: 'API_FETCH_INIT' });

    axios
      .get(fetchUrl)
      .then((result) => {
        dispatchApiResult({
          type: 'API_FETCH_SUCCESS',
          payload: result.data.hits,
        });
      })
      .catch(() => dispatchApiResult({ type: 'API_FETCH_FAILURE' }));
  }, [fetchUrl]);

  React.useEffect(() => {
    handleFetchApi;
  }, [fetchUrl]);

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
  {
    console.log('The list', { list });
    <Item key={item.objectID} item={item} />;
  }
};
const Item = ({ item }) => {
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>;
};
export default App;
