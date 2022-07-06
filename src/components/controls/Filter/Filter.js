import css from "./filter.module.scss";

const Filter = () => {
	const onInput = () => {
	}

	return(
		<div className={`${css.filter}`}>
			<label htmlFor={"filter"}>Поиск</label>
			<input id={"filter"} placeholder={"name"} onInput={onInput}/>
		</div>
	)
}

export default Filter;