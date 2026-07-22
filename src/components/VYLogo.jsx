/* VY Monogram Logo — Obsidian Aurora theme
   Thin-line geometric V+Y with violet/cyan split */

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
            {/* V left arm — aurora violet */}
            <line
                x1="10" y1="10"
                x2="24" y2="32"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* V right arm — arctic cyan */}
            <line
                x1="38" y1="10"
                x2="24" y2="32"
                stroke="#06B6D4"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Y stem — aurora violet, drops from vertex */}
            <line
                x1="24" y1="32"
                x2="24" y2="42"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Node dots at terminals */}
            <circle cx="10" cy="10" r="2" fill="#8B5CF6" />
            <circle cx="38" cy="10" r="2" fill="#06B6D4" />
            <circle cx="24" cy="32" r="2.2" fill="#10B981" />
            <circle cx="24" cy="42" r="2" fill="#8B5CF6" />
        </svg>
    );
}
