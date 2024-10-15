import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Genres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR')
            .then(res => res.json())
            .then(res => setGenres(res.genres))
            .catch(erro => console.log(erro));
    }, []);

    return (
        <div className="flex flex-col items-center gap-4 mb-10 h-full">
            <div className="flex flex-wrap gap-2 justify-center items-center px-4">
                {genres.map(genre => (
                    <Link 
                      key={genre.id} 
                      to={`/genres/${genre.id}`} 
                      className="bg-red-600 text-white px-3 py-2 rounded-md transition duration-200 ease hover:bg-red-800 active:scale-90"
                    >
                      {genre.name}
                    </Link>
                ))}
            </div>
            <Outlet />
        </div>
    );
}