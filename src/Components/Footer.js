import React from "react";

const Footer = () => {
  return (
    <footer className="p-10 bg-slate-900 text-white">
      <div className="Container footer">
        <div>
        <h1 className="font-bold text-4xl">Phone Market</h1>
        <p>
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 2021
        </p>
      </div>
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
