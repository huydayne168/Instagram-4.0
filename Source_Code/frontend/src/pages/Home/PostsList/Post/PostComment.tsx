import React, { useState, useCallback, useEffect, useRef } from "react";
import Textarea from "../../../../components/UI/Input/Textarea";
import EmojiIcon from "../../../../components/UI/Icons/EmojiIcon";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
    postComment,
    validatePostCommentData,
} from "../../../../services/commentService";
import usePrivateHttp from "../../../../hooks/usePrivateHttp";

const PostComment: React.FC<{ postId: string }> = ({ postId }) => {
    const [comment, setComment] = useState<string>("");
    const [emojis, setEmojis] = useState<string[]>([]);
    const [isEmojiVisible, setIsEmojiVisible] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement | null>(null); // Ref cho div bao quanh Picker
    const privateHttp = usePrivateHttp();

    async function postCommentHandler() {
        try {
            const postCommentData = {
                postId,
                content: comment,
            };
            const validateResult = validatePostCommentData(postCommentData);
            if (!validateResult.success) {
                console.log(validateResult.error, "error");
            } else {
                const result = await postComment(privateHttp, postCommentData);
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addEmoji = useCallback((e: any) => {
        setEmojis((pre) => [...pre, e.native]);
    }, []);

    // Hàm kiểm tra click ngoài
    const handleClickOutside = (event: any) => {
        if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(event.target)
        ) {
            setIsEmojiVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="mt-[6px] flex items-center">
            <Textarea
                name="comment"
                id="comment"
                placeholder="Add a comment"
                getTextareaValueHandler={(value: string) => {
                    setComment(value);
                }}
                addedEmojis={emojis}
                className="w-full leading-4 text-sm h-[18px] border-none bg-transparent focus:outline-none resize-none"
            />

            {comment.length > 0 && (
                <div
                    onClick={postCommentHandler}
                    className="text-blue font-semibold text-sm cursor-pointer mr-2"
                >
                    Post
                </div>
            )}
            <div className="cursor-pointer relative" ref={emojiPickerRef}>
                <div
                    className="pt-[2px]"
                    onClick={() => {
                        setIsEmojiVisible(!isEmojiVisible);
                    }}
                >
                    <EmojiIcon />
                </div>
                {isEmojiVisible && (
                    <div className="absolute -top-[328px] left-0 w-full h-full first:h-full z-20">
                        <Picker
                            data={data}
                            maxFrequentRows={0}
                            onEmojiSelect={(e: any) => {
                                addEmoji(e);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostComment;
