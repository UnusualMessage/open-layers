import {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {View} from "ol";

import css from "./map.module.scss";

import MapStore from "../../stores/MapStore";
import CurrentStateStore from "../../stores/CurrentStateStore";

const MultiLayerMap = ({ children }) => {
	const mapRef = useRef(null);

	useEffect(() => {
		if (MapStore.getMap() == null) {
			let zoom = CurrentStateStore.getZoom();
			let center = CurrentStateStore.getCenter();

			const view = new View({
				center: center,
				zoom: zoom
			});

			const onZoomChange = () => {
				CurrentStateStore.setZoom(view.getZoom())
				CurrentStateStore.setCenter(view.getCenter());
			}

			const onCenterChange = () => {
				CurrentStateStore.setCenter(view.getCenter());
			}

			view.on("change:resolution", onZoomChange);
			view.on("change:center", onCenterChange);

			MapStore.initMap(mapRef.current, view);

			return () => {
				view.un("change:center", onCenterChange);
				view.un("change:resolution", onZoomChange);
			}
		}
	}, []);

	return(
		<div className={`${css.map}`} ref={mapRef}>
			{children}
		</div>
	);
};

export default observer(MultiLayerMap);