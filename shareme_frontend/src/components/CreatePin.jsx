import React, { useState } from "react";

// Icons
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

// Route
import { useNavigate } from "react-router-dom";

// Client
import { client } from "../client";

// Components
import Spinner from "./Spinner";

// Utils
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {
    const [title, setTitle] = useState("");
    const [about, setAbout] = useState("");
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState(false);
    const [category, setCategory] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [wrongImageType, setWrongImageType] = useState(false);

    const navigate = useNavigate();

	const uploadImage = (e) => {
		const { type, name } = e.target.files[0];

		if (type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
			setWrongImageType(false);
			setLoading(true);

			client.assets.upload('image', e.target.files[0], {
				contentType: type,
				filename: name
			})
			.then((document) => {

				setImageAsset(document);
				setLoading(false);
			})
			.catch((err) => {
				console.log("Image upload Error", err)
			});
		} else {
			setWrongImageType(true);
		}
	};

	const savePin = () => {
		if (title && about && destination && imageAsset?._id && category) {
			const doc = {
				_type: 'pin',
				title,
				about,
				destination,
				image: {
					_type: 'image',
					asset: {
						_type: 'reference',
						_ref: imageAsset?._id
					},
				},
				userId: user._id,
				postedBy: {
					_type: 'postedBy',
					_ref: user._id,
				},
				category,
			};
			client.create(doc)
			.then(() => {
				navigate('/')
			})
		} else {
			setFields(true);
			setTimeout(() => setFields(false), 2000);
		}
	}

    return (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
            {fields && (
                <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
                    Please fill in all the fields
                </p>
            )}
            <div className="flex lg:flex-row flex-col justify-center items-center bg-white dark:bg-slate-800 lg:p-5 p-3 lg:w-4/5 w-full">
                <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
					<div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
						{
							loading && (
								<Spinner />
							)
						}
						{
							wrongImageType && (
								<p className="">
									Wrong Image Type!
								</p>
							)
						}
						{
							!imageAsset ? (
								<label>
									<div className="flex flex-col items-center justify-center h-full">
										<div className="flex flex-col justify-center items-center">
											<p className="font-bold text-2xl">
												<AiOutlineCloudUpload 
												/>
											</p>
											<p className="text-lg ">
												Click to upload
											</p>
										</div>
										<div className="mt-32 text-gray-400 ">
											Use high-quality JPG, SVG, PNG, GIF or TIFF less than 20 MB
										</div>
									</div>
									<input
										type="file"
										name="upload-image"
										className="w-0 h-0"
										onChange={uploadImage}
									/>
								</label>
							) : (
								<div className="relative h-full">
									<img
										src={imageAsset?.url}
										alt="uploaded pic"
										className="h-full w-full"
									/>
									<button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-white dark:bg-slate-800 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out" onClick={() => setImageAsset(null)}>
										<MdDelete />
									</button>
								</div>
							)
						}
					</div>
				</div>

				<div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Add your title here"
						className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 dark:bg-slate-800"
					/>
					{
						user && (
							<div className="flex gap-2 my-2 items-center bg-white dark:bg-slate-800 rounded-lg">
								<img
									src={user?.image}
									className="w-10 h-10 rounded-full"
									alt="user-profile"
								/>
								<p className="font-bold dark:text-white">
									{ user?.userName }
								</p>
							</div>
						)
					}
					<input
						type="text"
						value={about}
						onChange={(e) => setAbout(e.target.value)}
						placeholder="What is your pen about?"
						className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 dark:bg-slate-800"
					/>
					<input
						type="text"
						value={destination}
						onChange={(e) => setDestination(e.target.value)}
						placeholder="Add a destination link"
						className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 dark:bg-slate-800"
					/>
					<div className="flex flex-col">
						<div>
							<p className="mb-2 font-semi-bold text-lg sm:text-xl">
								Choose Pin Category
							</p>
							<select
								className="outline-none w-4/5 text-base border-b-2 border-gray-200 rounded-lg cursor-pointer dark:bg-slate-800"
								onChange={(e) => setCategory(e.target.value)}>
								<option value="other" className="bg-white dark:bg-slate-800">
									Select Category
								</option>
								{
									categories.map((category) => (
										<option 
												className="text-base border-0 outline-none capitalize bg-white dark:bg-slate-800 text-black dark:text-white"
												key={category.name} value={category.name}>
											{ category.name }
										</option>
									))
								}
							</select>
						</div>
						<div className="flex justify-end items-end mt-5">
							<button type="button" onClick={savePin} className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none">
								Save Pin
							</button>
						</div>
					</div>
				</div>
            </div>
        </div>
    );
};
export default CreatePin;
