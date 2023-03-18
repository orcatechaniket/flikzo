import React from "react";

const ProductDetail = ({ product }) => {
  return (
    <div>
      <div className="container single-product-container m-2">
        <div className="row">
          <div className="col-4 single-product-image">
            <div className="row main">
              {product?.images ? (
                <>
                  <img src={`https://www.flikzo.in/${product?.images[0]}`} />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="row">
              {product?.images ? (
                <>
                  {product.images.map((data) => (
                    <div className="col-4">
                      <img
                        style={{ width: "100%" }}
                        src={`https://www.flikzo.in/${data}`}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="col-6">
            <div class=" p-4">
              <div class="mt-4 mb-3">
                {" "}
                <span class="text-uppercase text-muted brand">
                  {product?.subcategory?.name}
                </span>
                <h5 class="text-uppercase">{product?.name}</h5>
              </div>
              <p class="about">{product?.description}</p>
              <p>Vendor Name : {product?.vendor?.name}</p>
              <p>Vendor Shop : {product?.vendor?.storeName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
