type Props = {
	value: string | number;
	type: string;
	buttonStyle: string;
	label: string;
	onClick: (value: string | number, type: string) => void;
}

const Button = (props: Props) => {
	const { value, type, buttonStyle, label, onClick } = props;

	const handleButtonClick = () => {
		onClick(value, type);
	}
	return (
		<button name={String(value)} className={buttonStyle} onClick={handleButtonClick}>
			{label}
		</button>
	);
};

export default Button