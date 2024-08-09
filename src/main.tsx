import './main.scss'

import Calculator from './Calculator'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<div id="container">
			<Calculator />
		</div>
  </StrictMode>
)
