"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productApi } from "@/api/productApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SelectDefaultDropdown from "@/components/FormElements/SelectGroup/SelectDefaultDropdown";
import { serialize } from "object-to-formdata";
import DropzoneWrapper from "@/components/file-upload/dropZone";
import { FilledInput, InputAdornment, Typography } from "@mui/material";
import FileUploaderSingle from "@/components/file-upload/singleFileUpload";
import { PackageNavigation } from "@/types/packageNavigation";

const mySchema = z.object({
  productName: z.string().trim().min(1, { message: "Product Name is required." }),
  productDescription: z.string().trim(),
  productPrice: z.coerce
    .number()
    .min(1, { message: "Product Price is required." }).positive(),
  offerPrice: z.coerce
    .number()
    .positive(),
  productImage: z.union([z.any().refine((file) => file?.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."),z.string()]),
  productBrand: z.string(),
  productCategory: z.string(),
  productSubCategory: z.string(),
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png","image/webp"];

type TMySchema = z.infer<typeof mySchema>;

const packageData: PackageNavigation[] = [
  {
    name:'Dashboard / ',
    link:'/'
  },
  {
    name:'Products / ',
    link:'/tables/products'
  },
  {
    name:'Update ',
    link:''
  },
];

type Props = {
  getProduct: any;
  productId: string;
  brandList: [
    {
      _id: string;
      name: string;
    },
  ];
  categoryList: [
    {
      _id: string;
      name: string;
    },
  ];
  subCategoryList: [
    {
      _id: string;
      name: string;
    },
  ];
};

const ProductForm = ({
  getProduct,
  productId,
  brandList,
  categoryList,
  subCategoryList,
}: Props) => {
  const router = useRouter();

  const productCategory = getProduct.category;
  const productSubCategory = getProduct.subCategory;
  const productBrand = getProduct.brand;

console.log('1',productCategory,'2',productSubCategory,'3',productBrand)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TMySchema>({
    resolver: zodResolver(mySchema),
    defaultValues: {
      productName: getProduct.productName,
      productDescription: getProduct.productDescription,
      productPrice: getProduct.productPrice,
      offerPrice: getProduct.offerPrice,
      productImage: getProduct.productImage,
    },
  });

  const submitData = async (data: any) => {
    try {
      const formData = serialize(data);
      const response = await productApi.updateProduct(productId, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/tables/products");
        router.refresh();
        router.back();
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Breadcrumb pageName="EDIT FORM" navigation={packageData}/>

      <div className="gap-9 sm:grid-cols-2">
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-medium text-dark dark:text-white">
                  Update Product
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Product Name
                  </label>
                  <input
                    {...register("productName")}
                    type="text"
                    placeholder="Product Name"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                  {errors.productName && (
                    <p className="text-sm text-red-600">
                      {errors.productName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Product Price
                  </label>
                  <FilledInput
                    {...register("productPrice")}
                    type="number"
                    placeholder="Product Price"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke h-13 bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                  {errors.productPrice && (
                    <p className="text-sm text-red-600">
                      {errors.productPrice.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Offer Price
                  </label>
                  <input
                    {...register("offerPrice")}
                    type="number"
                    placeholder="Offer Price"
                    className="h-13 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Product Description
                  </label>
                  <textarea
                    {...register("productDescription")}
                    rows={6}
                    placeholder="Product Description"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  ></textarea>
                  {errors.productDescription && (
                    <p className="text-sm text-red-600">
                      {errors.productDescription.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <SelectDefaultDropdown
                    defaultValue={productBrand}
                    register={register("productBrand")}
                    name="Brand"
                    data={brandList}
                  />
                  <SelectDefaultDropdown
                    defaultValue={productCategory}
                    register={register("productCategory")}
                    name="Category"
                    data={categoryList}
                  />
                  <SelectDefaultDropdown
                    defaultValue={productSubCategory}
                    register={register("productSubCategory")}
                    name="Sub-Category"
                    data={subCategoryList}
                  />
                </div>
                <div>
                  <DropzoneWrapper>
                    <Typography
                      // variant="text-body-sm"
                      fontWeight={500}
                      color="textPrimary"
                      sx={{ mb: 2.5 }}
                    >
                      Product Image
                      {!!errors.productImage && (
                        <span style={{ color: "red", fontSize: "14px" ,position:'absolute',right:'65px'}}>
                          Invalid Image format {!!errors.productImage}
                        </span>
                      )}
                    </Typography>
                    <Controller
                      name="productImage"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <div>
                          <FileUploaderSingle
                            file={field.value}
                            setFile={field.onChange}
                            error={errors.productImage}
                          />
                        </div>
                      )}
                    />
                  </DropzoneWrapper>
                </div>
                <button
                  className="h-10 w-[10%] items-start rounded-lg bg-black text-white dark:bg-white dark:text-black"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
