interface BrandMarkProps {
  className?: string;
  title?: string;
}

export function BrandMark({ className, title }: BrandMarkProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      className={className}
      focusable="false"
      role={title ? "img" : undefined}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <circle cx="32" cy="32" fill="none" r="29" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M32 10.5c4.4 7.1 7.5 11.8 13.7 12.8-1 6.4 1.1 11.7 6.3 16.1-5.2 3.8-7.5 8.9-6.8 14.8-6.1.7-10.1 4-13.2 9.2-3.2-5.3-7.2-8.6-13.3-9.2.8-5.9-1.6-11-6.8-14.8 5.2-4.4 7.3-9.7 6.3-16.1C24.5 22.3 27.6 17.6 32 10.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.55"
      />
      <circle cx="32" cy="32" fill="none" r="6.8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M32 3v22M61 32H39M32 61V39M3 32h22M11.5 11.5l15.6 15.6m9.8 9.8 15.6 15.6M52.5 11.5 36.9 27.1m-9.8 9.8L11.5 52.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}
