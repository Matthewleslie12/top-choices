const Button = ({children, className, style}) => {
  const defaultClasses =
    "rounded-lg h-12 w-full font-semibold mt-3 lg:h-16 lg:text-xl";

  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <button style={{...style}} className={combinedClasses} type="submit">
      {children}
    </button>
  );
};

export default Button;
