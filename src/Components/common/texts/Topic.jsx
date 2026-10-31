
const Topic = ({content,className}) => {
  return (
    <div className={`text-2xl sm:text-3xl font-bold text-center cursor-default ${className}`}>{content}</div>
  )
}

export default Topic