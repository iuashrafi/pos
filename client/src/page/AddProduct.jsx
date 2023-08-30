import React, { useState, useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { PRODUCT_CATEGORIES, BACKEND_URL } from "../config";
import { UserContext } from "./../UserContext";
const AddProduct = () => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setDesc("");
    setPrice(0);
    setUploadedImages([]);
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    axios
      .post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        alert("Inside response");

        const { data: filenames } = response;
        setUploadedImages((prev) => [...prev, ...filenames]);
      })
      .catch((error) => {
        alert("Error found while uploading image");
        console.log("ERROR while uploading images, ERROR: ", error);
      });
  };
  const removePhoto = (e, filename) => {
    e.preventDefault();
    setUploadedImages([
      ...uploadedImages.filter((photo) => photo !== filename),
    ]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User is not logged in, Unable to Add product");
      return;
    }

    const formData = {
      user_id: user._id,
      owner_id: user._id,
      name,
      category,
      desc,
      price,
      images: uploadedImages,
    };

    try {
      const response = await axios.post("/products/add_product", formData);
      if (response) console.log("Response from the server: ", response);
      alert("Product added successfully");
      resetForm();
    } catch (error) {
      console.log("Error adding product:ERROR ", error);
      alert("ERROR adding product, check console for error msg");
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <section className="max-w-lg bg-blue-20 mx-auto py-16 px-2">
      <h1 className="headline-1 flex justify-center">Add Product</h1>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex flex-col">
          <label htmlFor="product_name">Name</label>
          <input
            type="text"
            id="product_name"
            className="theme-form"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="product_category">Category</label>
          <select
            id="product_category"
            className="theme-form"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {PRODUCT_CATEGORIES.map((item, index) => (
              <option key={index} value={item.type}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="product_price">Price</label>
          <input
            type="number"
            step="0.01"
            name="product_price"
            id="product_price"
            className="theme-form"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="flex flex-col">
          <label className="cursor-pointer flex items-center space-x-4  border-dashed border-2 border-gray-300 p-4 rounded-lg">
            <span className="material-symbols-rounded text-4xl text-gray-700">
              add_a_photo
            </span>
            <span className="text-lg font-semibold">Upload Images</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
          </label>
          {/* display images here */}
          {uploadedImages.length > 0 && (
            <div className="bg-gray-200 rounded-lg px-2 py-4 flex flex-wrap gap-4">
              {uploadedImages.map((filename, index) => (
                <div className="relative" key={index}>
                  <img
                    src={`${BACKEND_URL}/${filename}`}
                    className="h-36 aspect-square rounded-lg object-cover"
                  />
                  <button
                    onClick={(e) => removePhoto(e, filename)}
                    className="material-symbols-rounded absolute top-1.5 right-1.5 bg-white rounded-md p-1"
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="product_name">Description</label>
          <textarea
            className="theme-form"
            name=""
            id=""
            cols="30"
            rows="3"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn-primary">
            Add Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
