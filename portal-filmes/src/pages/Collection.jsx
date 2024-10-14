import { useState, useEffect } from "react";

export default function ColecaoPage() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [seriesPopulares, setSeriesPopulares] = useState([]);
    const [filmesAssistidos, setFilmesAssistidos] = useState([]);
    const [seriesAssistidas, setSeriesAssistidas] = useState([]);
    const [filmesParaVer, setFilmesParaVer] = useState([]);
    const [seriesParaVer, setSeriesParaVer] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [slidePopulares, setSlidePopulares] = useState(0);
    const [slideSeries, setSlideSeries] = useState(0);

    const apiKey = "7c572a9f5b3ba776080330d23bb76e1e";
    const cardWidth = 220;
    const maxVisibleCards = Math.floor(window.innerWidth / cardWidth);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`)
            .then(res => res.json())
            .then(res => setFilmesPopulares(res.results))
            .catch(erro => console.log(erro));

        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR`)
            .then(res => res.json())
            .then(res => setSeriesPopulares(res.results))
            .catch(erro => console.log(erro));

        setFilmesAssistidos(JSON.parse(localStorage.getItem("filmesAssistidos")) || []);
        setSeriesAssistidas(JSON.parse(localStorage.getItem("seriesAssistidas")) || []);
        setFilmesParaVer(JSON.parse(localStorage.getItem("filmesParaVer")) || []);
        setSeriesParaVer(JSON.parse(localStorage.getItem("seriesParaVer")) || []);
    }, []);

    const addMovieToList = (item, listName) => {
        const isAssisted = listName === 'assistidos';
        const list = isAssisted ? (item.media_type === "movie" ? filmesAssistidos : seriesAssistidas) :
            (item.media_type === "movie" ? filmesParaVer : seriesParaVer);

        const isDuplicate = list.some(existingItem => existingItem.id === item.id);

        if (!isDuplicate) {
            const updatedList = [...list, item];
            localStorage.setItem(isAssisted ? (item.media_type === "movie" ? "filmesAssistidos" : "seriesAssistidas") :
                (item.media_type === "movie" ? "filmesParaVer" : "seriesParaVer"),
                JSON.stringify(updatedList));

            if (isAssisted) {
                item.media_type === "movie" ? setFilmesAssistidos(updatedList) : setSeriesAssistidas(updatedList);
            } else {
                item.media_type === "movie" ? setFilmesParaVer(updatedList) : setSeriesParaVer(updatedList);
            }

            if (isAssisted) {
                const paraVerList = item.media_type === "movie" ? filmesParaVer : seriesParaVer;
                const updatedParaVerList = paraVerList.filter(existingItem => existingItem.id !== item.id);
                localStorage.setItem(item.media_type === "movie" ? "filmesParaVer" : "seriesParaVer",
                    JSON.stringify(updatedParaVerList));
                item.media_type === "movie" ? setFilmesParaVer(updatedParaVerList) : setSeriesParaVer(updatedParaVerList);
            }
        }
    };

    const removeMovieFromList = (item) => {
        const updatedList = (item.media_type === "movie" ? filmesAssistidos : seriesAssistidas)
            .filter(movie => movie.id !== item.id);

        localStorage.setItem(item.media_type === "movie" ? "filmesAssistidos" : "seriesAssistidas", 
            JSON.stringify(updatedList));

        item.media_type === "movie" ? setFilmesAssistidos(updatedList) : setSeriesAssistidas(updatedList);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAssistidos = [...filmesAssistidos, ...seriesAssistidas].filter(item => (item.title || item.name) && (item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredParaVer = [...filmesParaVer, ...seriesParaVer].filter(item => (item.title || item.name) && (item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredSeries = seriesPopulares.filter(series => series.name && series.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredFilmesPopulares = filmesPopulares.filter(movie => movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handlePreviousSlide = (slide, setSlide) => {
        setSlide(Math.max(slide - cardWidth * maxVisibleCards, 0));
    };

    const handleNextSlide = (slide, setSlide, items) => {
        const maxSlide = (items.length - maxVisibleCards) * cardWidth;
        setSlide(Math.min(slide + cardWidth * maxVisibleCards, maxSlide));
    };

    return (
        <div className="overflow-x-hidden">
            <div className="flex justify-center mb-4 w-screen">
                <input
                    type="text"
                    placeholder="Buscar na coleção..."
                    className="text-white mb-3 p-2 border-2 border-red-600 bg-transparent rounded w-[94%] sm:w-[40%] scale-90 focus:scale-95 transition-all duration-500 ease"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="pl-[24px]">
                <div className="flex flex-col gap-8">
                    <section>
                        <h2 className="text-xl mb-3">Populares</h2>
                        <div className="relative flex items-center overflow-x-hidden">
                            <button onClick={() => handlePreviousSlide(slidePopulares, setSlidePopulares)} className="absolute mb-16 left-4 z-10 bg-red-600 text-white p-2 rounded transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95">◄</button>
                            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${slidePopulares}px)` }}>
                                {filteredFilmesPopulares.map(movie => (
                                    <div key={movie.id} className="w-[180px] flex flex-col mr-2 items-center">
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-[270px] object-cover rounded-md mb-2 transition-all border-2 border-transparent" />
                                        <button onClick={() => addMovieToList(movie, 'paraVer')} className="text-md hover:bg-red-600 border-[1px] border-red-600 text-white p-2 rounded w-[98%] mb-2 transition duration-200 ease active:scale-95">Para Ver</button>
                                        <button onClick={() => addMovieToList(movie, 'assistidos')} className="text-md hover:bg-green-600 border-[1px] border-green-600 text-white p-1 rounded w-[98%] transition duration-200 ease active:scale-95">Assistido</button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => handleNextSlide(slidePopulares, setSlidePopulares, filmesPopulares)} className="absolute mb-16 right-4 z-10 bg-red-600 text-white p-2 rounded transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95">►</button>
                        </div>
                    </section>

                    <hr className="border-[1px] text-white opacity-10 w-[104%]" />

                    <section>
                        <h2 className="text-xl mb-3">Séries de TV</h2>
                        <div className="relative flex items-center overflow-x-hidden">
                            <button onClick={() => handlePreviousSlide(slideSeries, setSlideSeries)} className="absolute mb-16 left-4 z-10 bg-red-600 text-white p-2 rounded transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95">◄</button>
                            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${slideSeries}px)` }}>
                                {filteredSeries.map(series => (
                                    <div key={series.id} className="w-[180px] flex flex-col mr-2 items-center">
                                        <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.title} className="w-full h-[270px] object-cover rounded-md mb-2 transition-all border-2 border-transparent" />
                                        <button onClick={() => addMovieToList(series, 'paraVer')} className="text-md hover:bg-red-600 border-[1px] border-red-600 text-white p-2 rounded w-[98%] mb-2 transition duration-200 ease active:scale-95">Para Ver</button>
                                        <button onClick={() => addMovieToList(series, 'assistidos')} className="text-md hover:bg-green-600 border-[1px] border-green-600 text-white p-1 rounded w-[98%] transition duration-200 ease active:scale-95">Assistido</button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => handleNextSlide(slideSeries, setSlideSeries, seriesPopulares)} className="absolute mb-16 right-4 z-10 bg-red-600 text-white p-2 rounded transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95">►</button>
                        </div>
                    </section>

                    <hr className="border-[1px] text-white opacity-10 w-[104%]" />

                    <section>
                        <h2 className="text-xl mb-3">Para Ver</h2>
                        <div className="flex flex-wrap gap-4">
                            {filteredParaVer.map(item => (
                                <div key={item.id} className="flex flex-col items-center mb-4">
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="w-32 h-48 object-cover rounded-md mb-2" />
                                </div>
                            ))}
                        </div>
                    </section>

                    <hr className="border-[1px] text-white opacity-10 w-[104%]" />

                    <section>
                        <h2 className="text-xl mb-3">Assistidos</h2>
                        <div className="flex flex-wrap gap-4">
                            {filteredAssistidos.map(item => (
                                <div key={item.id} className="flex flex-col items-center mb-4">
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="w-32 h-48 object-cover rounded-md mb-2" />
                                    <button onClick={() => removeMovieFromList(item)} className="text-sm bg-red-950 text-white py-1 w-full hover:bg-red-600 rounded transition duration-200 ease active:scale-90">Remover</button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
