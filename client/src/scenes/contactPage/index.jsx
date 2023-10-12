import "./index.css";
import NavbarMain from "scenes/navbar";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

import { TextField, Button } from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const ContactPage = () => {
  const isLargeScreens = useMediaQuery("(min-width: 1000px)");
  const isMediumScreens = useMediaQuery("(min-width: 640px)");
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <section id="contact1">
        <h3 className="contact-title">Contact Us</h3>
        <div
          className="contact-body"
          style={{ flexDirection: isMediumScreens ? "row" : "column" }}
        >
          <div className="contact-details">
            <h5 style={{ textAlign: "center", padding: "0.5rem" }}>
              Contact Details:
            </h5>
            <hr style={{ borderTop: "1px solid #890620", margin: "1rem" }} />
            <div className="details-content">
              <div className="details-left">
                <div>
                  <PhoneIcon />
                  {" Phone Number:"}
                </div>
                <div>
                  <MailOutlineIcon />
                  {" Email:"}
                </div>
                <div>
                  <BusinessIcon />
                  {" Address:"}
                </div>
              </div>
              <div className="details-right">
                <div>+27 00-000-0000</div>
                <div>test@test.co.za</div>
                <div style={{ paddingBottom: "0" }}>Address line 1,</div>
                <div style={{ padding: "0 1rem" }}>Address line 2,</div>
                <div style={{ padding: "0 1rem" }}>Cape Town</div>
                <div style={{ paddingTop: "0" }}>7500</div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h5 style={{ textAlign: "center", padding: "0.5rem" }}>
              Get in Touch:
            </h5>
            <hr style={{ borderTop: "1px solid #890620", margin: "1rem" }} />
            <div className="form-content">
              <TextField
                label="First Name"
                variant="standard"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
                style={{ gridArea: "1 / 1 / 2 / 2" }}
              />
              <TextField
                label="Last Name"
                variant="standard"
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                }}
                style={{ gridArea: "1 / 2 / 2 / 3" }}
              />
              <TextField
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{ gridArea: "2 / 1 / 3 / 3" }}
              />
              <TextField
                label="Message..."
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                style={{ gridArea: "3 / 1 / 4 / 3" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1rem 0 0",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  console.log(`First Name: ${fname}`);
                  console.log(`Last Name: ${lname}`);
                  console.log(`Email: ${email}`);
                  console.log(`Message: ${message}`);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
