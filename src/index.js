import './index.scss';
import { MyApp } from './component/App';

window.addEventListener('load', () => {
  try {
    document.body.appendChild(new MyApp());

  } catch (e) {
    console.error(e);
  }
});
