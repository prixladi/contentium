import React, { FC } from 'react';
import Image from 'next/image';

const MoonImage: FC = () => (
  <div className="h-12 w-12">
    <Image src="/assets/moon.svg" alt="moon" width="140" height="140" />
  </div>
);

export default MoonImage;
