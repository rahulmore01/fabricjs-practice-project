import React, { useState, useRef, useEffect } from "react";
import { fabric } from "fabric";

const pathData = {
  horizontal: [
    {
      path: "M 0,0 L 600,0 L 600,400 L 0,400 Z",
      logo_pos: { x_div: 1, y_div: 1, isShadow: 1, shape: "normal" },
      overlays: [
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-6.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-11.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-1.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-2.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-3.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-4.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-7.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-8.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-9.png",
      ],
    },
    {
      path: "M 100 100 h 600 a 30 30 0 0 1 30 30 v 400 a 30 30 0 0 1 -30 30 h -600 a 30 30 0 0 1 -30 -30 v -400 a 30 30 0 0 1 30 -30 z",
      logo_pos: { x_div: 1.1, y_div: 1, isShadow: 0, shape: "Round Edge" },
      overlays: [
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-14.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-10.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-5.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-12.png",
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-13.png",
      ],
    },
    {
      path: "M 3029.7457 -1159.5494 c -35.387 217.8021 -111.8997 385.9889 -240.7208 535.1537 c -86.9696 101.7364 -156.9923 153.0862 -286.3171 211.1646 c -121.1772 54.3883 -227.1746 78.337 -357.3859 81.3407 c -123.2165 3.2724 -203.6961 -11.8282 -454.0911 -84.4939 c -303.8562 -87.729 -403.052 -84.5346 -696.1768 17.288 c -169.4105 59.5406 -217.7974 68.6899 -323.7192 64.6208 c -257.8098 -9.9041 -439.72 -145.9875 -552.5333 -413.5153 c -55.9646 -132.2459 -66.1527 -205.6911 -58.0913 -415.5363 c 6.4875 -168.8754 10.8289 -203.7344 39.149 -315.7299 c 85.9213 -334.9485 230.8794 -591.5731 446.7491 -792.4344 c 205.4165 -189.254 428.6312 -294.7631 745.0102 -350.6592 c 125.9827 -23.1809 325.1431 -23.5358 454.4715 -3.5564 c 578.8455 93.2894 1049.4752 450.6192 1218.4871 922.4549 c 64.9987 183.6305 89.9897 392.744 65.1688 543.9026 z",
      logo_pos: { x_div: 5, y_div: 1, isShadow: 0, shape: "Bean horizontal" },
      overlays: [
        "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-16.png",
        "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-15.png",
        "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-17.png",
      ],
    },
    {
      path: "M -302.6 418.1 C -437.9 418.1 -490 340.7 -490 245 S -437.9 71.9 -302.6 71.9 S 0 149.3 0 245 S -167.2 418.1 -302.6 418.1 z",
      logo_pos: { x_div: 2.5, y_div: 1, isShadow: 0, shape: "Egg horizontal" },
      overlays: [
        "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-20.png",
        "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-18.png",
        "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-19.png",
      ],
    },
    {
      path: "M -2750 615 c 8 -133 31 -211 91 -311 c 49 -81 162 -183 251 -227 c 141 -68 135 -68 1063 -65 c 828 3 830 3 895 25 c 218 75 380 256 424 475 c 22 108 23 700 1 803 c -48 228 -234 423 -460 480 c -89 23 -1698 22 -1794 0 c -216 -51 -399 -231 -455 -448 c -17 -65 -27 -545 -16 -732 z",
      logo_pos: {
        x_div: 2,
        y_div: 1,
        isShadow: 0,
        shape: "Extra Round horizontal",
      },
      overlays: [
        "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-14.png",
      ],
    },
  ],
};

const FabricComponent = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Initialize the canvas
  const initCanvas = () => {
    const canvasInstance = new fabric.Canvas("canvas", {
      //   backgroundColor: "rgb(255,255,255)",
      backgroundColor: "rgb(100,100,200)",
      //   width: 900,
      //   height: 900,
    });
    setCanvas(canvasInstance);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (f) => {
      const img = new Image();
      img.src = f.target.result;
      img.onload = () => {
        const imgInstance = new fabric.Image(img);
        const scaleFactor = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        imgInstance.scale(scaleFactor);
        imgInstance.set({
          left: (canvas.width - imgInstance.getScaledWidth()) / 2,
          top: (canvas.height - imgInstance.getScaledHeight()) / 2,
        });
        canvas.add(imgInstance);
        setUploadedImage(imgInstance);
      };
    };

    reader.readAsDataURL(file);
  };

  // Apply mask shape to the uploaded image
  const applyMask = (path) => {
    if (!uploadedImage) return;

    const mask = new fabric.Path(path, {
      absolutePositioned: true,
    });

    const maskBoundingBox = mask.getBoundingRect();
    const imageBoundingBox = uploadedImage.getBoundingRect();

    mask.scaleToWidth(imageBoundingBox.width);
    mask.scaleToHeight(imageBoundingBox.height);

    mask.set({
      left: uploadedImage.left,
      top: uploadedImage.top,
    });

    uploadedImage.set({
      clipPath: mask,
    });

    canvas.renderAll();
  };

  useEffect(() => {
    initCanvas();
  }, []);

  return (
    <div className="App  mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Acrylic Store Image Masking</h1>
      <input type="file" onChange={handleImageUpload} className="mb-4 p-2 " />
      <div className="shapes mb-4">
        {pathData.horizontal.map((shape, index) => (
          <button
            key={index}
            onClick={() => applyMask(shape.path)}
            className="mr-2 mb-2 p-2 bg-blue-500 text-white rounded"
          >
            {shape.logo_pos.shape}
          </button>
        ))}
      </div>
      <div className="w-full h-full border border-gray-300">
        <canvas id="canvas" ref={canvasRef} />
      </div>
    </div>
  );
};

export default FabricComponent;
// import React, { useState, useRef, useEffect } from "react";
// import { fabric } from "fabric";

// const pathData = {
//   horizontal: [
//     {
//       path: "M 0,0 L 600,0 L 600,400 L 0,400 Z",
//       logo_pos: { x_div: 1, y_div: 1, isShadow: 1, shape: "normal" },
//       overlays: [
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-6.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-11.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-1.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-2.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-3.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-4.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-7.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-8.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-9.png",
//       ],
//     },
//     {
//       path: "M 100 100 h 600 a 30 30 0 0 1 30 30 v 400 a 30 30 0 0 1 -30 30 h -600 a 30 30 0 0 1 -30 -30 v -400 a 30 30 0 0 1 30 -30 z",
//       logo_pos: { x_div: 1.1, y_div: 1, isShadow: 0, shape: "Round Edge" },
//       overlays: [
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-14.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-10.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-5.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-12.png",
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-13.png",
//       ],
//     },
//     {
//       path: "M 3029.7457 -1159.5494 c -35.387 217.8021 -111.8997 385.9889 -240.7208 535.1537 c -86.9696 101.7364 -156.9923 153.0862 -286.3171 211.1646 c -121.1772 54.3883 -227.1746 78.337 -357.3859 81.3407 c -123.2165 3.2724 -203.6961 -11.8282 -454.0911 -84.4939 c -303.8562 -87.729 -403.052 -84.5346 -696.1768 17.288 c -169.4105 59.5406 -217.7974 68.6899 -323.7192 64.6208 c -257.8098 -9.9041 -439.72 -145.9875 -552.5333 -413.5153 c -55.9646 -132.2459 -66.1527 -205.6911 -58.0913 -415.5363 c 6.4875 -168.8754 10.8289 -203.7344 39.149 -315.7299 c 85.9213 -334.9485 230.8794 -591.5731 446.7491 -792.4344 c 205.4165 -189.254 428.6312 -294.7631 745.0102 -350.6592 c 125.9827 -23.1809 325.1431 -23.5358 454.4715 -3.5564 c 578.8455 93.2894 1049.4752 450.6192 1218.4871 922.4549 c 64.9987 183.6305 89.9897 392.744 65.1688 543.9026 z",
//       logo_pos: { x_div: 5, y_div: 1, isShadow: 0, shape: "Bean horizontal" },
//       overlays: [
//         "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-16.png",
//         "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-15.png",
//         "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-17.png",
//       ],
//     },
//     {
//       path: "M -302.6 418.1 C -437.9 418.1 -490 340.7 -490 245 S -437.9 71.9 -302.6 71.9 S 0 149.3 0 245 S -167.2 418.1 -302.6 418.1 z",
//       logo_pos: { x_div: 2.5, y_div: 1, isShadow: 0, shape: "Egg horizontal" },
//       overlays: [
//         "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-20.png",
//         "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-18.png",
//         "https://omgs.in/wp-content/uploads/2024/01/12x9-overlay-19.png",
//       ],
//     },
//     {
//       path: "M -2750 615 c 8 -133 31 -211 91 -311 c 49 -81 162 -183 251 -227 c 141 -68 135 -68 1063 -65 c 828 3 830 3 895 25 c 218 75 380 256 424 475 c 22 108 23 700 1 803 c -48 228 -234 423 -460 480 c -89 23 -1698 22 -1794 0 c -216 -51 -399 -231 -455 -448 c -17 -65 -27 -545 -16 -732 z",
//       logo_pos: {
//         x_div: 2,
//         y_div: 1,
//         isShadow: 0,
//         shape: "Extra Round horizontal",
//       },
//       overlays: [
//         "https://omgs.in/wp-content/uploads/2023/12/12x9-overlay-14.png",
//       ],
//     },
//   ],
// };

// const FabricComponent = () => {
//   const canvasRef = useRef(null);
//   const [canvas, setCanvas] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null);

//   // Initialize the canvas
//   const initCanvas = () => {
//     const canvasInstance = new fabric.Canvas("canvas", {
//       width: 1200,
//       height: 900,
//     });
//     setCanvas(canvasInstance);
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (f) => {
//       const img = new Image();
//       img.src = f.target.result;
//       img.onload = () => {
//         const imgInstance = new fabric.Image(img, {
//           left: 100,
//           top: 100,
//         });
//         canvas.add(imgInstance);
//         setUploadedImage(imgInstance);
//       };
//     };

//     reader.readAsDataURL(file);
//   };

//   // Apply mask shape to the uploaded image
//   const applyMask = (path) => {
//     if (!uploadedImage) return;

//     const mask = new fabric.Path(path, {
//       left: uploadedImage.left,
//       top: uploadedImage.top,
//       absolutePositioned: true,
//       objectCaching: false, // Ensure the mask is not cached, which can cause rendering issues
//     });

//     uploadedImage.set({
//       clipPath: mask,
//     });

//     canvas.renderAll();
//   };

//   useEffect(() => {
//     initCanvas();
//   }, []);

//   return (
//     <div className="App container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Acrylic Store Image Masking</h1>
//       <input
//         type="file"
//         onChange={handleImageUpload}
//         className="mb-4 p-2 border border-gray-300"
//       />
//       <div className="shapes mb-4">
//         {pathData.horizontal.map((shape, index) => (
//           <button
//             key={index}
//             onClick={() => applyMask(shape.path)}
//             className="mr-2 mb-2 p-2 bg-blue-500 text-white rounded"
//           >
//             {shape.logo_pos.shape}
//           </button>
//         ))}
//       </div>
//       <div className="canvas-container border border-gray-300">
//         <canvas id="canvas" ref={canvasRef} />
//       </div>
//     </div>
//   );
// };

// export default FabricComponent;
