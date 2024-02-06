/* eslint-disable react/prop-types */
import storageRef from "../../firebase/firebaseStorage.js";
import { getDownloadURL, ref } from "firebase/storage";


import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';


export default function Download({imagePath}) {

    const [imageSrc, setImageSrc] = useState(null);
    const storage = storageRef;

    useEffect(()  => {
      const getLink = async () => {
        try {
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
          } catch(err) {
            console.log(err)
          }
      }

      getLink()
    }, [])
        

  return (
        <img  src={imageSrc} alt="" />
  )
}
