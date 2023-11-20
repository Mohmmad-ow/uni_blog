/* eslint-disable react/prop-types */
import storageRef from "../../firebase/firebaseStorage.js";
import { getDownloadURL, ref } from "firebase/storage";


import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';


export default function Download({imagePath, cssClass}) {
    const [imageSrc, setImageSrc] = useState(null);
    const storage = storageRef;
    getDownloadURL(ref(storage, imagePath))
    .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
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
        <img className={{cssClass}} src={imageSrc} alt="" />
  )
}
