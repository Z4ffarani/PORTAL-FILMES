import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function GenreMovies() {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&with_genres=${genreId}`)
            .then(res => res.json())
            .then(res => setMovies(res.results))
            .catch(erro => console.log(erro));
    }, [genreId]); 

    return (
        <div className="flex flex-wrap gap-4 justify-center my-4">
            {movies.map(movie => (
                <div key={movie.id} className="flex flex-col items-center">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                        className="w-[200px] h-[300px] object-cover rounded-md"
                    />
                </div>
            ))}
        </div>
    );
}