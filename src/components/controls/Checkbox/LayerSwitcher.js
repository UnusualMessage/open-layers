import {useState} from "react";
import {runInAction} from "mobx";

import MapStore from "../../../stores/MapStore";

const LayerSwitcher = ({text, layer, label}) => {
	const [visible, setVisible] = useState(true);

	const onChange = () => {
		runInAction(() => {
			MapStore.changeLayerVisibility(!visible, layer);
			setVisible(!visible);
		})
	}

	return(
		<div>
			<label htmlFor={label}>{text}</label>
			<input type={"checkbox"} id={label} checked={visible} onChange={onChange}/>
		</div>
	)
}

export default LayerSwitcher;