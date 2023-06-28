export function ChevronDownIcon({ direction, width, height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "24"}
      height={height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      class={`${direction === "down" ? "rotate-180" : ""} text-xl`}
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  );
}
