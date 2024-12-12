import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGetQuery } from "../../../hooks/useApiRequest";
import { IPromo, PromoItem } from "../../../types/IPromo";

const PromoCard = () => {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 4,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };

  const { data, loading } = useGetQuery<IPromo>("/banner", {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  return (
    <div className="text-header-2 space-y-4">
      <h1>Temukan promo menarik</h1>

      {loading ? (
        <div className="flex h-24">
          <div className="mr-4 bg-gray-200 h-30 w-60 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-60 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-60 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-60 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-60 rounded-xl animate-pulse"></div>
        </div>
      ) : (
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          autoPlaySpeed={1000}
          centerMode={false}
          draggable
          focusOnSelect={false}
          infinite
          keyBoardControl
          minimumTouchDrag={80}
          partialVisible
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          slidesToSlide={1}
          swipeable
        >
          {data?.data.map((item: PromoItem) => (
            <div className="mr-4">
              <div className="bg-transparent relative">
                <div className="absolute w-full h-full"></div>
                <img src={item.banner_image} alt="Promo 1" />
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};
export default PromoCard;
