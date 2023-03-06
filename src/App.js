import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Header from './components/Header';
import HomePage from './views/HomePage';

//Login
import StudentLogin from './views/Login&Reg/StudentLogin';
import HallAdminLogin from './views/Login&Reg/HallAdminLogin';
import ChiefHallAdminLogin from './views/Login&Reg/ChiefHallAdminLogin';
import PorterLogin from './views/Login&Reg/PorterLogin';

//Dashboards
import StudentDashBoard from './views/StudentDashBoard';
import ChiefHallAdminDashboard from './views/ChiefHallAdminDashboard';
import HallAdminDashboard from './views/HallAdminDashboard';
import PorterDashboard from './views/PorterDashboard';


const ROLES = {
  'Student': "Student",
  'HallAdmin': "HallAdmin",
  'ChiefHallAdmin': "ChiefHallAdmin",
  'Porter': "Porter"
}

const App = () => {
  return <>

    <Header />
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route path="/" exact element={<HomePage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/porter-login" element={<PorterLogin />} />
        <Route path="/hallAdmin-login" element={<HallAdminLogin />} />
        <Route path="/chiefHallAdmin-login" element={<ChiefHallAdminLogin />} />

        <Route path="/unauthorized" element={<Unauthorized />} />


        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
          <Route path="/student-dashboard" element={<StudentDashBoard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.HallAdmin]} />}>
          <Route path="/hallAdmin-dashboard" element={<HallAdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.ChiefHallAdmin]} />}>
          <Route path="/chiefHallAdmin-dashboard" element={<ChiefHallAdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Porter]} />}>
          <Route path="/porter-dashboard" element={<PorterDashboard />} />
        </Route>


        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>


    </Routes>

  </>
}

export default App;
