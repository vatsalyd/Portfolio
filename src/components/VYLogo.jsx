/* VY Monogram Logo — Blood Moon theme
   Thin-line geometric V+Y with crimson/silver split — inspired by Stitch design */

export default function VYLogo({ size = 32 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="VY Logo"
        >
            {/* V left arm — crimson */}
            <line
                x1="10" y1="10"
                x2="24" y2="32"
                stroke="#C3110C"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* V right arm — metallic silver */}
            <line
                x1="38" y1="10"
                x2="24" y2="32"
                stroke="#B8C0CC"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Y stem — crimson, drops from vertex */}
            <line
                x1="24" y1="32"
                x2="24" y2="42"
                stroke="#C3110C"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Node dots at terminals */}
            <circle cx="10" cy="10" r="1.8" fill="#C3110C" />
            <circle cx="38" cy="10" r="1.8" fill="#B8C0CC" />
            <circle cx="24" cy="32" r="2" fill="#E6501B" />
            <circle cx="24" cy="42" r="1.8" fill="#C3110C" />
        </svg>
    );
}
