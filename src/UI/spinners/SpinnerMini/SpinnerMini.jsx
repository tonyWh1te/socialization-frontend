import { spinnerMini } from '../../../assets';
import styles from './SpinnerMini.module.css';

const SpinnerMini = ({ className }) => (
  <img
    className={`${styles.spinner} ${className}`}
    src={spinnerMini}
    alt="spinner"
  />
);

export default SpinnerMini;
