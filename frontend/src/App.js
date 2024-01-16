import {Routes, Route, Navigate} from "react-router-dom"
import { useState, useEffect } from "react";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import "./App.css";
import axios from "axios";
import HomeUser from "./pages/homeUser/HomeUser";
import HomeAdmin from "./pages/homeAdmin/HomeAdmin";
import AddActivity from "./pages/addActivity/AddActivity";
import Activities from "./pages/activities/Activities";
import Feedback from "./pages/feedback/Feedback";
import UserActivity from "./pages/userActivity/UserActivity";

const App = () => {

  const [user, setUser] = useState(null);

  // const modifyUser=(newUser)=>{
  //   setUser(newUser)
  // }

  const getUser = async () => {
    try {
      const url = `http://localhost:1235/api/auth/succes`;
      let {data} = await axios.get(url, {withCredentials: true});
      setUser(data.user);
      console.log(data.user)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  // console.log(user.isTeacher)

  return (
    <div className="container">
			<Routes>
        {/* <Route path='/' element={<ProtectedRoute/>}> */}
        <Route
					exact
					path="/home"
					element={user && user.isTeacher ? ( <HomeAdmin user={user} /> ) : user ? ( <HomeUser user={user}/> ) : <Navigate to="/login" />}
				/>

        {/* </Route> */}
				<Route
					exact
					path="/login"
					element={user ? <Navigate to="/home" /> : <Login />}
				/>
				<Route
					path="/signup"
					element={user ? <Navigate to="/home" /> : <Signup />}
				/>
        <Route 
          exact
          path="/addActivity"
          element={<AddActivity />}
        />
        <Route 
          exact
          path="/activities"
          element={<Activities />}
        />
        <Route 
          exact
          path="/feedback"
          element={<Feedback />}
        />
        <Route 
          exact
          path="/activity"
          element={<UserActivity />}
        />
			</Routes>
		</div>
  );
}

export default App;
