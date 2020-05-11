import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

const Banner = (books) => {
  const [images, setImage] = React.useState(null);

  React.useEffect(() => {
    let all = books.books;

    if (all) {
      setImage(all.slice(0, 3));

      console.log(all.slice(0, 3));
    }
  }, [books]);

  if (!images)
    return (
      <div class='progress'>
        <div class='indeterminate'></div>
      </div>
    );

  return (
    <Slider autoplay={2000} style={{}}>
      {images.map((item, index) => (
        <div key={index} style={{ background: `url('${item.book_image}') no-repeat center` }}>
          {/* <div className='book-intro'>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div> */}
        </div>
      ))}
    </Slider>
  );
};

export default Banner;
