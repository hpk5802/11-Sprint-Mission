interface IconProps {
  width?: string;
  height?: string;
}

function ToggleIcon({ width, height }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12.5' cy='6.5' r='1.5' fill='#9CA3AF' />
      <circle cx='12.5' cy='11.5' r='1.5' fill='#9CA3AF' />
      <circle cx='12.5' cy='16.5' r='1.5' fill='#9CA3AF' />
    </svg>
  );
}

export default ToggleIcon;
