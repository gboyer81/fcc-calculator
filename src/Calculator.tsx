import { useEffect, useState } from 'react'

import Display from './Display'
import Keypad from './Keypad'

const Calculator = () => {
  const [accValue, setAccValue] = useState<null | number>(null)
  const [screenValue, setScreenValue] = useState<string>('0')
  const [currentOperator, setCurrentOperator] = useState<string | null>(null)
  const [expectsOperand, setExpectsOperand] = useState<boolean>(false)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [screenValue])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      clearLastDigit()
    }
  }

  const clearLastDigit = () => {
    //if (screenValue.length !== '0')
    if (screenValue.length > 1) {
      setScreenValue('0')
    } else {
      setScreenValue(screenValue.substring(0, screenValue.length - 1))
    }
  }

  const handleActionToPerform = (value: string | number, keyType: string) => {
    switch (keyType) {
      case 'fx':
        handleClickFunctionKey(value.toString())
        break
      case 'numeric':
        handleClickNumericKey(value.toString())
        break
      case 'operator':
        handleClickOperator(value.toString())
        break
    }
  }

  const handleClickFunctionKey = (value: string) => {
    switch (value) {
      case 'AC':
        allClear()
        break
      case 'C':
        clearScreen()
        break
      case '+/-':
        reverseSign()
        break
      case '%':
        percentage()
        break
      case '.':
        addDecimalPoint()
        break
    }
  }

  const handleClickNumericKey = (value: string) => {
    if (expectsOperand) {
      setScreenValue(String(value))
      setExpectsOperand(false)
    } else {
      setScreenValue(screenValue === '0' ? String(value) : screenValue + value)
    }
  }

  const allClear = () => {
    setAccValue(null)
    setScreenValue('0')
    setCurrentOperator(null)
    setExpectsOperand(false)
  }

  const clearScreen = () => {
    setScreenValue('0')
  }

  const isScreenClear = screenValue === '0'

  const reverseSign = () => {
    setScreenValue(String(-parseFloat(screenValue)))
  }

  const percentage = () => {
    setScreenValue(String(parseFloat(screenValue) / 100))
  }

  const addDecimalPoint = () => {
    if (expectsOperand) {
      setScreenValue('0.')
    } else {
      if (!screenValue.includes('.')) {
        setScreenValue(screenValue + '.')
      }
    }
    setExpectsOperand(false)
  }

	const handleClickOperator = (operator: string) => {
		
		const inputValue = parseFloat(screenValue)
    if (accValue === null) {
      setAccValue(inputValue)
    } else {
			if (currentOperator) {
				console.log(currentOperator)
				const resultValue = operate(currentOperator, accValue, inputValue)
				console.log(currentOperator, accValue, inputValue, resultValue)
        setAccValue(resultValue || null)
        setScreenValue(String(resultValue))
      }
    }
    setExpectsOperand(true)
    setCurrentOperator(operator)
  }

	const operate = (operator: string, accValue: number, inputValue: number) => {
		if (operator === '+') return accValue + inputValue
		else if (operator === '-') return accValue - inputValue
		else if (operator === '×') return accValue * inputValue
		else if (operator === '/') return accValue / inputValue
		else if (operator === '=') return inputValue
	}  

  return (
    <div id="calculator-view" className={'flex column jc-center ai-center'}>
      <div id="viewport" className={'flex column jc-sp-between ai-center'}>
        <Display value={screenValue} />
        <Keypad
          actionToPerform={handleActionToPerform}
          allClear={isScreenClear}
        />
      </div>
    </div>
  )
}

export default Calculator
