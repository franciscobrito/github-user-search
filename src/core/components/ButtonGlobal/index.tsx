import React from 'react';
import './styles.css';

type Props = {
  text: string;
}
const ButtonGlobal = ({ text }: Props) => (
  <button className="button-content">
    {text}
  </button>
);

export default ButtonGlobal;
