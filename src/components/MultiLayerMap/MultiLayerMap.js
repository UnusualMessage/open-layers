import {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";

import css from "./map.module.scss";

import MapStore from "../../stores/MapStore";
import {defaultCenter, defaultZoom} from "../../data/mapConfig";

const MultiLayerMap = ({ children }) => {
	const mapRef = useRef(null);

	useEffect(() => {
		if (MapStore.getMap() == null) {
			let zoom = MapStore.getZoom();
			let center = MapStore.getCenter();

			zoom = zoom ? zoom : defaultZoom;
			center = center ? center : defaultCenter;

			MapStore.initMap(mapRef.current, center, zoom);
		}
	}, []);

	return(
		<div className={`${css.map}`} ref={mapRef}>
			{children}
		</div>
	);
};

export default observer(MultiLayerMap);