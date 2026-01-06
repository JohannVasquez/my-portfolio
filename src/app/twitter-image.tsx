import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Johann Vásquez - Software Engineer';
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
                {/* Decorative gradient */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 80%, rgba(45, 212, 191, 0.15) 0%, transparent 50%)',
                    }}
                />

                {/* Avatar circle */}
                <div
                    style={{
                        width: '160px',
                        height: '160px',
                        borderRadius: '80px',
                        background: 'linear-gradient(135deg, #2DD4BF 0%, #5EEAD4 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '40px',
                        boxShadow: '0 20px 60px rgba(45, 212, 191, 0.4)',
                    }}
                >
                    <span
                        style={{
                            fontSize: '72px',
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
                        fontSize: '72px',
                        fontWeight: 'bold',
                        color: '#EAEAEA',
                        margin: 0,
                        marginBottom: '16px',
                    }}
                >
                    Johann Vásquez
                </h1>

                {/* Role */}
                <h2
                    style={{
                        fontSize: '36px',
                        fontWeight: '500',
                        color: '#2DD4BF',
                        margin: 0,
                    }}
                >
                    Software Engineer
                </h2>
            </div>
        ),
        {
            ...size,
        }
    );
}
