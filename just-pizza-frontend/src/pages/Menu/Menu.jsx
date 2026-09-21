import { useState } from "react";
import { menuList } from "../../data/menuList";
import { PiChefHatThin } from "react-icons/pi";

function Menu() {

  // const [sortType, setSortType] = useState("default");

  // const sortedMenu = [...menuList].sort((a, b) => {
  //   if(sortType === "low") {
  //     return a.price - b.price;
  //   }
  //   if (sortType === "high") {
  //     return b.price - a.price;
  //   }
  //   return 0; //default order
  // });

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredMenu = selectedCategory === "all"
        ? menuList
        : menuList.filter((item) =>
            item.category.includes(selectedCategory)
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
            {/* <div className="col-12 col-md-3 mb-4 mb-lg-0">
              <div className="card py-md-4 px-md-2 shadow-sm border border-opacity-10 rounded-4">
                <div className="card-body">
                  <div className="sort-box">
                    <select onChange={(e) => setSortType(e.target.value)} className="form-select">
                      <option value="default">Sort By</option>
                      <option value="low">Price: Low to High</option>
                      <option value="high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="col-10 col-md-2 mb-5 mb-lg-0">
              <div className="card shadow-sm border border-opacity-10 rounded-4">
                <div className="card-body d-flex flex-column">
                    <button
                            className={`btn ${selectedCategory === "all" ? "btn-danger" : ""} text-start`}
                            type="button"
                            onClick={() => setSelectedCategory("all")}>
                              All Pizzas
                    </button>

                    <hr className="my-2"/>

                    <button
                        className={`btn ${selectedCategory === "veg" ? "btn-danger" : ""} text-start`}
                        type="button"
                        onClick={() => setSelectedCategory("veg")}
                    >
                        Veg Pizzas
                    </button>

                    <hr className="my-2"/>

                    <button
                        className={`btn ${selectedCategory === "nonveg" ? "btn-danger" : ""} text-start`}
                        type="button"
                        onClick={() => setSelectedCategory("nonveg")}
                    >
                        Non-Veg Pizzas
                    </button>

                    <hr className="my-2"/>

                    <button
                        className={`btn ${selectedCategory === "cheese" ? "btn-danger" : ""} text-start`}
                        type="button"
                        onClick={() => setSelectedCategory("cheese")}
                    >
                        Cheese Pizzas
                    </button>

                    <hr className="my-2" />

                    <button
                        className={`btn ${selectedCategory === "specialty" ? "btn-danger" : ""} text-start`}
                        type="button"
                        onClick={() => setSelectedCategory("specialty")}
                    >
                        Specialty
                    </button>
                    
                    <hr className="my-2" />
                    
                    <button
                        className={`btn ${selectedCategory === "popular" ? "btn-danger" : ""} text-start`}
                        type="button"
                        onClick={() => setSelectedCategory("popular")}
                    >
                        Popular
                    </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-10">
              <div className="container menu-section">
                <div className="row">
                  {
                    filteredMenu.map((item, index) => {
                      return(
                        <div className="col-6 col-md-3 mb-4" key={index}>
                          <div className="card h-100 shadow-sm border border-opacity-10 rounded-3">
                            <div className="card-body d-flex flex-column justify-content-between p-0">
                              <div className="image-container rounded-top-3">
                                <img src={item.image} alt={item.name} />
                              </div>
                              <div className="pizza-content d-flex justify-content-between align-items-end p-3">
                                <div className="pizza-desc">
                                  <p className="fw-semibold mb-1">{item.name}</p>
                                  <p className="fw-semibold m-0" style={{color: "#df2620"}}>{"\u20B9"} {item.price}</p>
                                </div>
                                <div className="add-to-cart-button">
                                  <button className="add-to-cart-btn btn btn-sm btn-danger" type="button" disabled>{"\u002B"}</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
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