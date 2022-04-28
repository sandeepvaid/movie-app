import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const store = this.props.store;

    const subs = store.subscribe(() => {
      this.forceUpdate();
    });
    // console.log("Dispatch");
    console.log(typeof subs);
    store.dispatch(addMovies(data));
    // console.log(store.getState());
  }

  onChangeTab = (val) => {
    const store = this.props.store;
    store.dispatch(setShowFavourites(val));
  };

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const index = movies.favourites.indexOf(movie);

    if (index != -1) {
      return true;
    }
    return false;
  };

  render() {
    const { movies } = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;
    console.log("store", this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movie-${index}`}
                dispatch={this.props.store.dispatch}
                isMovieFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No movies to display</div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
