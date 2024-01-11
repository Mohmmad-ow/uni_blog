/* eslint-disable react/prop-types */
import storageRef from "../../firebase/firebaseStorage.js";
import { getDownloadURL, ref } from "firebase/storage";


import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';


export default function Download({imagePath, handleImgLoaded}) {

    const [imageSrc, setImageSrc] = useState(null);
    const storage = storageRef;
    getDownloadURL(ref(storage, imagePath))
    .then((url) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    // eslint-disable-next-line no-unused-vars
    xhr.onload = (event) => {
      // eslint-disable-next-line no-unused-vars
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    setImageSrc(url);
  })
  .catch((error) => {
    // Handle any errors
    console.log(error);
  });

  return (
        <img  src={imageSrc} alt="" />
  )
}
