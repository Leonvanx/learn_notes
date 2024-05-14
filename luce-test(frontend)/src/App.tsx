import { useState, useEffect } from "react";
import "./App.css";
import { IUser, ICountry } from "./user";

function App() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [filteredGender, setFilteredGender] = useState<string>("All");
  const [isUserListVisible, setUserListVisible] = useState<boolean>(true);
  // const a = 1;
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data: { results: IUser[] }) => {
        const countriesData = data.results.reduce<{ [key: string]: IUser[] }>(
          (acc, user) => {
            const country = user.location.country;
            if (!acc[country]) {
              acc[country] = [];
            }
            acc[country].push(user);
            return acc;
          },
          {}
        );

        const sortedCountries: ICountry[] = Object.entries(countriesData)
          .map(([country, users]) => ({ country, users }))
          .sort((a, b) => b.users.length - a.users.length);

        setCountries(sortedCountries);
      });
  }, []);

  const handleCountryClick = (country: ICountry) => {
    if (selectedCountry && selectedCountry.country === country.country) {
      setSelectedCountry(null);
      setUserListVisible(false);
    } else {
      const sortedUsers = country.users.sort(
        (a, b) =>
          new Date(b.registered.date).getTime() -
          new Date(a.registered.date).getTime()
      );
      setSelectedCountry({ ...country, users: sortedUsers });
      setUserListVisible(true);
    }
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredGender(event.target.value);
  };

  const UsersList = () => {
    if (!selectedCountry || !isUserListVisible) return null;

    let users = selectedCountry.users;

    if (filteredGender !== "All") {
      users = users.filter((user) => user.gender === filteredGender);
    }
    if (users.length === 0) {
      return <div style={{ marginTop: "20px" }}>No users found...</div>;
    }
    return (
      <ul>
        {users.map((user) => (
          <li key={user.login.uuid} className="user-card">
            <div>
              Name: {user.name.first} {user.name.last}
            </div>
            <div>Gender: {user.gender}</div>
            <div>City: {user.location.city}</div>
            <div>State: {user.location.state}</div>
            <div>
              Registered Date:{" "}
              {new Date(user.registered.date).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <div className="countries-list">
        {countries.map((countryItem) => (
          <div
            key={countryItem.country}
            onClick={() => handleCountryClick(countryItem)}
            className="country-card"
          >
            {countryItem.country} (Users:{countryItem.users.length})
          </div>
        ))}
      </div>
      <div className="filters">
        <label>Filter by Gender:</label>
        <select value={filteredGender} onChange={handleGenderChange}>
          <option value="All">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="users-list">{UsersList()}</div>
    </div>
  );
}

export default App;
