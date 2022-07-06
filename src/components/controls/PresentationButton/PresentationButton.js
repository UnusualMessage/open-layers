import {observer} from "mobx-react-lite";

import css from "./button.module.scss";
import MapStore from "../../../stores/MapStore";
import ObjectsStore from "../../../stores/ObjectsStore";

const PresentationButton = () => {
	const onClick = () => {
		MapStore.startTour(ObjectsStore.objects[0].object);
	}

	return(
		<button className={`${css.button}`} onClick={onClick}>
			Презентация
		</button>
	);
}

export default observer(PresentationButton);