import { useCallback, useRef, useState } from "react";
import AddPostIcon from "../../UI/Icons/AddPostIcon";
import Button from "../../UI/Button/Button";

const PhotoVideoInput: React.FC<{ getFilesListsHandler: Function }> = ({
    getFilesListsHandler,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const clickInputHandler = useCallback(() => {
        inputRef.current?.click();
    }, [inputRef]);

    const handleDragFile = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleDropFile = useCallback((files: FileList) => {
        setIsDragging(false);
    }, []);

    return (
        <div
            className="relative h-full w-3/5 flex flex-col gap-6 items-center justify-center"
            onDragEnter={handleDragFile}
            // onDrop={handleDropFile}
        >
            <AddPostIcon />
            <p className="text-xl text-white">Drag photos and videos here</p>
            <Button
                className="relative z-40 py-2 px-3 rounded-lg font-semibold bg-blue text-white cursor-pointer"
                content="Select from your device"
                onClick={clickInputHandler}
            />
            <input
                ref={inputRef}
                type="file"
                name="file"
                id="file"
                accept="image/*|video/*"
                multiple
                className={`absolute h-full w-full left-0 right-0 opacity-0 ${
                    isDragging ? "z-30" : "-z-10"
                }`} /** input under in normal, it bubble up when user is dragging files*/
                onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                        getFilesListsHandler(files);
                        handleDropFile(files);
                    }
                }}
            />
        </div>
    );
};

export default PhotoVideoInput;
