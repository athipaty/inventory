export default function Input({ text , onClick}) {
  return (
    <div className="flex flex-col mx-2 gap-1">
        <label className="ml-1">{text}</label>
        <input className="border text-center px-4 py-2 rounded-xl focus:bg-gray-100"onClick={onClick} />
    </div>
  ) 
}
