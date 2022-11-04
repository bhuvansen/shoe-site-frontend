import React from "react"
import BannerOne from "../../Asset/Banner/BannerOne.jpg"
import BannerTwo from "../../Asset/Banner/BannerTwo.jpg"
import "./Banner.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
// import "swiper/css/navigation";
import "swiper/css/pagination"
import { Navigation, Autoplay, Pagination } from "swiper"
// import { Pagination } from 'react-bootstrap';

const Banner = () => {
  const imgLink = [{ link: BannerOne }, { link: BannerTwo }]
  return (
    <div className="landing-banner">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        style={{ "--swiper-pagination-color": "#4e4e4e" }}
      >
        {imgLink.map((src, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={src.link} alt="" />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Banner
