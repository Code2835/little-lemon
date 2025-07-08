import Nav from './Nav';

function Header() {
  return (
    <header>
      <img src="/assets/logo.svg" alt="Little Lemon Logo" className="logo" />
      <Nav />
    </header>
  );
}

export default Header;