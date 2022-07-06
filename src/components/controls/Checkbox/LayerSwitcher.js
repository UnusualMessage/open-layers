import {useState} from "react";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

import css from "./switcher.module.scss";

import MapStore from "../../../stores/MapStore";

const LayerSwitcher = ({text, layerId, label}) => {
	const [visible, setVisible] = useState(true);

	const onChange = () => {
		runInAction(() => {
			MapStore.changeLayerVisibility(!visible, layerId);
			setVisible(!visible);
		})
	}

	return(
		<div className={`${css.item}`}>
			<label htmlFor={label}>{text}</label>
			<input type={"checkbox"} id={label} checked={visible} onChange={onChange}/>
		</div>
	)
}

export default observer(LayerSwitcher);