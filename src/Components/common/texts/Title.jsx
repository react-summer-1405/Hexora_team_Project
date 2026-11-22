const Title = ({ content , className , ref }) => {
  
  return (
    <h2 ref={ref} className={` w-70 lg-w-80 text-[32px] lg:text-[40px] font-bold ${className}`}>
      {content}
    </h2>
  );
};

export default Title;
