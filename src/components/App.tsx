import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";
import "../App.css";

interface IState {
  loading: boolean;
  movies: { Poster: string; Title: string; Year: string }[];
  errorMessage: string | null;
}

interface IAction {
  type: ActionType;
  payload?: { Poster: string; Title: string; Year: string }[];
  error?: string;
}

enum ActionType {
  SEARCH_MOVIES_REQUEST = "SEARCH_MOVIES_REQUEST",
  SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS",
  SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE"
}

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState: IState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case ActionType.SEARCH_MOVIES_SUCCESS:
      if (action.payload) {
        return {
          ...state,
          loading: false,
          movies: action.payload
        };
      } else {
        return state;
      }
    case ActionType.SEARCH_MOVIES_FAILURE:
      if (action.error) {
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: ActionType.SEARCH_MOVIES_SUCCESS,
          payload: jsonResponse.Search
        });
      });
  }, []);

  const search = (searchValue: string) => {
    dispatch({
      type: ActionType.SEARCH_MOVIES_REQUEST
    });
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: ActionType.SEARCH_MOVIES_SUCCESS,
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: ActionType.SEARCH_MOVIES_FAILURE,
            error: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="Hooked" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>

      {loading && !errorMessage ? (
        <span>loading...</span>
      ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        <div className="movies">
          {movies.map((m, i) => (
            <Movie key={i} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
