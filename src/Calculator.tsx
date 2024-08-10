import { useEffect, useState } from 'react'

import Display from './Display'
import Keypad from './Keypad'

const Calculator = () => {
  const [accValue, setAccValue] = useState<null | number>(null)
  const [screenValue, setScreenValue] = useState<string>('0')
  const [currentOperator, setCurrentOperator] = useState<string | null>(null)
  const [expectsOperand, setExpectsOperand] = useState<boolean>(false)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      clearLastDigit()
    }
  }

  const clearLastDigit = () => {
    if (screenValue.length === 1) {
      setScreenValue('0')
    } else {
      setScreenValue(screenValue.substring(0, screenValue.length - 1))
    }
	}
	
	useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [screenValue])

	const handleActionToPerform = (value: string | number, keyType: string) => {
		if (keyType === 'fx') return handleClickFunctionKey(String(value))
		if (keyType === 'numeric') return handleClickNumericKey(String(value))
		if (keyType === 'operator') return handleClickOperator(String(value))
	}
	
	const handleClickFunctionKey = (value: string) => {
		if (value === 'AC') return allClear()
		if (value === 'C') return clearScreen()
		if (value === '+/-') return reverseSign()
		if (value === '%') return percentage()
		if (value === '.') return addDecimalPoint()  
  }

  const handleClickNumericKey = (value: string) => {
    if (expectsOperand) {
      setScreenValue(String(value))
      setExpectsOperand(false)
    } else {
      setScreenValue(screenValue === '0' ? String(value) : `${screenValue}${value}`)
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
        setScreenValue(`${screenValue}.`)
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
				const resultValue = operate(currentOperator, accValue, inputValue)
        setAccValue(resultValue || null)
        setScreenValue(String(resultValue))
      }
    }
    setExpectsOperand(true)
    setCurrentOperator(operator)
  }

	const operate = (operator: string, accValue: number, inputValue: number) => {
		if (operator === '+') return accValue + inputValue
		if (operator === '-') return accValue - inputValue
		if (operator === '×') return accValue * inputValue
		if (operator === '/') return accValue / inputValue
		if (operator === '=') return inputValue
	}  

  return (
    <div id="calc-view" className='flex column flex-end align-center'>
      <div id="viewport" className='flex column flex-end bottom-pad-lg align-center'>
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
