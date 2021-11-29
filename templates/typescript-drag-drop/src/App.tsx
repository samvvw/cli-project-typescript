import './style.scss'
import style from './stile.module.scss'
import DragBox from './components/DragBox'

function App(): JSX.Element {
    return (
        <div className={style.classTest}>
            <h1>Welcome to Coffee Connect by Javalimos the best team ever</h1>
            <DragBox />
        </div>
    )
}

export default App
