import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 700,
          fontStyle: 'italic',
          fontSize: '16px',
          lineHeight: 1,
        }}
      >
        fx
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  );
}
