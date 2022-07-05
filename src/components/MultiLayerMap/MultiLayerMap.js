import {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";

import css from "./map.module.scss";

import MapStore from "../../stores/MapStore";
import {defaultCenter, defaultZoom} from "../../data/mapConfig";

const MultiLayerMap = ({ children }) => {
	const mapRef = useRef(null);

	useEffect(() => {
		if (MapStore.getMap() == null) {
			MapStore.initMap(mapRef.current, defaultCenter, defaultZoom);
		}
	}, []);

	return(
		<div className={`${css.map}`} ref={mapRef}>
			{children}
		</div>
	);
};

export default observer(MultiLayerMap);