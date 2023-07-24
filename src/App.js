import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import NavBar from './Components/navbar';
import FindBook from './Components/findbook';
import { Route, Routes } from 'react-router-dom';
import Categories from './Components/categories';
import Logs from './Components/logs';
import Random from './Components/findRandom';
import RandomByCategory from './Components/randomByCategory';
import FindByDescription from './Components/findBookByDescription';
import FindByCategory from './Components/findBookByCategory';
import RandomByDescription from './Components/randomByDescription';
import RandomByTitle from './Components/findRandomByTitle';

function App() {
const userId = 111;

  return (
    <div className="App">
      <div className='main-container'>
        <div className='sidemenu'>
          <div className='links'>
            <NavBar />
          </div>
        </div>
        <div className='content'>
          <Routes>
            <Route>
              <Route path='/find-book' element={<FindBook userId={userId}/>} />
              <Route path='/find-book-by-description' element={<FindByDescription userId={userId}/>} />
              <Route path='/find-book-by-category' element={<FindByCategory userId={userId}/>} />
              <Route path='/random-book' element={<Random userId={userId}/>} />
              <Route path='/random-by-category' element={<RandomByCategory userId={userId}/>} />
              <Route path='/random-by-description' element={<RandomByDescription userId={userId}/>} />
              <Route path='/random-by-title' element={<RandomByTitle userId={userId}/>} />
              <Route path='/categories' element={<Categories userId={userId}/>} />
              <Route path='/logs' element={<Logs userId={userId}/>} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
