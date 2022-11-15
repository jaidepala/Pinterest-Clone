import React, { useState, useEffect } from "react";

// Icons
import { AiOutlineLogout } from "react-icons/ai";

// Routes
import { useParams, useNavigate } from "react-router-dom";

// Google
import { GoogleLogout } from "react-google-login";
import { client } from "client";

// Query
import {
    userCreatedPinsQuery,
    userQuery,
    userSavedPinsQuery,
} from "../utils/data";

// Components
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

// Theme
import { getTheme } from "utils/fetchUser";

const randomImage = "https://source.unsplash.com/1600x900/?nature,photography,techonology"; 
const activeBtnStyled = 'bg-red-500 text-white font-bold p-2 rounded-full width-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-black dark:text-white font-bold p-2 rounded-full width-20 outline-none'

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [pins, setPins] = useState(null);
    const [text, setText] = useState("Created"); // Created or Saved
    const [activeBtn, setActiveBtn] = useState("created");
	const [theme, setTheme] = useState(getTheme());

    const navigate = useNavigate();

    const { userId } = useParams();

    useEffect(() => {
        const query = userQuery(userId);

        client.fetch(query).then((data) => {
            setUser(data[0]);
        });
    }, [userId]);

	useEffect(() => {

		if (text === 'Created') {
			const createdPinsQuery = userCreatedPinsQuery(userId)

			client.fetch(createdPinsQuery)
			.then((data) => {
				setPins(data);
			});

		} else {
			const savedPinsQUery = userSavedPinsQuery(userId)

			client.fetch(savedPinsQUery)
			.then((data) => {
				setPins(data);
			});
		}

	}, [text, userId]);

	useEffect(() => {

	}, []);

	const logout = () => {
		localStorage.clear();
		navigate('/');
	};

	const changeTheme = (isChecked) => {
		const className = 'dark';
		if (isChecked) {
			document.documentElement.classList.add(className);
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove(className);
			localStorage.removeItem('theme');
		}
	}

    if (!user) {
        return <Spinner message="loading profile" />;
    }

    return (
        <div className="relative pb-2 h-full justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col justify-center items-center">
                        <img
                            src={randomImage}
                            className="w-full h-370 xl:h-510 shadow-lg object-cover"
                            alt="banner-pic"
                        />
                        <img
                            className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                            src={user.image}
                            alt="user-pic"
                        />
                        <h1 className="font-bold text-3xl text-center mt-3 dark:text-white">
                            {user.userName}
                        </h1>
						<div className="absolute top-0 z-1 right-0 p-2">
							<label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
							<input type="checkbox" defaultChecked={theme === 'dark'} id="default-toggle" className="sr-only peer" onChange={(e) => changeTheme(e.target.checked)} />
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black-300 dark:peer-focus:ring-black-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black-600"></div>
							<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
						</label>
							{
								userId === user._id && (
									<GoogleLogout
										clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
										render={(renderProps) => (
											<button
												type="button"
												className="bg-white dark:bg-slate-800 p-2 rounded-full cursor-pointer outline-none shadow-md">
												<AiOutlineLogout color="red" fontSize={21} />
											</button>
										)}
										onLogoutSuccess={logout}
										cookiePolicy='single_host_origin'
									/>
								)
							}
						</div>
                    </div>
					<div className="text-center mb-7">
							<button type="button"
								onClick={(e) => {
									setText(e.target.textContent)
									setActiveBtn('created')
								}}
								className={`${activeBtn === 'created' ? activeBtnStyled : notActiveBtnStyles }`}>
								Created
							</button>
							<button type="button"
								onClick={(e) => {
									setText(e.target.textContent)
									setActiveBtn('saved')
								}}
								className={`${activeBtn === 'saved' ? activeBtnStyled : notActiveBtnStyles }`}>
								Saved
							</button>
					</div>
					{
						pins?.length ? (
							<div className="px-2 ">
									<MasonryLayout
										pins={pins}
									/>
							</div>
						) : (
							<div className="flex justify-center font-bold items-center w-full text-xl mt-2">
								No Pins Found!
							</div>
						)
					}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
