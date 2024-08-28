import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const Form = ({ onSubmit, initialValues, buttonLabel, isLoading }) => {
  const [productValue, setProductValue] = useState({
    name: initialValues?.name || "",
    price: initialValues?.price || "",
    image: initialValues?.image || "",
  });

  const handleProductValue = (e) => {
    setProductValue({ ...productValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(productValue);
  };
  return (
    <>
      <TextField
        value={productValue.name}
        label="Name"
        name="name"
        onChange={handleProductValue}
        sx={{
          "&& .MuiInputBase-input": {
            fontFamily: "Poppins, Arial, sans-serif",
          },
        }}
      />
      <TextField
        value={productValue.price}
        label="Price"
        name="price"
        onChange={handleProductValue}
        sx={{
          "&& .MuiInputBase-input": {
            fontFamily: "Poppins, Arial, sans-serif",
          },
        }}
      />
      <TextField
        value={productValue.image}
        label="Image"
        name="image"
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
        onClick={handleSubmit}
        disabled={isLoading}
        className=""
      >
        <span>{isLoading ? "Loading" : buttonLabel}</span>
        {isLoading && <LoaderCircle className="animate-spin ml-3" />}
      </Button>
    </>
  );
};
export default Form;
