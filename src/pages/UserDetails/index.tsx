import React, { FC, useEffect, useState } from "react";
import { Navigate, useParams,useLocation  } from "react-router";
import { updateUserService, userDetailsService } from "../../services/restApi/user";
import { UserForm } from "../Forms/userForm";
import Swal from "sweetalert2";
// import toast from "react-hot-toast";

const UserDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const hideFields = location.state?.hideFields || false;

  if (!id) return <Navigate to="/user-tables" />;

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [user, setUser] = React.useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    roles: [],
    is_active: false,
    // is_staff: false,
    // is_superuser: false,
    date_joined: "",
    last_login: "",
    created_by: {
      id: 0,
      email: "",
      first_name: "",
      last_name: "",
      full_name: "",
    },
    assigned_to: "",
  });

  const submitForm = async () => {
    const payload = {
      ...user,
      roles: selectedRoles,
      assigned_to: assignedTo,
    };
    const res = await updateUserService(payload,id);
    if (res && res.id) {
        Swal.fire({
              icon: 'error',
              title: 'Login!',
              text: "User update successfully!",
            });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login!',
        text: "Something went wrong while adding the user!",
      });
    }
  };


  useEffect(() => {
    if (!id) return;
  
    const fetchUsers = async () => {
      try {
        const res = await userDetailsService(id);
  
        if (res.id) {
          setUser(res); // ✅ Fix
          setSelectedRoles(res.roles || []);
          setAssignedTo(res.assigned_to || []);
        } else {
          console.error("Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUsers();
  }, [id]);

  return (
    <>
      <UserForm
        id={id}
        user={user}
        setUser={setUser}
        setSelectedRoles={setSelectedRoles}
        setAssignedTo={setAssignedTo}
        submitForm={submitForm}
        hideFields = {hideFields} 
      />
    </>
  );
};

export default UserDetails;
