type Props = {
	value: string | number;
}

const Display = (props: Props) => {
	const { value } = props
	return (
		<div id="display" className="flex">
			<input type="text" tabIndex={-1} value={value} readOnly />
		</div>
	)
}

export default Display