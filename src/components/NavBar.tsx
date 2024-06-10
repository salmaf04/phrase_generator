import React from 'react';
import './NavBar.css'
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <h4>
        Phrase Generator
      </h4>
      <div>
        <Link href="/">
          <button>Home</button>
        </Link>
        <Link href="/GeneratePhrase">
          <button>Generate Phrases</button>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;