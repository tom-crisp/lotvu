const Button = ({title}: {title: string}) => {
    return <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">{title}</button>
}

export default Button;