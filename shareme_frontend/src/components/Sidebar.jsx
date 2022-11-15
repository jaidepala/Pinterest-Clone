import React from "react";

// Nav
import { NavLink, Link } from "react-router-dom";

// Icons
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";
import whiteLogo from "../assets/logowhite.png";

// Categories
import { categories } from "utils/data";

// Theme
import { getTheme } from "../utils/fetchUser";

const Sidebar = ({ user, closeToggle }) => {

    const inactiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black dark:text-white transition-all duration-200 ease-in-out capitalize dark:text-white';
    const activeStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize dark:text-white dark:border-white';

    const handleCloseSidebar = () => {
        if (closeToggle) {
            closeToggle(false);
        }
    };

    return (
        <div className="flex flex-col justify-between bg-white dark:bg-slate-800 dark:bg-slate-800 h-full overflow-y-scroll min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
                    onClick={handleCloseSidebar}
                >
                    <img src={getTheme() === 'dark' ? whiteLogo : logo} alt="logo" className="w-full" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
                        onClick={handleCloseSidebar}>
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl dark:text-white">Discover Categories</h3>
                    {
                        categories.slice(0, categories.length - 1).map((category) => (
                            <NavLink
                                key={`${category.name}`}
                                to={`/category/${category.name}`}
                                className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
                                onClick={handleCloseSidebar}>
                                    <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" alt={category.name} />
                                    { category.name }
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            {
                user && (

                    <Link 
                            to={`user-profile/${user.id}`}
                            className="flex my-5 mb-3 gap-2 p-2 items-center bg-white dark:bg-slate-800 rounded-lg shadow-lg mx-3 dark:shadow-neutral-600"
                            onClick={handleCloseSidebar}>
                        <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
                        <p className="dark:text-white">
                            {user.userName}
                        </p>
                        <IoIosArrowForward className="dark:text-white" />
                    </Link>
                )
            }
        </div>
    );
};

export default Sidebar;
