
const CaptionOfTitle = ({content , className}) => {
  return (
    <h4
      className={`w-73 text-sm lg:text-base font-medium text-text-muted text-center ${className}`}
    >
      {content}
    </h4>
  )
}

export default CaptionOfTitle