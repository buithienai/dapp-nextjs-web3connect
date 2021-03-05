import React from 'react';
import { toast } from 'react-toastify';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <a onClick={() => toast.warn("Coming soon!")}>ELD FARM Contract</a>
                <a onClick={() => toast.warn("Coming soon!")}>Discord</a>
                <a onClick={() => toast.warn("Coming soon!")}>Github</a>
                <a onClick={() => toast.warn("Coming soon!")}>Twitter</a>
                <a onClick={() => toast.warn("Coming soon!")}>Medium</a>
            </div>
        </footer>
    );
}

export default Footer;