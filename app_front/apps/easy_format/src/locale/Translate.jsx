import { useTranslation } from 'react-i18next';

const Translate = (props) => {
  return useTranslation().t(props.text);
}

export default Translate;
