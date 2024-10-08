import Image from "next/image";

const avatarSizes = {
  sm: 38,
  md: 48,
  lg: 72,
  xl: 96,
};


const CustomAvatar = ({
  imageUrl,
  name,
  size,
  className,
  onClick,
}) => {
  const pixelSize = typeof size === "number" ? size : avatarSizes[size];

  return (
    <div
      className={`cursor-pointer rounded-full ${className}`}
      onClick={onClick}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default CustomAvatar;
