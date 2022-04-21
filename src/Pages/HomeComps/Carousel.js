import '../../CSS/carousel.css'
import { Link } from 'react-router-dom'

function Carousel() {
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner" style={{ color: '#10505e' }}>
        <div className="carousel-item active" style={{ width: '100vw' }}>
          <svg
            className="bd-placeholder-img"
            width="100vw"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            style={{ position: 'relative' }}
          >
            <image
              href="../assets/Home Slider.png"
              className="responsive-image"
            />
          </svg>

          <div className="container">
            <div className="carousel-caption text-start">
              <h1>Welcome to Eats Online!</h1>
              <p>Your One-Stop Shop for Regional Delicacies.</p>
              <p></p>
              <p>
                <Link className="btn btn-lg btn-primary" to="/menu">
                  SHOP NOW
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <svg
            className="bd-placeholder-img"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#777" />
            <image
              href="../assets/Home Slider.png"
              className="responsive-image"
            />
          </svg>

          <div className="container">
            <div className="carousel-caption text-start">
              <h1>Another example headline.</h1>
              <p>
                Some representative placeholder content for the second slide of
                the carousel.
              </p>
              <p>
                <a className="btn btn-lg btn-primary" href={void 0}>
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <svg
            className="bd-placeholder-img"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#777" />
            <image
              href="../assets/Home Slider.png"
              className="responsive-image"
            />
          </svg>

          <div className="container">
            <div className="carousel-caption text-start">
              <h1>Don't have an account?</h1>
              <p>
                <Link className="btn btn-lg btn-primary" to="/login">
                  Sign up today
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
export default Carousel
