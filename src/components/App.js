import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { connect } from "react-redux";
import { addMovies, setShowFavourites } from "../actions";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(addMovies(data));
  }

  onChangeTab = (val) => {
    const store = this.props;
    store.dispatch(setShowFavourites(val));
  };

  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);

    if (index != -1) {
      return true;
    }
    return false;
  };

  render() {
    console.log("App.js = ", this.props);
    const { movies, search } = this.props;
    const { list, favourites, showFavourites } = movies;
    // console.log("store", this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />
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
                dispatch={this.props.dispatch}
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

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}
const connectedComponent = connect(mapStateToProps)(App);
export default connectedComponent;
