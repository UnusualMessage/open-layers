import {observer} from "mobx-react-lite";

import css from "./paginator.module.scss";

import CurrentStateStore from "../../../stores/CurrentStateStore";

const Paginator = () => {
	const onNext = () => {
		CurrentStateStore.toNextPage();
	}

	const onInput = (e) => {
		let page = e.target.value;

		if (page === "") {
			page = "1";
		}

		CurrentStateStore.toPage(Number(page));
	}

	const onPrevious = () => {
		if (CurrentStateStore.getCurrentPage() > 1) {
			CurrentStateStore.toPreviousPage();
		}
	}

	return(
		<div className={`${css.paginator}`}>
			<button onClick={onPrevious}>
				Previous
			</button>

			<input className={`${css.input}`}
			       type="number"
			       onInput={onInput}
			       value={CurrentStateStore.getCurrentPage()} min={"1"}/>

			<button onClick={onNext}>
				Next
			</button>
		</div>
	)
}

export default observer(Paginator);