import React, { useState, useEffect } from 'react';
import { Viewer, Cartesian3, Color } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

function App() {
  const [viewer, setViewer] = useState(null);
  const [colors, setColors] = useState([Color.BLACK, Color.BLUE, Color.GREEN,Color.BLUEVIOLET,Color.CHARTREUSE]); 

  useEffect(() => {
    const viewer = new Viewer('cesiumContainer');
    setViewer(viewer);

    return () => {
      viewer.destroy();
    };
  }, []);

  useEffect(() => {
    if (viewer) {
      fetchData();
    }
  }, [viewer]);

  const fetchData = () => {
    fetch('http://localhost:3001/pakistanshape')
      .then(response => response.json())
      .then(data => {
        data.forEach((item, index) => {
          const coordinates = item.geom.coordinates[0][0];
          const positions = coordinates.map(coord => ({
            longitude: coord[0],
            latitude: coord[1]
          }));

          viewer.entities.add({
            polygon: {
              hierarchy: positions.map(pos => Cartesian3.fromDegrees(pos.longitude, pos.latitude)),
              material: colors[index % colors.length].withAlpha(0.5)
            }
          });
        });

        viewer.zoomTo(viewer.entities);
      })
      .catch(error => console.error('Error fetching shape data:', error));
  };

  return (
    <div className="App">
      <div id="cesiumContainer" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
}

export default App;
