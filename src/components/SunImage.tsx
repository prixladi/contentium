import React, { FC } from 'react';
import Image from 'next/image';

const SunImage: FC = () => (
  <div className="h-12 w-12">
    <Image src="/assets/sun.svg" alt="sub" width="140" height="140" />
  </div>
);

export default SunImage;
