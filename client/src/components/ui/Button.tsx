interface BackToTopButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

const BackToTopButton = ({
  onClick,
  label = "Back to Top",
  className = "",
}: BackToTopButtonProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={onClick || handleScrollToTop}
      className={`px-4 py-2 bg-accent text-white rounded-md shadow-md  hover:bg-orange-500 transition ${className}`}
    >
      {label}
    </button>
  );
};

export default BackToTopButton;
