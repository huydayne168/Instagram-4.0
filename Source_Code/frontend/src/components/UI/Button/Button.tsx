import React from "react";

const Button: React.FC<{
    content: string;
    className?: string;
    onClick?: Function;
    disable?: boolean;
}> = ({ content, onClick, disable, className }) => {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                onClick && onClick();
            }}
            disabled={disable}
            className={`${className} ${disable && "opacity-70"}`}
        >
            {content}
        </button>
    );
};

export default Button;
