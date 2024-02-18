import React from "react";
import css from "./Searchbar.module.scss";

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.target[1].value);
        }}
      >
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
