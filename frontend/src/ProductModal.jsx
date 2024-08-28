import { useQuery, useQueryClient } from "react-query";
import Modal from "./config/Mode";
import { Button, CircularProgress } from "@mui/material";
import { fetchSingleData } from "./api/api";
import Form from "./Form";
import "react-toastify/dist/ReactToastify.css";

const ProductModal = ({ product, onClose, mode, onSubmit, load }) => {
  const productId = product._id;

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    enabled: mode === "edit",
    queryKey: ["product", productId],
    queryFn: () => fetchSingleData(productId),
    staleTime: 0,
  });

  //edit product

  return (
    <div>
      <Modal isId={!!productId} onClose={onClose} title="Edit Products">
        {isLoading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : isError ? (
          <p>Error while loading products</p>
        ) : mode === "edit" ? (
          <div className="flex flex-col gap-3">
            <Form
              onSubmit={onSubmit}
              buttonLabel="Edit Product"
              isLoading={load}
              initialValues={products}
            />
          </div>
        ) : (
          <>
            <h2>Are you sure you want to delete this product?</h2>
            <span
              className="font-medium text-xl text-center my-6"
              style={{ display: "block" }}
            >
              {product?.name}
            </span>
            <div className="flex justify-around">
              <Button
                variant="outlined"
                size="large"
                style={{ fontFamily: "Poppins", display: "inline-block" }}
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="large"
                style={{ fontFamily: "Poppins" }}
                onClick={() => onSubmit(productId)}
                disabled={load}
              >
                {load ? "Deleting" : "Delete"}
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
export default ProductModal;
