import React, { FC, useEffect, useState } from "react";
import { Navigate, useParams,useLocation, useNavigate  } from "react-router";
import { updateUserService, userDetailsService } from "../../services/restApi/user";
import { UserForm } from "../Forms/userForm";
import Swal from "sweetalert2";
// import toast from "react-hot-toast";

const UserDetails: FC = () => {
  const navigate = useNavigate();
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
  
    const res = await updateUserService(payload, id);
  
    // Check if response is successful and has the 'id' field
    if (res && res.id) {
      // If update is successful, show success message from API
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `User updated successfully!`, // Show success message here
        timer: 2000, // 2 seconds
        showConfirmButton: false, // OK button hatana
      });
      navigate("/user-tables");
    } else {
      // If API returns an error or fails to update, show error message
      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: res?.detail || "Something went wrong while updating the user!",
        timer: 2000, // 2 seconds
        showConfirmButton: false, // OK button hatana // Display the error message from API if available
      });
      navigate("/user-tables");
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
