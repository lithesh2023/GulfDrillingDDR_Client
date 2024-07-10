import * as React from 'react';
import Well from './components/Well';
import Operation from './components/Operation'
import Login from './components/Login';
import Registration from './components/Registration';
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './components/UserProfile';
import CrewList from './components/CrewList';
import POBList from './components/POBList';
import Fuel from './components/Fuel';
import Layout from './components/Layout';


export default function App() {
  return (
                  <Routes>
                    <Route path="/" element={<Layout/>}>
                      <Route path="Login" element={<Login />} />
                      <Route path="Register" element={<Registration />} />
                      <Route path="/" element={<PrivateRoute />}>
                        <Route path="/" element={<Dashboard/>} />
                        <Route path="Well" element={<Well />} />
                        <Route path="Operation/:id" element={<Operation />} />
                        <Route path="Employees" element={<div><POBList></POBList><CrewList></CrewList></div>} />
                        <Route path="Profile" element={<UserProfile></UserProfile>} />
                        <Route path="Fuel" element={<Fuel></Fuel>} />
                      </Route>
                    </Route>
                  </Routes>
  );
}