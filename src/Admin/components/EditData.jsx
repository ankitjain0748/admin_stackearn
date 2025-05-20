import { MdEdit } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";


import { Link } from "react-router-dom";

function EditData({ link }) {
    return (
        <>
            <Link to={link}
                style={{ cursor: 'pointer' }}
                className={` d-flex  Edit-data p-1  rounded  align-items-center justify-content-center`}
            >
               <MdEdit className="text-black" size={20} />
            </Link>
        </>
    );
}

export default EditData;