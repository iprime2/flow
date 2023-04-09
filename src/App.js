import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Flow from './components/Flow/Flow'
import WorkFlow from './pages/WorkFlow/WorkFlow'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/flow/:id' element={<WorkFlow />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
