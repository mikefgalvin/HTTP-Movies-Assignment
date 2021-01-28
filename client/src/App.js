import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateForm from "./Movies/UpdateForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);


  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log('get res', res.data)
        setMovieList(res.data)
      }
        )
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

 
  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Switch>
        <Route exact path="/">
          <MovieList movies={movieList} />
        </Route>

        {/* <Route exact path="/" render ={
          props => {
          return(<MovieList {...props} movies={movieList} />)
        }
        }/> */}


        <Route path="/movies/:id" render ={
          props => {
          return(<Movie {...props} addToSavedList={addToSavedList} setMovieList={setMovieList} movies={movieList} />)
        }
        }/>
        <Route path='/update-movie/:id' render={
          props => {
            return(<UpdateForm {...props} setMovieList={setMovieList} movies={movieList}/>)
          }
        }/>
      </Switch>
    </>
  );
};

export default App;
