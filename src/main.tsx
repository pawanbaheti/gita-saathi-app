import {createRoot} from 'react-dom/client';import {HashRouter} from 'react-router-dom';
import {I18n} from './i18n';import App from './App';import './styles.css';
createRoot(document.getElementById('root')!).render(<I18n><HashRouter><App/></HashRouter></I18n>);
