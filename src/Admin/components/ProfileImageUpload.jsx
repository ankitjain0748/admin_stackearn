import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import PropTypes from "prop-types";
import User16 from "../../assert/user16.jpg";
import { MdEdit } from "react-icons/md";


const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: S3_BUCKET,
});



const s3 = new AWS.S3();
const ProfileImageUpload = ({ value, onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(value || "");

    useEffect(() => {
        if (value) {
            setUploadedImageUrl(value);
        }
    }, [value]);
    const handleFileInput = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        uploadFile(file);
    };

    const uploadFile = (file) => {



        if (!file) {
            console.error("No file selected.");
            return;
        }

        const params = {
            Bucket: "stackearnimage",
            Key: `uploads/${file.name}`, // Save under a specific folder
            ontentType: file.type,
            Body: file,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error("Error uploading the file:", err);
            } else {
                setUploadedImageUrl(data.Location);
                if (onImageUpload) {
                    onImageUpload(data.Location); // Notify parent of new URL
                }
            }
        });
    };

    return (
        <div>
            <div className="course-group profile-upload-group mb-3 ">
                <div className="course-group-img profile-edit-field d-flex align-items-center">
                    <div
                        to="/student/student-profile"
                        className="profile-pic"
                    >
                        <img src={uploadedImageUrl ? uploadedImageUrl : value || User16} alt="Img" className="img-fluid" />
                    </div>

                    <div className="new-employee-field">
                        <div className="image-upload mb-0">
                            <input type="file" onChange={handleFileInput} />
                            <div className="image-uploads">
                                <MdEdit />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

ProfileImageUpload.propTypes = {
    value: PropTypes.string,
    onImageUpload: PropTypes.func.isRequired,
};

export default ProfileImageUpload;