import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#0F1115',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2DD4BF',
          fontWeight: 700,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          borderRadius: '50%',
        }}
      >
        JV
      </div>
    ),
    {
      ...size,
    }
  );
}
