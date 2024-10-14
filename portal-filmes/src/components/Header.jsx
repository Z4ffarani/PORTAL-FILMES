import { NavLink } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';

export default function Header() {

    const [isLogged, setIsLogged] = useState(false);
    const handleLogin = () => {
        setIsLogged(!isLogged);
    }

    return (
        <header className="flex bg-[#0a0a0a] text-white justify-between sm:text-[15px] lg:text-[22px] px-6 h-[100px] items-center">
            <h1 className='hidden sm:flex font-bold select-none animate-blink hover:text-red-600 transition duration-300 ease'>P𖦹RTAL FILMES</h1>
            <ul className="flex gap-3 lg:gap-8 xl:mr-[130px]">
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? 'text-red-600 transition-all duration-100 ease-in font-semibold' : 'text-white font-semibold'}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/collection" 
                        className={({ isActive }) => isActive ? 'text-red-600 transition-all duration-100 ease-in font-semibold' : 'text-white font-semibold'}
                    >
                        Coleção
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/genres" 
                        className={({ isActive }) => isActive ? 'text-red-600 transition-all duration-100 ease-in font-semibold' : 'text-white font-semibold'}
                    >
                        Gêneros
                    </NavLink>
                </li>
            </ul>
            <Login isLogged={isLogged} handleLogin={handleLogin} />
        </header>
    );
}
