import React, { useState, useCallback } from "react";

const Input: React.FC<{
    type: string;
    name: string;
    id: string;
    placeholder?: string;
    defaultValue?: string;
    className?: string;
    getInputValueHandler?: Function;
}> = ({
    type,
    name,
    id,
    placeholder,
    defaultValue,
    getInputValueHandler,
    className,
}) => {
    const [value, setValue] = useState(defaultValue ?? "");

    const inputHandler = useCallback(
        (value: string) => {
            setValue(value);
            getInputValueHandler && getInputValueHandler(value);
        },
        [value]
    );

    return (
        <input
            className={className}
            type={type}
            name={name}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
                inputHandler(e.target.value);
            }}
        />
    );
};

export default Input;
