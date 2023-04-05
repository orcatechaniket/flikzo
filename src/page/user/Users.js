import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getData = () => {
    fetch("https://www.flikzo.in/api/auth")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.userList);
        setFilteredUsers(data.userList);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => getData(), []);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (event) => {
    console.log(users);
    const query = event.target.value;
    if (users.length > 0) {
      const filtered = users?.filter(
        (user) =>
          user?.phone?.toString().includes(query) ||
          user?.email?.includes(query)
      );
      setFilteredUsers(filtered);
    }
    // console.log(filtered);
  };

  return (
    <div>
      <h1 className="text-center">List of All Users</h1>
      <div className="input-group mb-3" >
        <input
          type="text"
          className="form-control w-25"
          
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            {/* <th scope="col">Bill</th>
            <th scope="col">Operations</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
