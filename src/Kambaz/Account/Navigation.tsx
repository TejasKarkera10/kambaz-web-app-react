import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();

  // Helper to determine if a link is active for styling
  const isActive = (link: string) => {
    // pathname example: "/Kambaz/Account/Signin"
    return pathname.toLowerCase().includes(link.toLowerCase());
  };

  return (
    <div
      id="wd-account-navigation"
      className="bg-white d-flex flex-column p-3"
      style={{ height: "100vh", width: "200px" }}
    >
      {links.includes("Signin") && (
        <Link
          to="/Kambaz/Account/Signin"
          className={`fw-bold text-black bg-white border-start border-4 mb-3 ps-3 py-2 text-decoration-none ${
            isActive("Signin") ? "border-black" : "border-white"
          }`}
        >
          Signin
        </Link>
      )}

      {links.includes("Signup") && (
        <Link
          to="/Kambaz/Account/Signup"
          className={`text-danger bg-white mb-3 ps-3 py-2 text-decoration-none ${
            isActive("Signup") ? "border-black border-start border-4" : ""
          }`}
        >
          Signup
        </Link>
      )}

      {links.includes("Profile") && (
        <Link
          to="/Kambaz/Account/Profile"
          className={`text-danger bg-white mb-3 ps-3 py-2 text-decoration-none ${
            isActive("Profile") ? "border-black border-start border-4" : ""
          }`}
        >
          Profile
        </Link>
      )}
           {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${isActive("Users")}`}> Users </Link> )}

    </div>
  );
}
