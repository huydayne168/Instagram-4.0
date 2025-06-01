import PostDetailModal from "../../components/PostDetailModal";
import { useAppSelector } from "../../hooks/useStore";
import PostsList from "./PostsList";
import RightSide from "./RightSide";
import StoryList from "./StoryList";

const Home = () => {
    return (
        <div className="w-[calc(100%-240px)] flex justify-center overflow-auto scrollbar-hide">
            <div className="flex flex-col items-center mr-14">
                {/* Story List */}
                <StoryList />
                {/* Posts */}
                <PostsList />
            </div>
            {/* Right Side */}
            <RightSide />
        </div>
    );
};

export default Home;
