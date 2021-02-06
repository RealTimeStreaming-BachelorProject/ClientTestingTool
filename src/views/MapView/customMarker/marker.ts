import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: 'map-marker.png',
    iconSize: [50,50],
    className: 'leaflet-div-icon'
});

export { iconPerson };