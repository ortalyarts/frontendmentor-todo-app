import './App.css'
import ToDoListDndKit from './TodoListDndKit'
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch'
import Footer from './components/footer'

function App() {


  return (
    <div className='main-container'>
      <div className='top-holder'>
        <h1>TODO</h1>
        <ThemeSwitch />
      </div>
      
      <ToDoListDndKit />
      <p className='textB'>Drag and drop to reorder list</p>
      <Footer />
    </div>
  )
}

export default App
