import { useRef, useState, useEffect } from 'react';
import { Skeleton, Image } from '@chakra-ui/react';
import { useIntersectionObserver } from '@react-hookz/web';
import useBizCardImage from '../hooks/useBizCardImage';

export interface CardImageProps {
  id: Id;
  alt?: string;
}

const cardSize = {
  height: '92px',
  width: '160px',
};

export default ({ id, alt }: CardImageProps) => {
  const ref = useRef(null);
  const loadedRef = useRef(false);
  const entry = useIntersectionObserver(ref, {
    rootMargin: '100px',
  });
  const [src, setSrc] = useState('');

  const fetchImage = useBizCardImage(id);

  useEffect(() => {
    if (loadedRef.current) return;
    if (entry?.isIntersecting) {
      loadedRef.current = true;
      fetchImage()
        .then((image) => setSrc(image))
        .catch((reason) => {
          if (reason?.message === 'Limit') {
            loadedRef.current = false;
          }
        });
    }
  }, [entry?.isIntersecting, fetchImage]);

  if (!src) {
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
    <Image
      src={src}
      alt={alt}
      border="1px"
      borderColor="gray.200"
      {...cardSize}
    />
  );
};
