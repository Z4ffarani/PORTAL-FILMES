export default function CardContainer({ titulo, children }) {
    return(
        <div>
            <h1 className="text-xl mb-3 ml-[2px]">{titulo}</h1>
            {children}
        </div>
    )
}