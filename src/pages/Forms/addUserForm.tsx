import React from "react";
import { UserForm } from "./userForm";
// import { toast } from "react-toastify";
import { addUserService } from "../../services/restApi/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
// import toast from "react-hot-toast";

export const AddUserForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    profile_picture: "",
    bio: "",
    country: "",
    password: "",
    pan_card: "",
    name_as_per_pan_card: "",
    aadhar_card: "",
    gst_number: "",
    gst_site_login: "",
    gst_site_password: "",
    is_active: true,
  });

  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [assignedTo, setAssignedTo] = React.useState<string[]>([]);

  const submitForm = async () => {
   
    // Check if 'Maker' role (represented by value "3") is selected and AssignedTo is empty
    if (selectedRoles.includes("3") && assignedTo.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please assign at least one user to the 'Assigned To' field when selecting 'Maker' as a role.",
      });

      // Remove "Maker" role (value "3") from the selectedRoles array
      setSelectedRoles(prevRoles => prevRoles.filter(role => role !== "3"));
      return; // Prevent form submission
    }

    const payload = {
      ...user,
      roles: selectedRoles,
      assigned_to: assignedTo,
    };

    const res = await addUserService(payload);
    if (res && res.id) {
      Swal.fire({
        icon: "success",
        title: "Add!",
        text: "User added successfully!",
        timer: 2000, // 2 seconds
        showConfirmButton: false, // OK button hatana
      });
      navigate("/user-tables");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login!",
        text: "Something went wrong while adding the user!",
        timer: 2000, // 2 seconds
        showConfirmButton: false, // OK button hatana
      });
    }
  };

  return (
    <div>
      <UserForm
        user={user}
        setUser={setUser}
        setSelectedRoles={setSelectedRoles}
        setAssignedTo={setAssignedTo}
        submitForm={submitForm}
      />
    </div>
  );
};
