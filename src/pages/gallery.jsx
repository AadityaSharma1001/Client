import React, { useEffect } from 'react';
import InfiniteMenu from '../components/InfiniteMenu'

const items = [
  {
    image: '/images/image1.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image2.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image3.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image4.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image5.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image6.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image7.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image8.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image9.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image10.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image11.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image12.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image13.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image14.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image15.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image16.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image17.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image18.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image19.jpg',
    link: 'https://google.com/'
  },
  {
    image: '/images/image20.jpg',
    link: 'https://google.com/'
  }
];

function Gallery() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    }}>
      <InfiniteMenu items={items} />
    </div>
  );
}

export default Gallery;