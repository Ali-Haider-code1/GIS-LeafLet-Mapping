// import "cesium/Build/Cesium/Widgets/widgets.css";
// import React, { useEffect, useState } from "react";
// import { Viewer, Ion, UrlTemplateImageryProvider } from "cesium";

// const CesiumMap = () => {
//   const [mbtilesUrl, setMbtilesUrl] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:3001/mbtiles/info")
//       .then(response => response.json())
//         .then(data => {
//           console.log(data)
//         setMbtilesUrl(data.url);
//       })
//       .catch(error => {
//         console.error("Error fetching MBTiles information:", error);
//       });
//   }, []);

//   useEffect(() => {
//     if (mbtilesUrl) {
//       Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1Y2I2MTI3Yy0xZGQyLTQ5ZGEtOGI1MC1kYzU5OWUxMDRlNzYiLCJpZCI6MjE3MjM0LCJpYXQiOjE3MTY0NDQ5NjF9.59zWbq2Fei3L8khek9CUoDDO9ZHt6aI0gkp_QwppZp8";
      
//       const viewer = new Viewer('cesiumContainer', {
//         baseLayerPicker: true,
//         imageryProvider: new UrlTemplateImageryProvider({
//           url: mbtilesUrl // Ensure this URL is correctly pointing to a tile server serving pbf tiles
//         }),
//         geocoder: true
//       });

//       // If you need to load a Cesium 3D Tiles, ensure it's served correctly
//       // const tileset = new Cesium.Cesium3DTileset({ url: 'path-to-tileset.json' });
//       // viewer.scene.primitives.add(tileset);

//       return () => {
//         viewer.destroy();
//       };
//     }
//   }, [mbtilesUrl]);

//   return (
//     <div className="mapcontainer">
//       <div id="cesiumContainer" style={{ width: "100%", height: "100vh" }} />
//     </div>
//   );
// };

// export default CesiumMap;