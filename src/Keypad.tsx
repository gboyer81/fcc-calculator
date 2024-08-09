import Button from './Button'
type Props = {
	actionToPerform: (value: string | number, keyType: string) => void;
	allClear: boolean;
}
const Keypad = (props: Props) => {
	const { actionToPerform, allClear } = props

	const numericKeys = [7, 8, 9, 4, 5, 6, 1, 2, 3]
  
  const operatorKeys = [
    { label: "÷", value: "/" },
    { label: "×", value: "×" },
    { label: "−", value: "-" },
    { label: "+", value: "+" },
    { label: "=", value: "=" }
  ]
  
const functionKeys: { label: string; value: string; buttonStyle: string }[] = [
  { label: allClear ? "AC" : "C", value: allClear ? "AC" : "C", buttonStyle: "fx-key" },
  { label: "±", value: "+/-", buttonStyle: "fx-key" },
  { label: "%", value: "%", buttonStyle: "fx-key" }
]
  
  const lastRowKeys = [
    { label: "0", value: "0", type: "numeric", buttonStyle: "numeric-key special" },
    { label: ".", value: ".", type: "fx", buttonStyle: "numeric-key" }
  ]

	const handleClickButton = (value: string | number, keyType: string) => {
		actionToPerform(value, keyType)
	}
	
	return (
		<div id="keypad" className="flex row jc-sp-around">
			<div className="grid">
				{functionKeys.map((fnKey) => (
					<Button
						key={fnKey.label}
						label={fnKey.label}
						value={fnKey.value}
						buttonStyle={fnKey.buttonStyle}
						onClick={handleClickButton}
						type="fx"
					/>
				))}
				{numericKeys.map((numKey) => (
					<Button
						key={numKey}
						label={numKey.toString()} // Convert numKey to a string
						value={numKey}
						buttonStyle="numeric-key"
						onClick={handleClickButton}
						type="numeric"
					/>
				))}
				{lastRowKeys.map((lrKey) => (
					<Button
						key={lrKey.label}
						label={lrKey.label}
						value={lrKey.value}
						buttonStyle={lrKey.buttonStyle}
						onClick={handleClickButton}
						type={lrKey.type}
					/>
				))}
			</div>
			<div className="flex column jc-sp-btw">
				{operatorKeys.map((opKey) => (
					<Button
						key={opKey.label}
						label={opKey.label}
						value={opKey.value}
						buttonStyle="op-key"
						onClick={handleClickButton}
						type="operator"
					/>
				))}
			</div>
		</div>
	)
}

export default Keypad