interface IconProps {
  width?: string;
  height?: string;
}

function BackIcon({ width, height }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.53333 3.60012C6.03627 3.60012 5.63333 4.00307 5.63333 4.50012C5.63333 4.99718 6.03627 5.40012 6.53333 5.40012V3.60012ZM6.53333 5.40012H16.6667V3.60012H6.53333V5.40012ZM21.1 9.83345V10.9001H22.9V9.83345H21.1ZM16.6667 15.3335H6.53333V17.1335H16.6667V15.3335ZM21.1 10.9001C21.1 13.3486 19.1151 15.3335 16.6667 15.3335V17.1335C20.1092 17.1335 22.9 14.3427 22.9 10.9001H21.1ZM16.6667 5.40012C19.1151 5.40012 21.1 7.38499 21.1 9.83345H22.9C22.9 6.39088 20.1092 3.60012 16.6667 3.60012V5.40012Z'
        fill='white'
      />
      <path d='M3 16.2335L10.2 12.5384L10.2 19.9285L3 16.2335Z' fill='white' />
    </svg>
  );
}

export default BackIcon;
