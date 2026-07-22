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
            number: { value: 70, density: { enable: true, area: 1400 } },
            color: { value: ['#8B5CF6', '#06B6D4', '#F59E0B', '#ffffff'] },
            shape: { type: 'circle' },
            opacity: {
                value: { min: 0.1, max: 0.6 },
                animation: { enable: true, speed: 0.5, minimumValue: 0.1, sync: false },
            },
            size: {
                value: { min: 0.5, max: 2.5 },
                animation: { enable: true, speed: 1, minimumValue: 0.3, sync: false },
            },
            links: {
                enable: true,
                distance: 120,
                color: '#8B5CF6',
                opacity: 0.03,
                width: 0.5,
            },
            move: {
                enable: true,
                speed: { min: 0.1, max: 0.4 },
                direction: 'none',
                random: true,
                straight: false,
                outModes: 'out',
            },
            twinkle: {
                particles: { enable: true, frequency: 0.02, opacity: 0.8, color: { value: '#06B6D4' } },
            },
        },
        interactivity: {
            detectsOn: 'window',
            events: {
                onHover: { enable: true, mode: ['grab'] },
                onClick: { enable: false },
            },
            modes: {
                grab: { distance: 140, links: { opacity: 0.1, color: '#8B5CF6' } },
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
