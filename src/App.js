import {createContext, useState} from "react";
import ReactSwitch from "react-switch";

import './App.css'
import searchIcon from './Search.svg';
import MovieCard from "./MovieCard";

export const ThemeContext = createContext(null)

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

    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    }

    return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
        <div className="app" id={theme}>

            <div className="switch">
                <ReactSwitch></ReactSwitch>
                </div>

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
    </ThemeContext.Provider>
    );
}

export default App;