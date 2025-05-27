import {
    faCircleChevronLeft,
    faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SwiperPaginationNavigation = () => {
    return (
        <>
            <div className="w-full">
                <div className="swiper-button-prev after:w-0 text-#efeae0">
                    <FontAwesomeIcon icon={faCircleChevronLeft} />
                </div>
                <div className="swiper-button-next after:w-0 text-#efeae0">
                    <FontAwesomeIcon icon={faCircleChevronRight} />
                </div>
            </div>
            <div className="swiper-pagination"></div>
        </>
    );
};

export default SwiperPaginationNavigation;
