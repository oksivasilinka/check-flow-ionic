import './index.css'
import { createRoot } from 'react-dom/client'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { App, store } from 'app'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

serviceWorker.unregister()
