export default function Login({ isLogged, handleLogin }) {
    return (
        <div className="flex gap-4 items-center">
            {isLogged && <p className="font-light ml-[-143px] hidden md:flex">Olá, Usuário!</p>}
            <button
                className={`${isLogged ? "scale-90 bg-red-600 border-[2px] border-transparent": "border-[2px] border-red-600"} text-white font-semibold px-2 py-1 rounded transition-all duration-300 ease-out`}
                onClick={handleLogin}>
                {isLogged ? "Logout" : "Login"}
            </button>
        </div>
    )
}
