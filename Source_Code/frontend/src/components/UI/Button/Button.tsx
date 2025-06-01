import React from "react";

const Button: React.FC<{
    content: string;
    className?: string;
    onClick?: Function;
    disable?: boolean;
    icon?: React.ReactNode;
}> = ({ content, onClick, disable, className, icon }) => {
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
            {icon && <span className="ml-2">{icon}</span>}
        </button>
    );
};

export default Button;
