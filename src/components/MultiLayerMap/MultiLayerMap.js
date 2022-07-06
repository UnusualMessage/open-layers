import {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {View} from "ol";

import css from "./map.module.scss";

import MapStore from "../../stores/MapStore";
import {defaultCenter, defaultZoom} from "../../data/mapConfig";
import CurrentStateStore from "../../stores/CurrentStateStore";

const MultiLayerMap = ({ children }) => {
	const mapRef = useRef(null);

	useEffect(() => {
		if (MapStore.getMap() == null) {
			let zoom = CurrentStateStore.getZoom();
			let center = CurrentStateStore.getCenter();

			zoom = zoom ? zoom : defaultZoom;
			center = center ? center : defaultCenter;

			const view = new View({
				center: center,
				zoom: zoom
			});

			view.on("change:resolution", () => {
				CurrentStateStore.setZoom(view.getZoom())
				CurrentStateStore.setCenter(view.getCenter());
			});

			view.on("change:center", () => {
				CurrentStateStore.setCenter(view.getCenter());
			});

			MapStore.initMap(mapRef.current, view);
		}
	}, []);

	return(
		<div className={`${css.map}`} ref={mapRef}>
			{children}
		</div>
	);
};

export default observer(MultiLayerMap);