const ArrowDropdownIcon = ({
  size,
  className,
  fill,
}: {
  size: number;
  className?: string;
  fill?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox='0 0 12 8'
      fill={fill ?? 'none'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10.2875 0.999987L6.40751 4.87999L2.52751 0.999989C2.13751 0.609989 1.50751 0.609989 1.11751 0.999989C0.727512 1.38999 0.727512 2.01999 1.11751 2.40999L5.70751 6.99999C6.09751 7.38999 6.72751 7.38999 7.11751 6.99999L11.7075 2.40999C12.0975 2.01999 12.0975 1.38999 11.7075 0.999987C11.3175 0.619987 10.6775 0.609987 10.2875 0.999987Z' />
    </svg>
  );
};

export default ArrowDropdownIcon;
