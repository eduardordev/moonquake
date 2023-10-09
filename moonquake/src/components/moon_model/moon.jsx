import React, { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';  // Asegúrate de que esta es la forma correcta de importar Globe.
import { scaleOrdinal } from 'd3-scale';
import axios from 'axios';

import lunarSurface from './lunar_surface.jpg';
import lunarBumpmap from './lunar_bumpmap.jpg';

const Moon = ({ props }) => {
    
    const [quakes, setQuakes] = useState([]);
    const getAllQuakes = () => {
        axios.get('http://3.19.185.171:5000/api/v1/quakes')
          .then((response) => {
            console.log("Response", response.data);
            setQuakes(response.data.map(index => {
                return{
                    id : index._id
                }
            }))
            console.log(quakes)
            
          }).catch((err) => {
            console.error(err)
          })
      };
    const [landingSites, setLandingSites] = useState([]);
    

    

    const colorScale = scaleOrdinal(['orangered', 'mediumblue', 'darkgreen', 'yellow']);
    const labelsTopOrientation = new Set(['Apollo 12', 'Luna 2', 'Luna 20', 'Luna 21', 'Luna 24', 'LCROSS Probe']); // avoid label collisions

    useEffect(() => {
        getAllQuakes()
    }, []);

    useEffect(() => {
        if (quakes.length) {
            console.log(quakes);
        }
    }, [quakes]);

    return (
        <Globe
            globeImageUrl={lunarSurface}
            bumpImageUrl={lunarBumpmap}
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            showGraticules={true}
            labelsData={quakes}
            labelText="id"
            labelSize={1.7}
            labelDotRadius={0.4}
            labelPositionOffset={0.15}
            labelDotOrientation={d => labelsTopOrientation.has(d.label) ? 'top' : 'bottom'}
            labelColor={d => colorScale(d.agency)}
            labelLabel={d => `
                <div><b>${d.label}</b></div>
                <div>${d.agency} - ${d.program} Program</div>
                <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
            `}
            onLabelClick={d => window.open(d.url, '_blank')}
        />
    );
}

export default Moon;
