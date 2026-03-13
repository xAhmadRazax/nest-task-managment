import React from "react";
import Container from "./Container";
import { Link } from "react-router";
import NavLinks from "./NavLinks";

export const Header = () => {
  return (
    <header className="bg-emerald-200/70 h-14 ">
      <Container className="flex items-center justify-between ">
        <Link to="/" className="text-xl font-semibold text-emerald-800">
          <h1>React Nest ToDos</h1>
        </Link>
        <NavLinks />
      </Container>
    </header>
  );
};
