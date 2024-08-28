import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteData, editData, fetchData } from "./api/api";
import { Link } from "react-router-dom";
import { FilePenLine, Trash } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProductModal from "./ProductModal";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [isProduct, setIsProduct] = useState(null);
  const [mode, setMode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleProductSelect = (product, mode) => {
    setIsProduct(product);
    setIsOpen(true);
    setMode(mode);
  };
  console.log(mode);

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["api"],
    queryFn: fetchData,
  });

  const editProductMutation = useMutation(editData, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("api");
      toast.success(data.message);
      queryClient.invalidateQueries(["product", isProduct._id]);
      handleCloseModal();
    },
  });

  const deleteProductMutation = useMutation(deleteData, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("api");
      toast.info(data.message);
      handleCloseModal();
    },
  });

  const handleSubmit = (Formdata) => {
    const id = isProduct._id;
    const payload = Formdata;
    if (mode === "edit") {
      editProductMutation.mutate({ id, payload });
    } else if (mode === "delete") {
      deleteProductMutation.mutate(isProduct._id);
    }
  };
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-[calc(100vh-91.5px)]">
          <CircularProgress />
        </div>
      )}
      <div className="px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-w-[900px] m-auto gap-4">
        {isError && (
          <p className="flex justify-center items-center h-[calc(100vh-91.5px)]">
            Failed to load Products
          </p>
        )}
        {data && data.length === 0 && (
          <p>
            No Products Found <Link to="/create">Create a products</Link>
          </p>
        )}
        {data &&
          data.map((prod) => (
            <div
              key={prod._id}
              className="bg-gray-300 rounded-md overflow-hidden hover:-translate-y-3 transition-transform"
            >
              <img
                src={prod.image}
                alt={prod.name}
                className="h-[200px] object-cover w-full"
              />
              <div className="p-3 mt-2">
                <h3 className="text-xl font-medium">{prod.name}</h3>
                <p className="text-lg">{prod.price}$</p>
                <div
                  className="bg-red-500 hover:bg-red-600 transition-colors p-2 inline-block rounded-md mt-3 cursor-pointer"
                  onClick={() => {
                    handleProductSelect(prod, "edit");
                  }}
                >
                  <FilePenLine />
                </div>
                <div
                  className="bg-blue-500 hover:bg-blue-600 transition-colors p-2 inline-block rounded-md mt-3 ml-4 cursor-pointer"
                  onClick={() => handleProductSelect(prod, "delete")}
                >
                  <Trash />
                </div>
              </div>
            </div>
          ))}
        <AnimatePresence>
          {isOpen && (
            <ProductModal
              onClose={handleCloseModal}
              product={isProduct}
              mode={mode}
              onSubmit={handleSubmit}
              load={
                editProductMutation.isLoading || deleteProductMutation.isLoading
              }
            />
          )}
        </AnimatePresence>
      </div>
      <ToastContainer />
    </>
  );
};
export default Home;
