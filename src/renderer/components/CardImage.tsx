import { useRef, useState, useEffect } from 'react';
import { Skeleton, Image as ChakraImage } from '@chakra-ui/react';
import { useIntersectionObserver } from '@react-hookz/web';
import useBizCardImage from '../hooks/useBizCardImage';

export interface CardImageProps {
  id: Id;
  alt?: string;
}

type Size  = {
  height?: number | string;
  width?: number | string;
};

const cardSize: Size = {
  height: '92px',
  width: '160px',
};

export default ({ id, alt }: CardImageProps) => {
  const ref = useRef(null);
  const loadedRef = useRef(false);
  const entry = useIntersectionObserver(ref, {
    rootMargin: '100px',
  });
  const [image, setImage] = useState<{src: string; size: Size; isPortrait?: boolean}>({src: '', size: {}});

  const fetchImage = useBizCardImage(id);

  useEffect(() => {
    if (loadedRef.current) return;
    if (entry?.isIntersecting) {
      loadedRef.current = true;
      fetchImage()
        .then((image) => {
          const img = new Image();
          img.src = image;
          img.onload = () =>  {
            const isPortrait = img.height > img.width;
            const size = isPortrait ?  {height: cardSize.width, width: cardSize.height} :  cardSize;
            setImage({ src: image, size, isPortrait });
          }
        })
        .catch((reason) => {
          if (reason?.message === 'Limit') {
            loadedRef.current = false;
          }
        });
    }
  }, [entry?.isIntersecting, fetchImage]);

  if (!image.src) {
    return (
      <Skeleton
        startColor="gray.300"
        endColor="gray.400"
        ref={ref}
        {...cardSize}
      />
    );
  }

  return (
    <ChakraImage
      src={image.src}
      alt={alt}
      border="1px"
      borderColor="gray.200"
      marginLeft={image.isPortrait ? '30px' : ''}
      marginY={image.isPortrait ? '-32px' : ''}
      style={{transform: image.isPortrait ? 'rotate(270deg)' : ''}}
      {...image.size}
    />
  );
};
