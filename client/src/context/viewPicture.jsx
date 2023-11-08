import storageRef from "../../firebase/firebaseStorage.js";
import { getDownloadURL, ref } from "firebase/storage";


import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';


export default function Download({imagePath}) {
    const [imageSrc, setImageSrc] = useState(null);
    const storage = storageRef;
    getDownloadURL(ref(storage, 'ing.png'))
    .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    setImageSrc(url);
  })
  .catch((error) => {
    // Handle any errors
    console.log(error);
  });

  return (
    <div>
        <img src={imageSrc} alt="" />
    </div>
  )
}
