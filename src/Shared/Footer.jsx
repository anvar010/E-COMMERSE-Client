import React from 'react';
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer p-10 bg-blue-200/30 text-base">
      <aside className="flex flex-col items-center">
        <img src={logo} alt="Shopper Logo" className="h-24 w-24" /> {/* Increased width and height */}
        {/* <h1 className="text-2xl font-bold mt-2">SHOPPER</h1> */}
      </aside>
      <nav>
        <h6 className="footer-title text-xl text-[#f54748]">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title text-xl text-[#f54748]">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title text-xl text-[#f54748]">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
}

export default Footer;
