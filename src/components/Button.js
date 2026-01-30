export default function Button({color = 'blue', text}) {
    const colors = {
        blue: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl m-2',
        red: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl m-2'
    }
    return (
        <button className={`${colors[color]}`}>{text}</button>
    )
}