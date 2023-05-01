import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BurnHub } from './components/BurnHub';
import { BrowserRouter } from 'react-router-dom';
import firebase from "firebase/compat/app"; // Import Firebase!!
import { firebaseConfig } from "./FirebaseConfig"; // Import Your Config!!

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <BurnHub />
  </BrowserRouter>
)