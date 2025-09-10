import {Container, Nav, Navbar} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const MainMenu = () => {
  const navigate = useNavigate()
  const handleGroupsClick = () => {
    navigate('/groups');
  };  
  const handleFavoritesClick = () => {
    navigate('/favorit');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" ><h1>Книга контактов</h1></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/groups" onClick={handleGroupsClick}>Группы</Nav.Link>
          <Nav.Link href="/favorit" onClick={handleFavoritesClick}>Избранное</Nav.Link>
        </Nav> 
      </Container>
    </Navbar>
  );
}
