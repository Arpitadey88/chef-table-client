import React from 'react';
import ImageUploading from "react-images-uploading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import './ImageUpload.css';

const ImageUpload = () => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    return (
        <div>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png"]}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button className="btn btn-outline btn-sm"
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                        > Upload
                            <FontAwesomeIcon icon={faUpload} />

                        </button>
                        &nbsp;

                        <button className="btn btn-outline btn-sm ms-4" onClick={onImageRemoveAll}>Remove All</button>

                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.data_url} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <button className="btn btn-outline btn-sm mb-2" onClick={() => onImageUpdate(index)}>Update</button>
                                    <button className="btn btn-outline btn-sm" onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </ImageUploading>
        </div>
    );
};
library.add(faUpload);
export default ImageUpload;