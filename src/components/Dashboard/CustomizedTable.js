"use client"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUsers} from "@/store/slices/usersSlice";

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersLists);

  useEffect(() => {
    dispatch(getUsers());
  },[])

  return (
    <div className='table-design'>
      <table>
        <thead>
        <tr>
          <th>Id #</th>
          <th>
            Customer name
          </th>
          <th> Contact number </th>
          <th>Gender</th>
          <th>Email</th>
          <th>Role</th>
          <th>University</th>
        </tr>
        </thead>
        <tbody>
        {(users || []).map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.university}</td>
              </tr>
            )
        })}
        </tbody>
      </table>
    </div>

  );
}