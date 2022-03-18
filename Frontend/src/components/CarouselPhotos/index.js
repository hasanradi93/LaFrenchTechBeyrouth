import React from 'react'
// import AwesomeSlider from 'react-awesome-slider'
// import 'react-awesome-slider/dist/styles.css'
import { Carousel } from 'react-carousel-minimal'
import { darkGray } from '../../services/colors'
const CarouselPhotos = ({ photos, width, height }) => {
    // const captionStyle = {
    //     fontSize: '2em',
    //     fontWeight: 'bold',
    //   }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }
    return (
        // <AwesomeSlider>
        //     {photos.map((photo, index) => (
        //         <div
        //             key={index}
        //             data-src={photo}
        //         />
        //     ))}
        // </AwesomeSlider>
        <Carousel
            data={photos}
            time={2000}
            width={width}
            height={height}
            radius="0px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor={darkGray}
            slideImageFit="cover"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
                textAlign: "center",
                maxWidth: "100%",
                maxHeight: "300px",
                margin: "10px auto",
            }}
        />
    )
}

export default CarouselPhotos