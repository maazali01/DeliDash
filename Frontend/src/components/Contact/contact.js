import React from 'react';
import './contact.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => (
    <div className="form4">
        <form className="form5" action="https://formspree.io/f/xpzgknry" method="POST">
            <h2 id="contact4">Feedback Form</h2>
            <input className="name4" type="text" name="name" placeholder="Your name" />
            <br />
            <input className="email4" type="email" name="email" placeholder="your-name@gmail.com" />
            <br />
            <textarea className="message4" name="message" placeholder="Write your feedback here..."></textarea>
            <br />
            <button className="button4" type="submit">Submit</button>
        </form>
        <div className="social-icons4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
    </div>
);

export default Contact;
