import { Link } from "react-router-dom";
import { qualitiesSection } from "../../data/qualitiesSection";
import { menuList } from "./../../data/menuList"
import { customersReview } from "../../data/customersReview";
import { instagramSection } from "../../data/instagramSection";
import { FaStar } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import "./Home.css";

function Home() {

    return(
        <>
            <header>
                <div id="header" className="header header-container">
                    <div className="container-fluid hero-content">
                        <h1 className='text-light fw-bold'>
                            Hot <span className='header-small-text'>Pizza.</span> <br />
                            <span className='header-small-text'>Great Taste.</span> <br />
                            Delivered Fast.
                        </h1>
                        <p className='fw-semibold mb-4 text-secondary'>Delicious pizzas made with fresh ingredients and love. Order now and enjoy!</p>

                        <div className="header-btn-section">
                            <Link className="btn py-2 px-3 me-3 order-btn text-light fw-semibold" to="/menu">Order Now</Link>
                            <Link className="btn py-2 px-3 btn-outline-light" to="/menu">View Menu</Link>
                        </div>
                    </div>
                </div>
            </header>

            <section>

                <section>
                    <div className="container qualities-section my-5">
                        <div className="row">
                            {
                                qualitiesSection.map((item, index) => {
                                    return(
                                        <div className="col-3 text-center" key={index}>
                                            <div className="img-container mb-3">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <h2 className="fw-semibold fs-6 mb-1">{item.name}</h2>
                                            <p className="text-secondary">{item.subText}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container-fluid px-md-5 popular-pizzas-section my-5">
                        <h2 className="border-start border-danger border-4 fs-4 ps-2 mb-4">Popular Pizzas</h2>
                        
                        <div className="row row-cols-2 px-2 px-lg-0">
                            {
                                menuList.slice(0, 6).map((item, index) => {
                                    return(
                                        <div className="col-6 col-lg-2 mb-4 mb-md-0" key={index}>
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
                </section>

                <section>
                    <div className="container-lg-fluid my-5">
                        <div className="offer-section text-light p-4 p-md-5 mx-3 rounded-3">
                            <h2>
                                Get 20% OFF <br />
                                On Your First Order!
                            </h2>
                            <p>Use Code <span className="fw-semibold" style={{color: "#c9221d"}}> JUSTPIZZA20</span></p>
                            <Link className="order-btn btn text-light fw-semibold" to="/menu">Order Now</Link>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container-fluid px-md-5 customer-review-section my-5">
                        <h2 className="border-start border-danger border-4 fs-4 ps-2 mb-4">What Our Customers Says</h2>
                        
                        <div className="row">
                            {
                                customersReview.map((item, index) => {
                                    return(
                                        <div className="col-12 col-md-4 mb-3 mb-md-0" key={index}>
                                            <div className="card border-0 bg-secondary bg-opacity-10 shadow-sm rounded-4">
                                                <div className="card-body p-4">
                                                    <p className="w-75">{item.review}</p>
                                                    <h4 className="fs-6 fw-semibold mb-3">{item.name}</h4>
                                                    <div style={{color: "#f6ac25"}}>
                                                        {
                                                            [...Array(5)].map((_, index) => (
                                                                <FaStar key={index} />
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container-fluid px-md-5 instagram-images-section my-5">
                        <h2 className="border-start border-danger border-4 fs-4 ps-2 mb-4">Follows Us On Instagram</h2>
                        
                        <div className="row posts px-1 px-lg-2">
                            {
                                instagramSection.map((item, index) => {
                                    return(
                                        <div className="post col-6 col-md-3 px-1 mb-2 mb-md-0" key={index}>
                                            <a href="https://www.instagram.com/" target="_blank">
                                                <div className="image-container">
                                                    <img src={item.image} alt={item.name} className="rounded-3" />
                                                </div>
                                                <div className="caption mx-1 rounded-3">
                                                    <div className="instagram-icon"><IoLogoInstagram size={45} /></div>
                                                    <p className="pizza-name fs-5 m-0">{item.name}</p>
                                                </div>
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>

            </section>
        </>
    )
}

export default Home;