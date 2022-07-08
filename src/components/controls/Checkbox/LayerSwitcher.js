import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

import css from "./switcher.module.scss";

import MapStore from "../../../stores/MapStore";
import CurrentStateStore from "../../../stores/CurrentStateStore";

const LayerSwitcher = ({text, layerId, label}) => {
	const onChange = () => {
		runInAction(() => {
			MapStore.stopAnimation();
			const visible = CurrentStateStore.getLayerStateById(layerId);
			MapStore.changeLayerVisibility(!visible, layerId);
			CurrentStateStore.addLayerState(!visible, layerId);
		})
	}

	return(
		<div className={`${css.item}`}>
			<input type={"checkbox"}
			       id={label}
			       checked={CurrentStateStore.getLayerStateById(layerId)}
			       onChange={onChange}/>
			<label htmlFor={label}>{text}</label>
		</div>
	)
}

export default observer(LayerSwitcher);