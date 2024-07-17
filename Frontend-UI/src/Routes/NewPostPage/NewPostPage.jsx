import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import UploadWidget from "../../Components/UploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handler for ReactQuill onChange event
  const handleQuillChange = (content) => {
    setValue(content); // Update state with the new content
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/post/",
        {
          postData: {
            title: formData.get("title"),
            price: parseInt(formData.get("price")),
            address: formData.get("address"),
            city: formData.get("city"),
            bedroom: parseInt(formData.get("bedroom")),
            bathroom: parseInt(formData.get("bathroom")),
            type: formData.get("type"),
            property: formData.get("property"),
            latitude: formData.get("latitude"),
            longitude: formData.get("longitude"),
            images: images, // Use the state directly
          },
          postDetail: {
            desc: value, // Use ReactQuill's content as desc
            utilities: formData.get("utilities"),
            pet: formData.get("pet"),
            income: formData.get("income"),
            size: parseInt(formData.get("size")),
            school: parseInt(formData.get("school")),
            bus: parseInt(formData.get("bus")),
            restaurant: parseInt(formData.get("restaurant")),
          },
        },
        {
          withCredentials: true,
        }
      );
      navigate("/" + res.data.newPost.userId); // Navigate to the newly created post
    } catch (error) {
      console.error("Error submitting post:", error);
      setError("Failed to submit post");
    }
  };

  return (
    <div className="w-full h-full container mx-auto px-4 py-8 overflow-y-auto">
      {/* Title, Price, Address */}
      <form className="w-full h-full" onSubmit={handleSubmit}>
        <div className="flex mb-4 gap-5">
          <TextInput id="title" name="title" placeholder="Title" width="1/5" />
          <TextInput id="price" name="price" placeholder="Price" width="1/5" />
          <TextInput
            id="address"
            name="address"
            placeholder="Address"
            width="3/5"
          />
        </div>

        {/* ReactQuill for Description */}
        <div className="mb-20">
          <ReactQuill
            value={value}
            onChange={handleQuillChange}
            placeholder="Write Detail Information About The Property"
            className="rounded-md"
            style={{ height: "300px", width: "100%" }}
          />
        </div>

        {/* City, Bedroom, Bathroom, Longitude, Latitude */}
        <div className="flex mb-4 gap-5">
          <TextInput id="city" name="city" placeholder="City" width="1/5" />
          <TextInput
            id="bedroom"
            name="bedroom"
            placeholder="Bedroom"
            width="1/5"
          />
          <TextInput
            id="bathroom"
            name="bathroom"
            placeholder="Bathroom"
            width="1/5"
          />
          <TextInput
            id="longitude"
            name="longitude"
            placeholder="Longitude"
            width="1/5"
          />
          <TextInput
            id="latitude"
            name="latitude"
            placeholder="Latitude"
            width="1/5"
          />
        </div>

        {/* Type and Property */}
        <div className="flex mb-4 gap-5">
          <SelectInput
            id="type"
            name="type"
            placeholder="Type"
            options={["buy", "rent"]}
            width="1/5"
          />
          <SelectInput
            id="property"
            name="property"
            placeholder="Property"
            options={["apartment", "house", "condo", "land"]}
            width="1/5"
          />
        </div>

        {/* Utilities, Pet, Income */}
        <div className="flex mb-4 gap-5">
          <TextInput
            id="utilities"
            name="utilities"
            placeholder="Utilities"
            width="1/5"
          />
          <TextInput id="pet" name="pet" placeholder="Pet" width="1/5" />
          <TextInput
            id="income"
            name="income"
            placeholder="Income"
            width="1/5"
          />
        </div>

        {/* Size, School, Bus, Restaurant */}
        <div className="flex gap-5 mb-5">
          <TextInput id="size" name="size" placeholder="Size" width="1/5" />
          <TextInput
            id="school"
            name="school"
            placeholder="School"
            width="1/5"
          />
          <TextInput id="bus" name="bus" placeholder="Bus" width="1/5" />
          <TextInput
            id="restaurant"
            name="restaurant"
            placeholder="Restaurant"
            width="1/5"
          />
        </div>

        {error && <span>{error}</span>}
        <div className="w-full h-[200px] mb-5 px-2 py-1 rounded-md text-white font-semibold">
          <UploadWidget
            uwConfig={{
              multiple: true,
              cloudName: "Varun",
              uploadPreset: "estate",
              maxImageFileSize: 2000000,
              folder: "posts",
            }}
            setState={setImages}
          />
        </div>

        <button
          type="submit"
          className="mb-20 bg-blue-400 px-2 py-1 rounded-md text-white font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// Reusable component for text input
const TextInput = ({ id, name, placeholder, width }) => (
  <input
    id={id}
    name={name}
    className={`w-${width} h-10 rounded-md border px-2 text-black border-black`}
    type="text"
    placeholder={placeholder}
  />
);

// Reusable component for select input
const SelectInput = ({ id, name, placeholder, options, width }) => (
  <select
    id={id}
    name={name}
    className={`w-${width} h-10 rounded-md border px-2 text-black border-black`}
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option} value={option.toLowerCase()}>
        {option}
      </option>
    ))}
  </select>
);

export default NewPostPage;
