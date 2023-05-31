import { useLocation, useNavigate } from 'react-router-dom';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import Container from '../../Containers/Container/Container';
// import returnIcon from '../../../assets/svg/navigation/arrow-left.svg';
import galleryIcon from '../../../assets/svg/navigation/gallery-2-1.svg';

const PicFullscreen = () => {
  const location: any = useLocation();
  const navigate = useNavigate();

  return (
    <Container
      img={location.state.picSrc}
      // backgroundColor='#000000a0'
      justifyContent="center"
    >
      <div
        style={{
          zIndex: '300',
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <ButtonNav
          icon={galleryIcon}
          optionClass={'return'}
          background={true}
          onClick={() => navigate(-1)}
        />
      </div>
    </Container>
  );
};

export default PicFullscreen;
