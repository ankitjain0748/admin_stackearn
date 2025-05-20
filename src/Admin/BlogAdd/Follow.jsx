import React, { useEffect, useState } from "react";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import Listing from "../Api/Listing";
import { FaFacebook } from "react-icons/fa6";
import { useSelector } from "react-redux";


const Follow = () => {

    const users = useSelector(state => state.users.users);

  console.log("users", users)
    const [social, setSocial] = useState([]);

    const PaymentLisitng = async () => {
        try {
            const main = new Listing();
            const response = await main.Adminprofile();
            setSocial(response?.data?.SocialAdmin);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        PaymentLisitng();
    }, []);
    return (
        <div className="follow">
            <h2>Follow us on</h2>
            <div className="link-image">
                {/* YouTube */}

                <a
                    aria-label="Follow us on YouTube"
                    href={social?.youtube?.startsWith("http") ? social.youtube : `https://${social?.youtube}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaYoutube size={30} color="#FF0000" />
                </a>

                {/* Instagram */}
                <a
                    aria-label="Follow us on Instagram"
                    href={social?.instragram?.startsWith("http") ? social.instragram : `https://${social?.instragram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaInstagram size={30} color="#E1306C" />
                </a>

                {/* Facebook */}
                <a
                    aria-label="Follow us on Facebook"
                    href={social?.facebook?.startsWith("http") ? social.facebook : `https://${social?.facebook}`}

                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaFacebook  size={24} color="#1877F2" />
                </a>
            </div>
        </div>
    );
};

export default Follow;
