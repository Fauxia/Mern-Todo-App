import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { postData } from "./api/api";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const [productValue, setProductValue] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleProductValue = (e) => {
    setProductValue({ ...productValue, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleAddProduct = () => {
    console.log(productValue);
    mutate(productValue);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-slate-100 p-5">
        <div className="flex flex-col w-[350px] gap-4">
          <TextField
            label="Name"
            name="name"
            value={productValue.name}
            onChange={handleProductValue}
            sx={{
              "&& .MuiInputBase-input": {
                fontFamily: "Poppins, Arial, sans-serif",
                "::placeholder": "Poppins",
              },
            }}
          />
          <TextField
            label="Price"
            name="price"
            value={productValue.price}
            onChange={handleProductValue}
            sx={{
              "&& .MuiInputBase-input": {
                fontFamily: "Poppins, Arial, sans-serif",
              },
            }}
          />
          <TextField
            label="Image"
            name="image"
            value={productValue.image}
            onChange={handleProductValue}
            sx={{
              "&& .MuiInputBase-input": {
                fontFamily: "Poppins, Arial, sans-serif",
              },
            }}
          />
          <Button
            variant="contained"
            style={{ fontFamily: "Poppins" }}
            onClick={handleAddProduct}
            disabled={isLoading}
          >
            {isLoading ? "Submitting" : "Add Product"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Create;
