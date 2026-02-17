const GearLogo = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 8l3.5 7.2a2 2 0 001.8 1.1l7.9.6-6 5.4a2 2 0 00-.6 2l1.8 7.7-6.8-4a2 2 0 00-2.2 0l-6.8 4 1.8-7.7a2 2 0 00-.6-2l-6-5.4 7.9-.6a2 2 0 001.8-1.1L32 8z"
      fill="currentColor"
      opacity="0.8"
    />
    <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="32" r="4" fill="currentColor" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <rect
        key={angle}
        x="30"
        y="6"
        width="4"
        height="8"
        rx="2"
        fill="currentColor"
        opacity="0.6"
        transform={`rotate(${angle} 32 32)`}
      />
    ))}
  </svg>
);

export default GearLogo;
