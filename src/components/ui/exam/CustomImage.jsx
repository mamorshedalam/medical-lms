import Image from "next/image";
import React, { useState } from "react";

const CustomImage = ({ src, alt, className }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        height={400}
        width={400}
        className={isFullscreen ? "fullscreen" : ""}
        onClick={toggleFullscreen}
      />
    </div>
  );
};

export default CustomImage;
