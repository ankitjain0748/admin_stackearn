import { FaEdit, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function ViewIcon({ link }) {
    return (
        <>
            <Link to={link}
                style={{ cursor: 'pointer' }}
                className={` view-data p-1  rounded  align-items-center justify-content-center`}
            >
                <FaRegEye size={20}  />
            </Link>
        </>
    );
}

export default ViewIcon;