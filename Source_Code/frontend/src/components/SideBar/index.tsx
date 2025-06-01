import SideBarLogo from "./SideBarLogo";
import NavigationList from "./NavigationList";
import { useAppSelector } from "../../hooks/useStore";
import SearchModal from "./Search";
import NotificationsModal from "./Notifications";
import CreatePost from "./CreatePost";

const SideBar = () => {
    const openedModal = useAppSelector(
        (state) => state.sideBarSlice
    ).openedModal;
    const isSmall = useAppSelector((state) => state.sideBarSlice).isSmall;
    const creatingPost = useAppSelector(
        (state) => state.sideBarSlice
    ).creatingPost;

    return (
        <>
            <div
                className={`h-full ${
                    openedModal || isSmall ? "w-72px" : "w-60"
                } flex flex-col px-3 pt-2 pb-5 border-r-0.5 border-lightDark transition-all delay-300 ease-in`}
            >
                <SideBarLogo />
                <NavigationList />
            </div>
            <SearchModal />
            <NotificationsModal />
            {creatingPost ? <CreatePost /> : null}
        </>
    );
};

export default SideBar;
