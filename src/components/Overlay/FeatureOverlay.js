import {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {Overlay} from "ol";

import css from "./overlay.module.scss";

import MapStore from "../../stores/MapStore";
import {runInAction} from "mobx";

const FeatureOverlay = () => {
	const overlayRef = useRef();

	const onClick = () => {
		runInAction(() => {
			MapStore.getOverlayById(1).setPosition(undefined);
			MapStore.stopAnimation();
		})
	}

	useEffect(() => {
		const overlay = new Overlay({
			element: overlayRef.current,
			id: 1
		});

		MapStore.addOverlay(overlay);
	}, [])

	return(
		<div className={css.overlay} ref={overlayRef}>
			<div className={css.header}>
				<span>Информация</span>
				<span onClick={onClick}>Закрыть</span>
			</div>
			<div>
				<span>Hello</span>
			</div>
		</div>
	);
}

export default observer(FeatureOverlay);