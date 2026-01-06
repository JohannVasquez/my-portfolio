import { ImageResponse } from 'next/og';
import { publicEnv } from '@/config/env';

export const runtime = 'edge';

export const alt = 'Johann Vásquez - Software Engineer Portfolio';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #16213e 100%)',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                {/* Decorative elements */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 80%, rgba(45, 212, 191, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(94, 234, 212, 0.1) 0%, transparent 50%)',
                    }}
                />

                {/* Content container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '60px',
                        zIndex: 10,
                    }}
                >
                    {/* Avatar placeholder circle */}
                    <div
                        style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '70px',
                            background: 'linear-gradient(135deg, #2DD4BF 0%, #5EEAD4 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '30px',
                            boxShadow: '0 20px 60px rgba(45, 212, 191, 0.3)',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '56px',
                                fontWeight: 'bold',
                                color: '#0A0A0A',
                            }}
                        >
                            JV
                        </span>
                    </div>

                    {/* Name */}
                    <h1
                        style={{
                            fontSize: '64px',
                            fontWeight: 'bold',
                            color: '#EAEAEA',
                            margin: 0,
                            marginBottom: '12px',
                            textAlign: 'center',
                        }}
                    >
                        Johann Vásquez
                    </h1>

                    {/* Role */}
                    <h2
                        style={{
                            fontSize: '32px',
                            fontWeight: '500',
                            color: '#2DD4BF',
                            margin: 0,
                            marginBottom: '24px',
                        }}
                    >
                        Software Engineer
                    </h2>

                    {/* Skills */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        {['React', 'Next.js', 'Go', 'Python', 'TypeScript'].map((skill) => (
                            <span
                                key={skill}
                                style={{
                                    background: 'rgba(45, 212, 191, 0.15)',
                                    border: '1px solid rgba(45, 212, 191, 0.3)',
                                    borderRadius: '20px',
                                    padding: '8px 20px',
                                    fontSize: '18px',
                                    color: '#5EEAD4',
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* URL */}
                    <p
                        style={{
                            position: 'absolute',
                            bottom: '30px',
                            fontSize: '18px',
                            color: '#A1A1AA',
                        }}
                    >
                        {publicEnv.siteUrl.replace('https://', '').replace('http://', '')}
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
