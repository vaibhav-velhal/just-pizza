import { PiChefHatThin } from "react-icons/pi";
import designImage from "./../../assets/about-page-images/about-page-design.png";
import { GoGoal } from "react-icons/go";
import { TbDeviceVisionPro } from "react-icons/tb";
import quality from "./../../assets/about-page-images/quality.png"
import { FaRegHeart } from "react-icons/fa6";
import { aboutContentOne } from "../../data/aboutContentOne";
import { aboutContentTwo } from "../../data/aboutContentTwo";
import "./About.css";

function About() {
  return (
    <section>
      <header>
        <div className="about-page-header">
          <div className="header-content">
            <div className="heading text-center">
              <PiChefHatThin size={40} style={{ color: "#df2620" }} />
              <h1 className="fw-semibold m-0">About Us</h1>
              <div className="image-container mb-2">
                <img src={designImage} loading="lazy" alt="Design Image" style={{width: 200}} />
              </div>
            </div>
            <h2 className="fs-5 text-secondary mb-3">
              At JustPizza, we believe in serving more than just pizza. We serve
              happiness!
            </h2>
            <h3 className="fs-5 text-secondary">
              Every pizza is made with the freshest ingredients, authentic
              recipes and a lot of love. Our mission is to deliver the best
              pizza experience to your door.
            </h3>
          </div>
        </div>
      </header>

      <section>
        <div className="container my-5">
          <div className="row px-3 px-md-0 about-content">
            
            <div className="col-12 col-lg-6 mb-4">
              <div className="card bg-light bg-opacity-50 shadow-sm rounded-4">
                <div className="card-body d-flex align-items-center justify-content-between p-4 p-md-5">
                  <div className="content">
                    <div className="card-title">
                      <h3 className="fw-semibold fs-4">Our Mission</h3>
                    </div>
                    <p className="text-secondary m-0 w-75">To deliver delicious, high-qulity pizza and excelient service.</p>
                  </div>
                  <div className="icon-container">
                    <GoGoal className="icon" size={45} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 mb-4">
              <div className="card bg-light bg-opacity-50 shadow-sm rounded-4">
                <div className="card-body d-flex align-items-center justify-content-between p-4 p-md-5">
                  <div className="content">
                    <div className="card-title">
                      <h3 className="fw-semibold fs-4">Our Vision</h3>
                    </div>
                    <p className="text-secondary m-0 w-75">To be the most loved pizza brand in the world.</p>
                  </div>
                  <div className="icon-container">
                    <TbDeviceVisionPro className="icon" size={45} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 mb-4">
              <div className="card bg-light bg-opacity-50 shadow-sm rounded-4">
                <div className="card-body d-flex align-items-center justify-content-between p-4 p-md-5">
                  <div className="content">
                    <div className="card-title">
                      <h3 className="fw-semibold fs-4">Quality Ingredients</h3>
                    </div>
                    <p className="text-secondary m-0 w-75">We use 100% fresh and premimum ingredients.</p>
                  </div>
                  <div className="icon-container">
                    <div className="image-container">
                      <img src={quality} alt="Quality Image" loading="lazy" className="quality-image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 mb-4">
              <div className="card bg-light bg-opacity-50 shadow-sm rounded-4">
                <div className="card-body d-flex align-items-center justify-content-between p-4 p-md-5">
                  <div className="content">
                    <div className="card-title">
                      <h3 className="fw-semibold fs-4">Made With Love</h3>
                    </div>
                    <p className="text-secondary m-0 w-75">Easy pizza is crafted with passion and care.</p>
                  </div>
                  <div className="icon-container">
                    <FaRegHeart className="icon" size={45} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid px-md-3 my-5">
          <div className="why-choose-us-section px-2 py-4 p-md-5 text-light rounded-4">
            <h4 className="text-center mb-4">Why Choose Us?</h4>
            
            <div className="container about-qualities-content-one text-center">
              <div className="row">
                {
                  aboutContentOne.map((item, index) => {
                    return(
                      <div className="col-3 text-center" key={index}>
                        <div className="image-container mb-2">
                          <img src={item.img} alt={item.name} loading="lazy" className="icon" style={{width: 70}} />
                        </div>
                        <p className="fw-semibold m-0">{item.name}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid px-md-3 my-5">            
          <div className="container about-qualities-content-two text-center">
            <div className="row">
              {
                aboutContentTwo.map((item, index) => {
                  return(
                    <div className="col-6 col-md-3 mb-5 mb-lg-0" key={index}>
                      <div className="image-container mb-2">
                        <img src={item.img} alt={item.title} loading="lazy" style={{width: 70}} />
                      </div>
                      <h3>{item.title}</h3>
                      <p className="fw-semibold m-0">{item.desc}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>

    </section>
  );
}

export default About;
