import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/20/solid";

export const ProductForm = () => {
    const [product, setProduct] = useState({
        name: "",
        categoryId: "",
        description: "",
        price: "",
        quantity: "",
        image: "",
    });
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null)
    const navigate = useNavigate();

    const localProjectUser = localStorage.getItem("project_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const handleChange = (event) => {
      if (event.target.files[0]) {
        setImage(event.target.files[0]);
      }
      const imagePreview = document.getElementById('file-upload')
      imagePreview.src = URL.createObjectURL(event.target.files[0])
    };

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const productToSendToAPI = {
            name: product.name,
            categoryId: parseInt(product.categoryId),
            storeId: 1,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            image: product.image
        }   

    const productData = fetch(`https://localhost:7069/Items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productToSendToAPI),
    })
        .then((response) => response.json())
        .then(() => {
            navigate("/");
        });
    };


    return (
        <form>
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-100/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-100 ">Photo</h2>
                <div className="col-span-full">
                  
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-100">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" 
                                 name="file-upload" 
                                 type="file" 
                                 className="sr-only"
                                 onChange={(evt) => {
                                  const copy = { ...product };
                                  copy.image = evt.target.value;
                                  handleChange(copy)
                                }} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-100">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
    
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        required
                        autoFocus
                        type="string"
                        name="name"
                        id="name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Name"
                        value={product.name}
                        onChange={(evt) => {
                            const copy = { ...product };
                            copy.name = evt.target.value;
                            setProduct(copy)
                          }}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <section className="category" key={`type--${categories.id}`}>
                      <select
                        required
                        autoFocus
                        type="string"
                        name="category"
                        id="category"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Category"
                        value={product.categoryId}
                        onChange={(evt) => {
                          const copy = { ...product };
                          copy.categoryId = evt.target.value;
                          setProduct(copy)
                        }}>
                      <option>Please Choose A Category</option>
                      <option value="1">Candle</option>
                      <option value="2">Incense</option>
                      </select>
                      </section>
                    </div>
                  </div>
                </div>

                
    
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        required
                        autoFocus
                        type="string"
                        name="quantity"
                        id="    uantity"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Quantity"
                        value={product.quantity}
                        onChange={(evt) => {
                            const copy = { ...product };
                            copy.quantity = evt.target.value;
                            setProduct(copy)
                          }}
                      />
                    </div>
                  </div>
                </div>
    
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        required
                        autoFocus
                        type="string"
                        name="description"
                        id="description"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Description"
                        value={product.description}
                        onChange={(evt) => {
                            const copy = { ...product };
                            copy.description = evt.target.value;
                            setProduct(copy)
                          }}
                      />
                    </div>
                  </div>
                </div>
    
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        required
                        autoFocus
                        type="string"
                        name="price"
                        id="price"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Price"
                        value={product.price}
                        onChange={(evt) => {
                            const copy = { ...product };
                            copy.price = evt.target.value;
                            setProduct(copy)
                          }}
                      />
                    </div>
                  </div>
                </div>
                <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm
           hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}}
        >
          Submit
        </button>
              </div>
            </div>
          </div>
        </form>
      )
    }