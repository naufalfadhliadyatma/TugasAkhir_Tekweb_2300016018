// import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Product Detail - {id}</h1>
      <p>More details about the product will go here...</p>
    </div>
  );
};

export default ProductDetail;
