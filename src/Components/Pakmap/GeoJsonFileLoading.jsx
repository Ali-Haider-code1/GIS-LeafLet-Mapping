import React, { useEffect } from "react";
import { Viewer, GeoJsonDataSource, Ion } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

const Pakshape = () => {
  Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1Y2I2MTI3Yy0xZGQyLTQ5ZGEtOGI1MC1kYzU5OWUxMDRlNzYiLCJpZCI6MjE3MjM0LCJpYXQiOjE3MTY0NDQ5NjF9.59zWbq2Fei3L8khek9CUoDDO9ZHt6aI0gkp_QwppZp8";

  useEffect(() => {
    const viewerInstance = new Viewer("cesiumContainer");

    GeoJsonDataSource.load("http://localhost:3001/pakistanshape")
      .then((dataSource) => {
        viewerInstance.dataSources.add(dataSource);
      })
      .catch((error) => {
        console.error("Error loading GeoJSON data: ", error);
      });

    return () => {
      if (viewerInstance && !viewerInstance.isDestroyed()) {
        viewerInstance.destroy();
      }
    };
  }, []);

  return (
    <div id="cesiumContainer" style={{ width: "100%", height: "100vh" }}></div>
  );
};

export default Pakshape;
