import React from 'react';

export function FreeReturnPolicy({ hit }) {
  const { image_url, link, size = 1 } = hit;

  return (
    <div style={{ gridColumn: `span ${size}` }}>
      <a href={link}>
        <img src={image_url} alt="" width="100%" />
      </a>
    </div>
  );
}
