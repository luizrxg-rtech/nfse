'use client';

import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export default function QRCode({ value, size = 100, className = '' }: QRCodeProps) {
  return (
    <div className={className}>
      <QRCodeCanvas 
        value={value}
        size={size}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
        includeMargin={false}
      />
    </div>
  );
}