import './index.scss';
import './component/App';

window.onload = () => {
  try {
    document.body.appendChild(document.createElement('my-app'));

  } catch (e) {
    console.error(e);
  }
};
