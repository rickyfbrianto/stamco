function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className={`animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500`}>

            </div>
        </div>
    )
}

const LoaderBounce = () => {
    return (<div className="flex gap-2">
        {Array.from({ length: 5 }, (v, i) => i).map(v => (
            <div key={v} className="flex animate-bounce h-2 w-2 bg-blue-300 rounded-full">
            </div>
        ))}
    </div>)
}

export { LoaderBounce }

export default Loader