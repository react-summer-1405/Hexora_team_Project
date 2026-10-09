
const TopCard = ({ level, subject }) => {
  return (
                   <div className="relative h-73 bg-blue-200 rounded-4xl">
                    <img src=".." className="w-full h-full"/>
                    <div className="absolute flex flex-row gap-2 top-2 right-4">
                        <span className="text-[14px] font-medium text-text-white bg-badge-purple rounded-4xl px-2 py-0.5">{level}</span>
                        <span className="text-[14px] font-medium text-text-white bg-primary rounded-4xl px-2 py-0.5">{subject}</span>
                    </div>
                </div>
  )
}

export default TopCard