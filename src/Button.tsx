type Props = {
	value: string | number;
	type: string;
	buttonStyle: string;
	label: string;
	onClick: (value: string | number, type: string) => void;
}

const Button = ({ value, type, buttonStyle, label, onClick }: Props) => {
	
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