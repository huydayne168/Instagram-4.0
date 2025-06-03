import React, { useEffect, useState } from "react";
import Input from "../../UI/Input/Input";
import SearchedResult from "./SearchedResult";
import { useAppSelector } from "../../../hooks/useStore";
import { getAllUsers } from "../../../services/userService";
import { User } from "../../../models/User";

const SearchModal = () => {
    const openedModal = useAppSelector(
        (state) => state.sideBarSlice
    ).openedModal;

    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
        const getSuggestedUsers = async () => {
            try {
                // Fetch suggested users
                const result = await getAllUsers();
                setResults(result?.data.users);
                setAllUsers(result?.data.users);
            } catch (error) {
                console.log(error);
            }
        };
        getSuggestedUsers();
    }, []);

    // Update results based on search input
    useEffect(() => {
        if (search.trim() === "") {
            setResults(allUsers);
        } else {
            const filteredResults = results.filter(
                (user) =>
                    (user.username &&
                        user.username
                            .toLowerCase()
                            .includes(search.toLowerCase())) ||
                    user.fullName.toLowerCase().includes(search.toLowerCase())
            );
            setResults(filteredResults);
        }
    }, [search]);

    const getSearchInputValue = (value: string) => {
        setSearch(value);
    };

    return (
        <div
            className={`${
                openedModal === "search" ? "w-96 border-r-0.5" : "w-0 border-0"
            } h-full py-2 flex flex-col bg-dark transition-all ease-in delay-300 overflow-hidden 
            rounded-3xl  border-lightDark`}
        >
            <h2 className="pt-3 pb-9 pr-4 pl-6 text-2xl text-white font-semibold">
                Search
            </h2>
            <Input
                className="mx-4 mb-6 px-4 py-2 text-base placeholder:text-textGray text-white bg-#262626 rounded-md focus:border-0"
                name="search"
                id="search"
                type="text"
                placeholder="Search"
                getInputValueHandler={getSearchInputValue}
            />
            <SearchedResult results={results} />
        </div>
    );
};

export default SearchModal;
