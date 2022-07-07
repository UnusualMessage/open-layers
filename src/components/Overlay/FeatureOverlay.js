import {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {Overlay} from "ol";

import css from "./overlay.module.scss";

import MapStore from "../../stores/MapStore";
import {overlayId, overlayOffset} from "../../data/mapConfig";

const FeatureOverlay = () => {
	const overlayRef = useRef();

	const onMouseLeave = () => {
		MapStore.getOverlayById(overlayId).setPosition(undefined);
		MapStore.stopAnimation();
	}

	useEffect(() => {
		const overlay = new Overlay({
			element: overlayRef.current,
			offset: overlayOffset,
			id: overlayId
		});

		MapStore.addOverlay(overlay);
	}, [])

	return(
		<div className={css.overlay} ref={overlayRef} onMouseLeave={onMouseLeave}>

		</div>
	);
}

export default observer(FeatureOverlay);