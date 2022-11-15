import React from "react";

// Router
import { Link, useNavigate } from "react-router-dom";

// Icons
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-3 pt-3 pl-2 pr-2">
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white dark:bg-slate-800 border-none outline-none focus-within:shadow-small inline-block align-top">
                <IoMdSearch
                    fontSize={21}
                    className="ml-1 dark:text-white"
                />
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    value={searchTerm}
                    className="p-2 w-full bg-white dark:bg-slate-800 outline-none dark:text-white"
                    onFocus={() => navigate('/search')}
                />
            </div>
            <div className="flex gap-3">
                <Link to={`user-profile/${user?._id}`} className="hidden md:block">
                    <img src={user.image} alt="user" className="w-14 h-12 rounded-lg" />
                </Link>
                <Link to='create-pin' className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                    <IoMdAdd />
                </Link>
            </div>
        </div>
    );
};
export default Navbar;
