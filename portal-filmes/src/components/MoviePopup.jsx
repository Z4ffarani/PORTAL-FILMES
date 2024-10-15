import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MoviePopup() {
    const { id: movieId } = useParams();
    const navigate = useNavigate();
    const [movieDetails, setMovieDetails] = useState(null);
    const [trailer, setTrailer] = useState(null);

    const handleClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
            .then(res => res.json())
            .then(data => {
                setMovieDetails(data);
                return fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`);
            })
            .then(res => res.json())
            .then(creditsData => {
                setMovieDetails(prevDetails => ({
                    ...prevDetails,
                    actors: creditsData.cast
                }));
            });
    
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
            .then(res => res.json())
            .then(data => {
                const officialTrailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                setTrailer(officialTrailer);
            });
    }, [movieId]);
    
    if (!movieDetails) return null;

    return (
        <div className="flex inset-0 bg-[#0a0a0a] bg-opacity-80 justify-center z-50">
            <div className="rounded-lg max-w-2xl w-full relative scale-[95%] p-8 text-justify">
                <button onClick={handleClose} className="absolute top-0 right-2 text-red-600 text-[30px] transition duration-100 font-bold hover:scale-[120%]">&times;</button>
                
                <div className="relative">
                    <img src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt={movieDetails.title} className="w-full rounded-xl" />
                    <h2 className="text-[25px] text-left font-bold py-4">{movieDetails.title}</h2>
                </div>
                
                <div className='flex justify-between text-[20px]'>
                    <p><strong>Lançamento: </strong>{movieDetails.release_date}</p>
                    <p><strong>Avaliação: </strong>{movieDetails.vote_average}</p>
                </div>

                <p className='py-3'>{movieDetails.overview}</p>

                {trailer && (
                    <div className="my-4">
                        <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className='rounded-xl'
                        ></iframe>
                    </div>
                )}

                <p className='text-[20px] text-center pt-3'><strong>Elenco:</strong></p>

                {movieDetails.actors && (
                    <div className="pb-4 flex flex-wrap justify-center items-center">
                        {movieDetails.actors.map(actor => (
                            <p key={actor.id} className='text-[15px] opacity-50'> •ㅤ{actor.name}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}