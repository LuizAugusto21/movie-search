import {useState} from "react";

import './App.css'
import searchIcon from './Search.svg';
import MovieCard from "./MovieCard";
//e6b9c650
const api_url = 'http://www.omdbapi.com?apiKey=e6b9c650';


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${api_url}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    return (
    <>
        <div className="app">
            <h1>MovieSearch</h1>

            <div className="search">
                <input 
                    placeholder="Search a movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <img 
                    src={searchIcon} 
                    alt="search Icon"
                    onClick = {() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies.length > 0 ? 
                (
                    <div className="container">
                        {
                            movies.map((movie) => (
                                    <MovieCard movie={movie} />
                                )
                            )
                        }
                    </div>
                ) :
                (
                    <div className="empty">
                        <h1>No Movies found</h1>
                    </div>
                )

            }
        </div>
    </>
    );
}

export default App;