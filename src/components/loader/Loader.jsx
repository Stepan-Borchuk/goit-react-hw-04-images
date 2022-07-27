import { Puff } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export default function Loader() {
  return (
    <LoaderContainer>
      <Puff
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
      ;
    </LoaderContainer>
  );
}
