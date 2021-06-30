import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './pages/Home'
import NewRoom from './pages/NewRoom'
import { Room } from './pages/Room'
import { AdminRoom } from './pages/AdminRoom'

import { AuthContextPRovider } from './contexts/AuthContext';


function App() {
 
  return (
    <BrowserRouter>
    <AuthContextPRovider>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/rooms/newroom' exact component={NewRoom}/>
        <Route path='/rooms/:id' component={Room}/>
        <Route path='/admin/rooms/:id' component={AdminRoom} />
      </Switch>
    </AuthContextPRovider>
    </BrowserRouter>
  );
}

export default App;
