import React from "react";

interface Props {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CATEGORIES = [
  "War",
  "Art",
  "Science",
  "Politics",
  "Religion",
  "Sports",
  "Other",
];

function Filter({ setSelectedCategory }: Props) {
  const [theme, setTheme] = React.useState("dark-theme");

  const changeTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="filter">
      <div className="filter__select">
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="theme-toggler">
        <input
          type="checkbox"
          id="theme-toggler__checkbox"
          className="theme-toggler__checkbox"
        />
        <label
          htmlFor="theme-toggler__checkbox"
          className="theme-toggler__label"
          onClick={changeTheme}
        >
          Toggle
        </label>
      </div>
    </div>
  );
}

export default Filter;
