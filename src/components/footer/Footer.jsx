import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaCopyright,
} from "react-icons/fa";
import { GrMail, GrPhone, GrCode } from "react-icons/gr";
import "../../assets/styles/footer.css";
import Logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="navy text-white p-4">
      <div className="row">
        <div className="col-md-3">
          <h6 className="mb-3">JOIN US ON SOCIAL MEDIA</h6>
          <p>
            <Link
              className="text-white"
              to="https://www.facebook.com/get-nerdifiedIT"
              target="_blank"
            >
              <FaFacebook id="facebook" />
              <span> Facebook</span>
            </Link>
          </p>
          <p>
            <Link
              className="text-white"
              to="https://twitter.com/AndyJrII"
              target="_blank"
            >
              <FaTwitter id="twitter" />
              <span> Twitter</span>
            </Link>
          </p>
          <p>
            <Link
              className="text-white"
              to="https://www.instagram.com/andyjr_ii/"
              target="_blank"
            >
              <FaInstagram id="instagram" />
              <span> Instagram</span>
            </Link>
          </p>
          <p>
            <Link
              className="text-white"
              to="https://wa.me/2349063368647"
              target="_blank"
            >
              <FaWhatsapp id="whatsapp" />
              <span> Whatsapp</span>
            </Link>
          </p>
        </div>
        <div className="col-md-3">
          <h6 className="mb-3">CONTACT US</h6>
          <p>
            <Link
              className="text-white"
              to="mailto:enehizenajames@gmail.com"
              target="_blank"
            >
              <GrMail id="gmail" />
              <span> E-Mail</span>
            </Link>
          </p>
          <p>
            <Link className="text-white">
              <GrPhone />
              <span> +23409056539717</span>
            </Link>
          </p>
          <p>
            <Link className="text-white">
              <GrPhone />
              <span> +2349063368647</span>
            </Link>
          </p>
        </div>
        <div className="col-md-3">
          <h6 className="mb-3">CHOOSE YOUR CAREER PATH</h6>
          <p>
            <Link className="text-white">
              <GrCode />
              <span> Web Developer</span>
            </Link>
          </p>
          <p>
            <Link className="text-white">
              <GrCode />
              <span> Mobile App Developer</span>
            </Link>
          </p>
          <p>
            <Link className="text-white">
              <GrCode />
              <span> Data Analyst</span>
            </Link>
          </p>
        </div>
        <div className="col-md-3">
          <h6 className="mb-3">ABOUT US</h6>
          <p className="text-light">
            Here at &lt;Nerdified /&gt;, our aim is to bridge the distance
            between the tutor & the student, making sure that distance is not a
            barrier, & with our live online classes, students can learn, ask
            questions & get answers to their questions in realtime.
          </p>
        </div>
      </div>
      <div className="row text-center">
        <p className="text-white">
          <span>
            <FaCopyright className="bi" /> Copyright 2024, made by
          </span>
          <Link to="/">
            <img src={Logo} width="70" height="70" alt="<Nerdified />" />
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
