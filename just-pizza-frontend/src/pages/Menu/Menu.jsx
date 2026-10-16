import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product/product.api";
import { getAllCategories } from "../../services/category/category.api";
import { addToCart } from "../../services/cart/cart.api";
import { PiChefHatThin } from "react-icons/pi";

function Menu() {

  const token = localStorage.getItem("token");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);


  // handle add to cart
  const handleAddToCart = async (productId) => {
      if (!token) {
          alert("Please login to add products to cart.");
          return;
      }

      try {
          const res = await addToCart(token, productId, 1);

          alert(res.msg || "Product added to cart!");
      } catch (error) {
          console.error("Add to cart failed:", error);
          alert(error.message || "Failed to add product to cart.");
      }
  };


  // Get all products
  useEffect(() => {
      const getAllProductsData = async () => {
          try {
              const res = await getAllProducts();
              
              setProductData(res);
              setIsLoading(false);
          } catch (error) {
              console.error(error);
          }
      };

      getAllProductsData();
  }, [])

  // Get all categories
  useEffect(() => {
    const getAllCategoriesData = async () => {
        try {
            const res = await getAllCategories();

            setCategoryData(res);
        } catch (error) {
            console.error(error);
        }
    };

    getAllCategoriesData();
  }, []);

  const filteredProducts = selectedCategory === "all"
    ? productData
    : productData.filter((product) =>
        product.categoryIds.includes(selectedCategory)
    );



  return (

    <section>
      <header>
        <div className="container text-center mt-5">
          <PiChefHatThin size={40} style={{color: "#df2620"}} />
          <h1 className="fw-semibold">Our Menu</h1>
          <h2 className="fs-5 text-secondary">Choose from a wide range of delicious pizzas.</h2>
        </div>
      </header>

      <section>
        <div className="container-fluid px-lg-5 mt-4 mt-md-5 mb-5">
          <div className="row justify-content-center">

            <div className="col-10 col-md-2 mb-5 mb-lg-0">
              <div className="card shadow-sm border border-opacity-10 rounded-4">
                <div className="card-body d-flex flex-column">
                    <button
                        className={`btn ${selectedCategory === "all" ? "btn-danger" : ""} text-start`}
                        type="button"
                        onClick={() => setSelectedCategory("all")}
                    >
                        All Pizzas
                    </button>

                    {categoryData.map((category) => (
                        <div key={category._id}>
                            <hr className="my-2" />

                            <button
                                className={`btn ${
                                    selectedCategory === category._id ? "btn-danger" : ""
                                } w-100 text-start`}
                                type="button"
                                onClick={() => setSelectedCategory(category._id)}
                            >
                                {category.name}
                            </button>
                        </div>
                    ))}

                </div>
              </div>
            </div>

            <div className="col-12 col-md-10">
              <div className="container menu-section">
                <div className="row">
                  {
                    isLoading ? 
                      (
                        [...Array(12)].map((_, index) => (
                          <div className="col-6 col-md-3 mb-4" key={index}>
                            <div className="card shadow-sm border border-opacity-10 rounded-3" aria-hidden="true">
                              <div className="placeholder-wave">
                                  <div
                                      className="placeholder bg-secondary bg-opacity-25 rounded-top-3 w-100"
                                      style={{ height: "150px" }}
                                  ></div>
                              </div>
                              <div className="card-body">
                                <h5 className="card-title placeholder-wave">
                                  <span className="placeholder col-8 bg-secondary bg-opacity-50 rounded"></span>
                                </h5>
                                <p className="card-text placeholder-wave d-flex justify-content-between align-items-center">
                                  <span className="placeholder col-3 bg-secondary bg-opacity-50 rounded" style={{height: 10}}></span>
                                  <span className="placeholder bg-secondary bg-opacity-50 rounded-2" style={{height: 30, width: 28}}></span>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) :
                      (
                        filteredProducts.map((item) => {
                          return(
                            <div className="col-6 col-md-3 mb-4" key={item._id}>
                              <div className="card h-100 shadow-sm border border-opacity-10 rounded-3">
                                <div className="card-body d-flex flex-column justify-content-between p-0">
                                  <div className="image-container rounded-top-3">
                                    <img src={item.image} alt={item.name} loading="lazy" />
                                  </div>
                                  <div className="pizza-content d-flex justify-content-between align-items-end p-3">
                                    <div className="pizza-desc">
                                      <p className="fw-semibold mb-1">{item.name}</p>
                                      <p className="fw-semibold m-0" style={{color: "#df2620"}}>{"\u20B9"} {item.price}</p>
                                    </div>
                                    <div className="add-to-cart-button">
                                      <button
                                          className="add-to-cart-btn btn btn-sm btn-danger"
                                          type="button"
                                          onClick={() => handleAddToCart(item._id)}
                                      >
                                          {"\u002B"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      )
                  }
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

    </section>
  );
}

export default Menu;