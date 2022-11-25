import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContextProvider';

const AddProduct = () => {

    const {user} = useContext(AuthContext);
    console.log(user)

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const handleAddProduct = formdata => {
        console.log({formdata})

    }

    return (
        <div className='flex justify-center'>
            <form onSubmit={handleSubmit(handleAddProduct)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                {/* first row */}
                <div className="-mx-3 md:flex mb-2">
                    {/* category */}
                    <div className="max-w-xs w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-state">
                            Select Category
                        </label>
                        <div className="relative">
                            <select 
                                {...register("category", {
                                    required: "category is required to add product",
                                })}
                                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" 
                                id="grid-state"
                            >
                                <option value='bed_room'>Bed room</option>
                                <option value='drawing_room'>Drawing room</option>
                                <option value='kids_room'>Kid's room</option>
                                <option value='dining_kitchen'>Dining & Kitchen</option>
                                <option value='others'>Others</option>
                                
                            </select>
                            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    {/* condition  */}
                    <div className="max-w-xs w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-state">
                            Condition
                        </label>
                        <div className="relative">
                            <select 
                                {...register("condition", {
                                    required: "condition is required to add product",
                                })}
                                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" 
                                id="grid-state"
                            >
                                <option value='Excellent'>Excellent</option>
                                <option value='Good'>Good</option>
                                <option value='Fair'>Fair</option>
                            </select>
                            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* used for */}
                    <div className="max-w-xs w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-zip">
                            Used for
                        </label>
                        <input 
                            {...register("used", {
                                required: "required to add product",
                            })}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="grid-zip" type="text" placeholder="ex : 2 months / 1 year"
                            required
                        />
                    </div>
                </div>

                {/*  second row */}
                <div className="-mx-3 md:flex mb-6">
                    <div className="max-w-xs w-full px-3 mb-6 md:mb-0 mt-2">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Product Name
                        </label>
                        <input 
                            {...register("product_name", {
                                required: "product name is required to add product",
                            })}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="grid-first-name" type="text" placeholder="ex : Sofa" 
                            required
                        />
                    </div>
                    <div className="max-w-lg w-full px-3 mt-2">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Description
                        </label>
                        <input 
                            {...register("desc", {
                                required: "description is required to register",
                            })}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="grid-last-name" type="text" placeholder="Describe your product here"
                        />
                    </div>
                </div>

                {/* third row */}
                <div className="-mx-3 md:flex mb-6">
                    <div className="max-w-sm w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-zip">
                            Buying Price
                        </label>
                        <input 
                            {...register("price_buy", {
                                required: "buying price is required to register",
                            })}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="grid-zip" type="number" placeholder="ex : 5000" 
                            required
                        />
                    </div>
                    <div className="max-w-sm w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-zip">
                            Sales Price
                        </label>
                        <input 
                            {...register("price_sale", {
                                required: "price is required to add product",
                            })}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="grid-zip" type="number" placeholder="ex : 3000"
                            required
                        />
                    </div>
                </div>

                {/*  row 4 */}
                <div className="-mx-3 md:flex mb-6">
                    <div className="max-w-lg w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                            Upload Image
                        </label>
                        <input 
                            {...register("image", {
                                required: "image is required to add product",
                            })}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" 
                            id="grid-password" type="file" placeholder="upload product image"
                            required
                        />
                    </div>
                </div>

                {/* fifth row */}
                <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-zip">
                            Seller
                        </label>
                        <input 
                            {...register("seller_name")}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="grid-zip" type="text" value={user?.displayName}
                            readOnly
                            />
                    </div>

                    <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-zip">
                            Location
                        </label>
                        <input 
                            {...register("location", {
                            required: "location is required to add a product",
                            })} 
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="grid-zip" type="text" placeholder="ex : Dhaka"
                            required
                            />
                    </div>
                    
                    <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-zip">
                            Phone No
                        </label>
                        <input 
                            {...register("seller_phone", {
                                required: "Phone no is must to add a product",
                            })}
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="grid-zip" type="number" placeholder="01XXXXXXXXX"
                            required
                        />
                    </div>
                </div>

                <div className="-mx-3 flex mt-4 justify-center gap-4">
                    <input type="submit" className='btn btn-outline w-full max-w-sm' />
                    <input type="reset" className='btn btn-outline w-full max-w-sm' />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;