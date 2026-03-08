import { useEffect, useMemo, useState } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { initParticlesEngine } from '@tsparticles/react';

export default function ParticleBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    const options = useMemo(() => ({
        fullScreen: false,
        fpsLimit: 60,
        particles: {
            number: { value: 120, density: { enable: true, area: 1500 } },
            color: { value: ['#C3110C', '#E6501B', '#FF7A4A', '#ffffff', '#ffffff'] },
            shape: { type: 'circle' },
            opacity: {
                value: { min: 0.15, max: 0.9 },
                animation: { enable: true, speed: 0.8, minimumValue: 0.1, sync: false },
            },
            size: {
                value: { min: 0.5, max: 3 },
                animation: { enable: true, speed: 1.5, minimumValue: 0.3, sync: false },
            },
            links: {
                enable: true,
                distance: 100,
                color: '#C3110C',
                opacity: 0.04,
                width: 0.5,
            },
            move: {
                enable: true,
                speed: { min: 0.1, max: 0.6 },
                direction: 'none',
                random: true,
                straight: false,
                outModes: 'out',
            },
            twinkle: {
                particles: { enable: true, frequency: 0.03, opacity: 1, color: { value: '#C3110C' } },
            },
        },
        interactivity: {
            detectsOn: 'window',
            events: {
                onHover: { enable: true, mode: ['grab', 'bubble'] },
                onClick: { enable: true, mode: 'push' },
            },
            modes: {
                grab: { distance: 150, links: { opacity: 0.15, color: '#C3110C' } },
                bubble: { distance: 200, size: 5, duration: 2, opacity: 0.6, color: '#E6501B' },
                push: { quantity: 3 },
            },
        },
        detectRetina: true,
    }), []);

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
            }}
            options={options}
        />
    );
}
