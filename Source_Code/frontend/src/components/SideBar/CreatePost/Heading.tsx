import Button from "../../UI/Button/Button";

const Heading: React.FC<{ shareHandler: Function }> = ({ shareHandler }) => {
    return (
        <div className="h-10% px-6 py-4 flex justify-between border-b border-textGray">
            <p className="font-semibold text-white ">Create new post</p>
            <Button
                content="Share"
                className="text-blue"
                onClick={shareHandler}
            />
        </div>
    );
};

export default Heading;
