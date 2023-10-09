import React, { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';  // Asegúrate de que esta es la forma correcta de importar Globe.
import { scaleOrdinal } from 'd3-scale';
import axios from 'axios';

import lunarSurface from './lunar_surface.jpg';
import lunarBumpmap from './lunar_bumpmap.jpg';

const Moon = ({ props }) => {

    const getDateFromDayOfYear = (year, dayOfYear) => {
        let date = new Date(year, 0); // 0 es enero
        date.setDate(dayOfYear); // Establece la fecha al día del año especificado
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }


    const resultDate = getDateFromDayOfYear(1972, 192);
    console.log(resultDate);

    const [quakes, setQuakes] = useState([]);
    const getAllQuakes = () => {
        axios.get('http://3.19.185.171:5000/api/v1/quakes')
            .then((response) => {
                console.log("Response", response.data);
                setQuakes(response.data.map(index => {
                    return {
                        id: index._id,
                        date: getDateFromDayOfYear(index.year, index.day).toString(),
                        year: index.year,
                        magnitude: index.magnitude,
                        latitude: index.latitude,
                        longitude: index.longitude,
                        time: index.hour + ':' + index.minute + ':' + index.seconds
                    }
                }))
                console.log(quakes)

            }).catch((err) => {
                console.error(err)
            })
    };
    const [landingSites, setLandingSites] = useState([]);




    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);


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
            labelText="date"
            labelLat={quakes => quakes.latitude}
            labelLng={quakes => quakes.longitude}
            labelSize={1.7}
            labelDotRadius={0.4}
            labelPositionOffset={0.15}
            //labelDotOrientation={d => labelsTopOrientation.has(d.label) ? 'top' : 'bottom'}
            labelColor={() => 'rgba(92, 0, 250,100)'}
        // labelLabel={d => `
        //     <div><b>${d.label}</b></div>
        //     <div>${d.agency} - ${d.program} Program</div>
        //     <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
        // `}
        //onLabelClick={d => window.open(d.url, '_blank')}
        />
    );
}

export default Moon;
