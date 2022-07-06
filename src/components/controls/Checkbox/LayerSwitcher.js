import {useState} from "react";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

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
		<div>
			<label htmlFor={label}>{text}</label>
			<input type={"checkbox"} id={label} checked={visible} onChange={onChange}/>
		</div>
	)
}

export default observer(LayerSwitcher);