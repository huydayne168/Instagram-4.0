import { useCallback, useEffect, useState } from "react";
import Heading from "./Heading";
import PhotoVideoInput from "./PhotoVideoInput";
import PhotoVideoPreview from "./PhotoVideoPreview";
import readFileAsDataURL from "../../../utils/readImageFile";
import StatusInput from "./StatusInput";
import usePrivateHttp from "../../../hooks/usePrivateHttp";
import {
    createPost,
    validateCreatePostData,
} from "../../../services/postService";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { postsListActions } from "../../../lib/redux/postsListSlice";
import { sideBarActions } from "../../../lib/redux/sideBarSlice";
import { PhotoVideo } from "../../../models/PhotoVideo";

export type VideoPhotoPreview = {
    url: string;
    type: "VIDEO" | "PHOTO";
    name: string;
};

const CreatePostModal = () => {
    const privateHttp = usePrivateHttp();
    const [filesList, setFilesList] = useState<File[]>([]);
    const [photoVideoList, setphotoVideoList] = useState<PhotoVideo[]>([]);
    const [caption, setCaption] = useState<string>("");
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.authSlice.userInfo);

    const getFilesListHandler = useCallback((files: FileList) => {
        setFilesList((pre) => {
            return [...pre, ...Array.from(files)];
        });
    }, []);

    useEffect(() => {
        setphotoVideoList((pre) => []);
        filesList.forEach(async (file: File, index) => {
            const url = await readFileAsDataURL(file);
            if (typeof url === "string") {
                setphotoVideoList((pre) => {
                    const newState = [...pre];
                    newState[index] = {
                        url,
                        type:
                            file.type.split("/")[0] === "image"
                                ? "PHOTO"
                                : "VIDEO",
                    };
                    return newState;
                });
            }
        });
    }, [filesList]);

    const deleteVideoPhotoHandler = useCallback((index: number) => {
        setFilesList((pre) => {
            const newState = [...pre];
            newState.splice(index, 1);
            return newState;
        });
    }, []);

    const getCaptionHandler = useCallback((value: string) => {
        setCaption(value);
    }, []);

    // click to post
    const shareHandler = useCallback(async () => {
        console.log(photoVideoList, caption);
        const createPostData = {
            photoVideoList,
            caption,
        };
        const validationResult = validateCreatePostData(createPostData);

        if (!validationResult.success) {
            alert(validationResult.error.issues[0].message);
        } else {
            const result = await createPost(privateHttp, createPostData);
            const newPost = {
                _id: result?.data.post._id,
                caption: result?.data.post.caption,
                userId: currentUser,
                photoVideo: photoVideoList,
                likes: [],
                comments: [],
                createAt: new Date(),
            };

            if (result) {
                dispatch(postsListActions.addPost(newPost));
                dispatch(sideBarActions.openCreatePost(false));
            }
            console.log(result);
        }
    }, [photoVideoList, caption]);

    return (
        <div className="min-w-828px w-828px h-3/4 flex flex-col relative z-20 bg-lightDark rounded-lg">
            <Heading shareHandler={shareHandler} />
            <div className="h-90% w-full flex">
                {filesList.length === 0 ? (
                    <PhotoVideoInput
                        getFilesListsHandler={getFilesListHandler}
                    />
                ) : (
                    <PhotoVideoPreview
                        photoVideoList={photoVideoList}
                        getFilesListsHandler={getFilesListHandler}
                        deleteVideoPhotoHandler={deleteVideoPhotoHandler}
                    />
                )}

                <StatusInput getCaptionHandler={getCaptionHandler} />
            </div>
        </div>
    );
};

export default CreatePostModal;
