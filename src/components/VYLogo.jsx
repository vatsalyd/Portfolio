import { useId } from 'react';

const ACTIVE_VARIANT = 'orbit-node';

function EmberCore({ frameId, glyphId, coreId }) {
    return (
        <>
            <defs>
                <linearGradient id={frameId} x1="4" y1="4" x2="60" y2="60">
                    <stop offset="0%" stopColor="#B8C0CC" />
                    <stop offset="38%" stopColor="#E6501B" />
                    <stop offset="100%" stopColor="#C3110C" />
                </linearGradient>
                <linearGradient id={glyphId} x1="14" y1="16" x2="52" y2="52">
                    <stop offset="0%" stopColor="#D4D8DE" />
                    <stop offset="50%" stopColor="#E6501B" />
                    <stop offset="100%" stopColor="#C3110C" />
                </linearGradient>
                <radialGradient id={coreId} cx="0" cy="0" r="1" gradientTransform="translate(32 32) rotate(90) scale(30)">
                    <stop offset="0%" stopColor="#C3110C" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#280905" stopOpacity="0" />
                </radialGradient>
            </defs>

            <path d="M16 4H48L60 16V48L48 60H16L4 48V16L16 4Z" fill={`url(#${coreId})`} />
            <path d="M16 4H48L60 16V48L48 60H16L4 48V16L16 4Z" stroke={`url(#${frameId})`} strokeWidth="2" opacity="0.9" />
            <path d="M13 14H51" stroke="#B8C0CC" strokeOpacity="0.45" strokeWidth="1.5" />
            <path d="M14 18L28 43L42 18" stroke={`url(#${glyphId})`} strokeWidth="4.5" strokeLinecap="square" fill="none" />
            <path d="M42 18L52 28" stroke="#E6501B" strokeWidth="4" strokeLinecap="square" fill="none" />
            <path d="M28 43V52" stroke="#B8C0CC" strokeWidth="4" strokeLinecap="square" />
            <circle cx="52" cy="28" r="2.2" fill="#C3110C" />
        </>
    );
}

function RuneCut({ frameId, glyphId, coreId }) {
    return (
        <>
            <defs>
                <linearGradient id={frameId} x1="6" y1="6" x2="58" y2="58">
                    <stop offset="0%" stopColor="#D4D8DE" />
                    <stop offset="50%" stopColor="#E6501B" />
                    <stop offset="100%" stopColor="#740A03" />
                </linearGradient>
                <linearGradient id={glyphId} x1="20" y1="12" x2="44" y2="52">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#C3110C" />
                </linearGradient>
                <radialGradient id={coreId} cx="0" cy="0" r="1" gradientTransform="translate(32 32) rotate(90) scale(28)">
                    <stop offset="0%" stopColor="#E6501B" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#280905" stopOpacity="0" />
                </radialGradient>
            </defs>

            <path d="M32 4L60 32L32 60L4 32L32 4Z" fill={`url(#${coreId})`} />
            <path d="M32 4L60 32L32 60L4 32L32 4Z" stroke={`url(#${frameId})`} strokeWidth="2.2" />
            <path d="M20 16L32 42L44 16" stroke={`url(#${glyphId})`} strokeWidth="4.6" strokeLinecap="square" fill="none" />
            <path d="M32 42V53" stroke="#B8C0CC" strokeWidth="4" strokeLinecap="square" />
            <path d="M44 16L54 26" stroke="#C3110C" strokeWidth="3.8" strokeLinecap="square" />
            <path d="M12 32H52" stroke="#E6501B" strokeOpacity="0.28" strokeWidth="1.6" />
        </>
    );
}

function OrbitNode({ frameId, glyphId, coreId }) {
    return (
        <>
            <defs>
                <linearGradient id={frameId} x1="8" y1="8" x2="56" y2="56">
                    <stop offset="0%" stopColor="#B8C0CC" />
                    <stop offset="100%" stopColor="#C3110C" />
                </linearGradient>
                <linearGradient id={glyphId} x1="14" y1="20" x2="50" y2="44">
                    <stop offset="0%" stopColor="#E6501B" />
                    <stop offset="100%" stopColor="#C3110C" />
                </linearGradient>
                <radialGradient id={coreId} cx="0" cy="0" r="1" gradientTransform="translate(32 32) rotate(90) scale(28)">
                    <stop offset="0%" stopColor="#C3110C" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#280905" stopOpacity="0" />
                </radialGradient>
            </defs>

            <circle cx="32" cy="32" r="26" fill={`url(#${coreId})`} />
            <circle cx="32" cy="32" r="25" stroke={`url(#${frameId})`} strokeWidth="2" />
            <circle cx="32" cy="32" r="18" stroke="#B8C0CC" strokeOpacity="0.28" strokeWidth="1.2" />

            <path d="M16 20L29 43L42 20" stroke={`url(#${glyphId})`} strokeWidth="4.2" strokeLinecap="square" fill="none" />
            <path d="M29 43V50" stroke="#B8C0CC" strokeWidth="3.7" strokeLinecap="square" />
            <path d="M42 20L50 28" stroke="#E6501B" strokeWidth="3.7" strokeLinecap="square" />

            <circle cx="50" cy="28" r="2.1" fill="#C3110C" />
            <circle cx="13" cy="32" r="1.8" fill="#B8C0CC" fillOpacity="0.7" />
        </>
    );
}

export default function VYLogo({ size = 32, variant = ACTIVE_VARIANT }) {
    const frameId = useId();
    const glyphId = useId();
    const coreId = useId();

    const variants = {
        'ember-core': <EmberCore frameId={frameId} glyphId={glyphId} coreId={coreId} />,
        'rune-cut': <RuneCut frameId={frameId} glyphId={glyphId} coreId={coreId} />,
        'orbit-node': <OrbitNode frameId={frameId} glyphId={glyphId} coreId={coreId} />,
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="VY Logo"
            role="img"
        >
            {variants[variant] || variants['ember-core']}
        </svg>
    );
}
