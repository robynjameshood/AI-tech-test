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

function App() {




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
              <Route path='/find-book' element={<FindBook />} />
              <Route path='/find-book-by-description' element={<FindByDescription />} />
              <Route path='/random-book' element={<Random />} />
              <Route path='/random-by-category' element={<RandomByCategory />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/logs' element={<Logs />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
