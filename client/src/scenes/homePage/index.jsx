import "./index.css";

import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import NavbarMain from "scenes/navbar";
import Carousel from "react-bootstrap/Carousel";

const HomePage = () => {
  const isLargeScreens = useMediaQuery("(min-width: 1000px)");
  const isMediumScreens = useMediaQuery("(min-width: 640px)");
  const dispatch = useDispatch();
  const { palette } = useTheme();

  return (
    <div>
      <section
        id="section1"
        style={{
          height: isMediumScreens ? "auto" : "auto",
        }}
      >
        <div
          className="s1_blur"
          style={{
            gridTemplateColumns: isLargeScreens ? "50% 50%" : null,
            fontSize: isLargeScreens ? "1.3rem" : "1.2rem",
          }}
        >
          <div className="s1_text s1">
            <div
              className="text-container"
              style={{
                textAlign: "center",
              }}
            >
              <h2>JUST IN TIME FOR WINTER</h2>
              <hr style={{ borderTop: "5px dotted #890620", margin: "1rem" }} />
              <p>
                Locally made and proudly South African, Dee Dee's Doggie Jerseys
                are an initiative designed for empowering women and uplifting
                local communities by creating meaningful employment for the
                retired senior ladies who knit these jerseys.
              </p>
              <hr style={{ borderTop: "5px dotted #890620", margin: "1rem" }} />
              <h5 className="size-link">
                <Link to="/store/price">
                  SEE SIZING & PRICING CHART FOR DETAILS
                </Link>
              </h5>
            </div>
            <hr style={{ borderTop: "5px dotted #890620", margin: "1rem" }} />
            <div className="btn-container">
              <Link to="/store" className="shop-btn">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="s1_image s1">
            <Carousel
              className="slider d-block"
              interval="2000"
              controls={false}
              indicators={false}
              pause={false}
            >
              <Carousel.Item>
                <div className="carousel-img">
                  <img
                    className="img-fluid"
                    alt="img1"
                    src={
                      process.env.PUBLIC_URL + "/images/IMG-20230307-WA0019.jpg"
                    }
                    style={{
                      height: isLargeScreens ? "35vw" : "60vw",
                      width: isLargeScreens ? "35vw" : "60vw",
                      maxHeight: "500px",
                      maxWidth: "500px",
                      borderRadius: "50%",
                      border: "5px #890620 solid",
                    }}
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="carousel-img">
                  <img
                    className="img-fluid"
                    alt="img2"
                    src={
                      process.env.PUBLIC_URL + "/images/IMG-20230307-WA0018.jpg"
                    }
                    style={{
                      height: isLargeScreens ? "35vw" : "60vw",
                      width: isLargeScreens ? "35vw" : "60vw",
                      maxHeight: "500px",
                      maxWidth: "500px",
                      borderRadius: "50%",
                      border: "5px #890620 solid",
                    }}
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="carousel-img">
                  <img
                    className="img-fluid"
                    alt="img2"
                    src={
                      process.env.PUBLIC_URL + "/images/IMG-20230307-WA0017.jpg"
                    }
                    style={{
                      height: isLargeScreens ? "35vw" : "60vw",
                      width: isLargeScreens ? "35vw" : "60vw",
                      maxHeight: "500px",
                      maxWidth: "500px",
                      borderRadius: "50%",
                      border: "5px #890620 solid",
                    }}
                  />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </section>

      <section id="section2">
        <div
          className="s2-block block-1"
          style={{
            display: isMediumScreens ? "grid" : "flex",
            flexDirection: isMediumScreens ? "row" : "column",
          }}
        >
          <div className="desc" style={{ gridArea: "one-one" }}>
            <div
              className="desc-icon"
              style={{
                height: isMediumScreens ? "35vw" : "50vw",
                width: isMediumScreens ? "35vw" : "50vw",
                background: `url('${process.env.PUBLIC_URL}images/IMG-20221012-WA0037.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "right",
              }}
            ></div>
            <div className="desc-text">Homemade</div>
          </div>

          <div
            className="desc"
            style={{
              gridArea: "one-two",
              fontSize: isMediumScreens ? "x-large" : "",
            }}
          >
            <div>
              Handmade jerseys for your best friend made by one of our amazing
              knitters. Using only the best materials you are sure to be
              satisfied.
            </div>
            <a
              href="/about"
              style={{
                textDecoration: "underline",
                color: "#890620",
                cursor: "pointer",
              }}
            >
              Find out more...
            </a>
          </div>
        </div>
        <hr style={{ borderTop: "5px dotted #890620", margin: "1rem" }} />
        <div
          className="s2-block block-2"
          style={{
            display: isMediumScreens ? "grid" : "flex",
            flexDirection: isMediumScreens ? "row" : "column",
          }}
        >
          <div className="desc" style={{ gridArea: "one-two" }}>
            <div
              className="desc-icon"
              style={{
                height: isMediumScreens ? "35vw" : "50vw",
                width: isMediumScreens ? "35vw" : "50vw",
                background: `url('${process.env.PUBLIC_URL}/images/IMG-20230519-WA0006.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="desc-text">Custom</div>
          </div>
          <div
            className="desc"
            style={{
              gridArea: "one-one",
              fontSize: isMediumScreens ? "x-large" : "",
            }}
          >
            <div>
              If one of our in stock jerseys are not to your liking, no worries!
              We allow for you to customize your order, from the size to the
              colour and even the pattern.
            </div>
            <a
              href="/shop/custom"
              style={{
                textDecoration: "underline",
                color: "#890620",
                cursor: "pointer",
              }}
            >
              Order Now!
            </a>
          </div>
        </div>
        <hr style={{ borderTop: "5px dotted #890620", margin: "1rem" }} />
        <div
          className="s2-block block-3"
          style={{
            display: isMediumScreens ? "grid" : "flex",
            flexDirection: isMediumScreens ? "row" : "column",
          }}
        >
          <div className="desc" style={{ gridArea: "one-one" }}>
            <div
              className="desc-icon"
              style={{
                height: isMediumScreens ? "35vw" : "50vw",
                width: isMediumScreens ? "35vw" : "50vw",
                background: `url('${process.env.PUBLIC_URL}images/IMG-20230522-WA0012.jpg')`,
                backgroundSize: "100%",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="desc-text">Made with Love</div>
          </div>
          <div
            className="desc"
            style={{
              gridArea: "one-two",
              fontSize: isMediumScreens ? "x-large" : "",
            }}
          >
            <div>
              At Dee Dee's Doggie Jerseys we want to share our love for all our
              fluffy friends. Be it, keeping them warm in the winter or just
              helping them look extra stylish.
            </div>
            <a
              href="/contact"
              style={{
                textDecoration: "underline",
                color: "#890620",
                cursor: "pointer",
              }}
            >
              Get in contact...
            </a>
          </div>
        </div>
      </section>
      <section id="section3">
        <div></div>
        <div></div>
      </section>
    </div>
  );
};

export default HomePage;
