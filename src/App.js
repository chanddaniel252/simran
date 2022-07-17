import { Provider } from 'react-redux';
import store from './Container/Redux/store';
import Entry from './Container/Entry';
import './App.scss'

const App = () => {


  return (

    <Provider store={store}>
      
      <Entry />
    </Provider>


  )
}

export default App;
