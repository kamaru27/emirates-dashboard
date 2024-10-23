import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SubCategoryAddForm from "@/components/Form/SubCategory-form/Add";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <SubCategoryAddForm />
    </DefaultLayout>
  );
};

export default FormElementsPage;