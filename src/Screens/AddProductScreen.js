import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import { productCreate } from "../Redux/actions/productActions";
import { PRODUCT_CREATE_REQUEST } from "../Redux/constants/productConstants";
import { addProductSchema } from "../Utils/Validation/ValidationSchema";

const AddProductScreen = () => {
  // React hook form own state
  const {
    handleSubmit,
    register,
    // reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addProductSchema),
  });

  //  Toast notification
  const { addToast } = useToasts();

  // redux element
  const dispatch = useDispatch();
  const createProduct = useSelector((state) => state.createProduct);
  const { loading, error, success } = createProduct;

  // React hook form data submit
  const onSubmit = async (data) => {
    const { title, description, category, subCategory, price, file } = data;
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("upload_preset", "picsgalleryproduct");
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvrlnpthq/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const image = await res.json();
      if (image) {
        // DISPATCH
        dispatch(
          productCreate(title, description, category, subCategory, price, image)
        );
      } else {
        addToast("Image uploading error...", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (err) {
      addToast(err.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    // reset();
  };

  useEffect(() => {
    if (success) {
      addToast("Successfully create a new product.", {
        appearance: "success",
        autoDismiss: true,
      });
    }
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [addToast, error, success]);
  return (
    <DashboardLayout>
      <div className="addProduct">
        <div className="addProduct__title">Add Product</div>
        <div className="addProduct__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="addProduct__field">
              <span className="addProduct__label">Title</span>
              <input
                className="addProduct__input"
                type="text"
                {...register("title")}
              />
              {errors.title && (
                <span className="addProduct__">{errors.title.message}</span>
              )}
            </div>

            <div className="addProduct__field">
              <span className="addProduct__label">Description</span>
              <input
                className="addProduct__input"
                type="text"
                {...register("description")}
              />
              {errors.description && (
                <span className="addProduct__">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="addProduct__field">
              <span className="addProduct__label">Category</span>
              <select
                className="addProduct__input addProduct__select"
                {...register("category")}
              >
                <option value="">Select Category</option>
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </select>

              {errors.category && (
                <span className="addProduct__">{errors.category.message}</span>
              )}
            </div>

            <div className="addProduct__field">
              <span className="addProduct__label">Sub Category</span>
              <select
                className="addProduct__input addProduct__select"
                {...register("subCategory")}
              >
                <option value="">Select Sub Category</option>
                <option value="Mobile View">Mobile View</option>
                <option value="Marvel">Marvel</option>
                <option value="DC">DC</option>
                <option value="GOT">GOT</option>
                <option value="Nature">Nature</option>
                <option value="Vector">Vector</option>
                <option value="Art">Art</option>
                <option value="Free">Free</option>
              </select>

              {errors.subCategory && (
                <span className="addProduct__">
                  {errors.subCategory.message}
                </span>
              )}
            </div>

            <div className="addProduct__divider">
              <div className="addProduct__field">
                <span className="addProduct__label">Price</span>
                <input
                  className="addProduct__input"
                  type="number"
                  {...register("price")}
                />
                {errors.price && (
                  <span className="addProduct__">{errors.price.message}</span>
                )}
              </div>

              <div className="addProduct__field">
                <span className="addProduct__label">Image</span>
                <input
                  className="addProduct__input-file"
                  type="file"
                  {...register("file")}
                />
              </div>
            </div>

            <button type="submit" className="addProduct__button">
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color="#FFFFFF"
                  height={13}
                  width={100}
                />
              ) : (
                "Add Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProductScreen;
