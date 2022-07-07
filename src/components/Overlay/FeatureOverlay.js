import {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {Overlay} from "ol";

import css from "./overlay.module.scss";

import MapStore from "../../stores/MapStore";
import {runInAction} from "mobx";

const FeatureOverlay = () => {
	const overlayRef = useRef();

	const onMouseLeave = () => {
		runInAction(() => {
			MapStore.getOverlayById(1).setPosition(undefined);
			MapStore.stopAnimation();
		})
	}

	useEffect(() => {
		const overlay = new Overlay({
			element: overlayRef.current,
			offset: [-100, -10],
			id: 1
		});

		MapStore.addOverlay(overlay);
	}, [])

	return(
		<div className={css.overlay} ref={overlayRef} onMouseLeave={onMouseLeave}>

		</div>
	);
}

export default observer(FeatureOverlay);