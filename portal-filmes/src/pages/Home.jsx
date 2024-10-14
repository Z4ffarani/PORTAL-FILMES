import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardContainer from "../components/CardContainer.jsx";
import MoviePopup from "../components/MoviePopup.jsx";

export default function Home() {
    const [slidePopulares, setSlidePopulares] = useState(0);
    const [slidePorVir, setSlidePorVir] = useState(0);
    const [slideSeries, setSlideSeries] = useState(0);
    const navigate = useNavigate();

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesPorVir, setFilmesPorVir] = useState([]);
    const [seriesPopulares, setSeriesPopulares] = useState([]);

    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const cardWidth = 220;
    const maxSlide = (items) => (items.length * cardWidth) - window.innerWidth;

    const handlePreviousSlide = (setSlide, slide) => {
        setSlide(Math.max(slide - cardWidth, 0));
    };

    const handleNextSlide = (setSlide, slide, items) => {
        setSlide((slide + cardWidth >= maxSlide(items)) ? 0 : slide + cardWidth);
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR')
            .then(res => res.json())
            .then(res => setFilmesPopulares(res.results))
            .catch(erro => console.log(erro));

        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR')
            .then(res => res.json())
            .then(res => setFilmesPorVir(res.results))
            .catch(erro => console.log(erro));

        fetch('https://api.themoviedb.org/3/tv/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR')
            .then(res => res.json())
            .then(res => setSeriesPopulares(res.results))
            .catch(erro => console.log(erro));
    }, []);

    return (
        <div className="pl-[60px] overflow-x-hidden">
            <div className="flex flex-col items-center gap-8 mb-14">
                <CardContainer titulo="Populares">
                    <div className="relative flex items-center w-screen">
                        <button onClick={() => handlePreviousSlide(setSlidePopulares, slidePopulares)} className="absolute z-10 left-4 bg-red-600 text-white p-2 rounded active:scale-95">◄</button>
                        <div className="overflow-x-hidden">
                            <div className="flex transition-transform duration-300 ease" style={{ transform: `translateX(-${slidePopulares}px)` }}>
                                {filmesPopulares.map(filme => (
                                    <div 
                                        key={filme.id} 
                                        className="flex flex-col items-center mr-2" 
                                        style={{ minWidth: '200px' }}
                                        onClick={() => handleMovieClick(filme.id)}
                                    >
                                        <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} className="w-[200px] h-[300px] object-cover rounded-md cursor-pointer transition-all duration-200 ease-out border-transparent border-[3px] hover:border-red-600 hover:scale-[97%] active:scale-95" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => handleNextSlide(setSlidePopulares, slidePopulares, filmesPopulares)} className="absolute right-16 bg-red-600 text-white p-2 rounded active:scale-95">►</button>
                    </div>
                </CardContainer>

                <hr className="border-[1px] text-white opacity-10 w-[104%]" />

                <CardContainer titulo="Em breve">
                    <div className="relative flex items-center w-screen">
                        <button onClick={() => handlePreviousSlide(setSlidePorVir, slidePorVir)} className="absolute z-10 left-4 bg-red-600 text-white p-2 rounded active:scale-95">◄</button>
                        <div className="overflow-x-hidden flex">
                            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${slidePorVir}px)` }}>
                                {filmesPorVir.map(filme => (
                                    <div 
                                        key={filme.id} 
                                        className="flex flex-col items-center mr-2" 
                                        style={{ minWidth: '200px' }}
                                        onClick={() => handleMovieClick(filme.id)}
                                    >
                                        <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} className="w-[200px] h-[300px] object-cover rounded-md cursor-pointer transition-all duration-200 ease-out border-transparent border-[3px] hover:border-red-600 hover:scale-[97%] active:scale-100" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => handleNextSlide(setSlidePorVir, slidePorVir, filmesPorVir)} className="absolute right-16 bg-red-600 text-white p-2 rounded active:scale-95">►</button>
                    </div>
                </CardContainer>

                <hr className="border-[1px] text-white opacity-10 w-[104%]" />

                <CardContainer titulo="Séries de TV">
                    <div className="relative flex items-center w-screen">
                        <button onClick={() => handlePreviousSlide(setSlideSeries, slideSeries)} className="absolute z-10 left-4 bg-red-600 text-white p-2 rounded active:scale-95">◄</button>
                        <div className="overflow-x-hidden flex">
                            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${slideSeries}px)` }}>
                                {seriesPopulares.map(serie => (
                                    <div 
                                        key={serie.id} 
                                        className="flex flex-col items-center mr-2" 
                                        style={{ minWidth: '200px' }}
                                        onClick={() => handleMovieClick(serie.id)}
                                    >
                                        <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.title} className="w-[200px] h-[300px] object-cover rounded-md cursor-pointer transition-all duration-200 ease-out border-transparent border-[3px] hover:border-red-600 hover:scale-[97%] active:scale-100" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => handleNextSlide(setSlideSeries, slideSeries, seriesPopulares)} className="absolute right-16 bg-red-600 text-white p-2 rounded active:scale-95">►</button>
                    </div>
                </CardContainer>

                {selectedMovieId && <MoviePopup movieId={selectedMovieId} onClose={() => setSelectedMovieId(null)} />}
            </div>
        </div>
    );
}
