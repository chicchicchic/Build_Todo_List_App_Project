import { attach } from "../store.js"
import App from '../component/App.js'


// attach cái View vào index.html của mình
attach(App, document.getElementById('root'))