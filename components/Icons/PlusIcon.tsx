interface IconProps {
  width?: string;
  height?: string;
}

function PlusIcon({ width, height }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10 24H38'
        stroke='#9CA3AF'
        strokeWidth='4'
        strokeLinecap='round'
      />
      <path
        d='M24 38V10'
        stroke='#9CA3AF'
        strokeWidth='4'
        strokeLinecap='round'
      />
    </svg>
  );
}

export default PlusIcon;
