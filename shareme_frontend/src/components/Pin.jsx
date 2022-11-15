import React, { useState } from "react";

// Routes
import { Link, useNavigate } from "react-router-dom";

// uuid
import { v4 as uuidv4 } from "uuid";

// Components
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

// Client
import { client, urlFor } from "../client";

// Utils
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {

	const [postHover, setPostHover] = useState(false);
	const user = fetchUser();
	const navigate = useNavigate();

	const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user?.googleId))?.length;

	const savePin = (id) => {
		if (!alreadySaved) {

			client.patch(id)
			.setIfMissing({ save: []})
			.insert('after', 'save[-1]', [{
				_key: uuidv4(),
				userId: user?.googleId,
				postedBy: {
					_type: 'postedBy',
					_ref: user?.googleId
				}
			}])
			.commit()
			.then(() => {
				window.location.reload();
			});
		}
	};

	const deletePin = (id) => {

		client.delete(id)
		.then(() => {
			window.location.reload();
		});
	};

    return (
        <div className="m-2">
			<div className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
				onClick={() => navigate(`/pin-detail/${_id}`)}
				onMouseEnter={() => setPostHover(true)}
				onMouseLeave={() => setPostHover(false)}>
				<img
					className="rounded-lg w-full"
					alt="user-post"
					src={urlFor(image).width(250).url()}
				/>
				{
					postHover && (
						<div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
						style={{ height: '100%' }}>
							<div className="flex items-center justify-between">
								<div className="flex gap-2">
									<a 
										href={`${image?.asset?.url}?dl=`}
										download
										onClick={(e) => e.stopPropagation()}
										className="bg-white dark:bg-slate-800 w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none dark:text-white">
									
										<MdDownloadForOffline className="dark:text-white hover:scale-150 transition-all ease-in-out dark:text-white" />
									</a>
								</div>
								{
									alreadySaved ? (
										<button type="button" className="bg-red-500 opacity-70 hover:opacity-100 dark;text-white font-bold px-5 py-1 text-base rounded-3xl hover-shadow-md outline-none">
										 {save?.length}	Saved
										</button>
									) : (	
										<button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover-shadow-md outline-none"
										onClick={(e) => {
											e.stopPropagation();
											savePin(_id);
										}}>
											Save
										</button>
									)
								}
							</div>
							<div className="flex justify-between items-center gap-2 w-full">
								{
									destination && (
										<a
											href={destination}
											target="_blank"
											rel="noreferrer"
											className="bg-white dark:bg-slate-800 flex items-center gap-2 text-black dark:text-white font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md dark:text-white">
											<BsFillArrowUpRightCircleFill />
											{ destination.length > 15 ? `${destination.slice(0, 15)}...` : destination }
										</a>
									)
								}
								{
									postedBy?._id === user?.googleId && (
										<button
											type="button"className="bg-white dark:bg-slate-800 p-2 opacity-70 hover:opacity-100 font-bold  text-dark rounded-3xl hover-shadow-md outline-none dark:text-white"
											onClick={(e) => {
												e.stopPropagation();
												deletePin(_id);
											}}>
											<AiTwotoneDelete />
										</button>
									)
								}
							</div>
						</div>
					)
				}
			</div>
			<Link to={`user-profile/${postedBy?._id}`}
				className="flex gap-2 mt-2 items-center">
					<img src={postedBy?.image} alt="user-profile" className="w-8 h-8 rounded-full object-cover" />
					<p className="font-semibold capatalize dark:text-white">
						{ postedBy?.userName }
					</p>
			</Link>
        </div>
    );
};

export default Pin;
