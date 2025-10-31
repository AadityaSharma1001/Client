import React, { useEffect } from 'react';
import InfiniteMenu from '../components/InfiniteMenu'

const items = [
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935726/images/image0.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935728/images/image1.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935737/images/image2.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936434/images/image3.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936436/images/image4.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936436/images/image5.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936438/images/image6.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936439/images/image7.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936439/images/image8.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936441/images/image9.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935729/images/image10.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935730/images/image11.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935731/images/image12.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935731/images/image13.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935732/images/image14.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935733/images/image15.webp',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935734/images/image16.webp',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935734/images/image17.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935735/images/image18.webp',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935736/images/image19.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935738/images/image20.webp',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935740/images/image21.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935742/images/image22.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935744/images/image23.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935747/images/image24.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761935749/images/image26.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936052/images/image27.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936053/images/image28.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936260/images/image29.jpg',
    link: 'https://google.com/'
  },
  {
    image: 'https://res.cloudinary.com/dvz8vitos/image/upload/v1761936057/images/image32.jpg',
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