import './App.css';
import { Routes, Route } from 'react-router-dom';

//Components
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Header from './components/Header';

//Login
import StudentLogin from './views/Login&Reg/StudentLogin';
import HallAdminLogin from './views/Login&Reg/HallAdminLogin';
import ChiefHallAdminLogin from './views/Login&Reg/ChiefHallAdminLogin';
import PorterLogin from './views/Login&Reg/PorterLogin';

//Registration
import StudentRegistration from './views/Login&Reg/StudentRegistration';

//Dashboards
import StudentDashBoard from './views/DashBoards/StudentDashBoard';
import ChiefHallAdminDashboard from './views/DashBoards/ChiefHallAdminDashboard';
import HallAdminDashboard from './views/DashBoards/HallAdminDashboard';
import PorterDashboard from './views/DashBoards/PorterDashboard';

//Accounts
import StudentAccount from './views/Accounts/StudentAccount';

//Singles
import SingleHall from './views/Singles/SingleHall';


//Views
import HomePage from './views/HomePage';
import StudentDevices from './views/StudentDevices';
import AddStudentDevice from './views/AddStudentDevice';
import StudentExitPass from './views/StudentExitPass';
import AddExitPass from './views/AddExitPass';
import SingleExitPass from './views/Selection&Singles/SingleExitPass';
import Selection from './views/Selection&Singles/Selection';
import HallTypeSelection from './views/Selection&Singles/HallTypeSelection';
import HallSelection from './views/Selection&Singles/HallSelection';
import SingleSelectHall from './views/Selection&Singles/SingleSelectHall';
import BlockSelection from './views/Selection&Singles/BlockSelection';
import SingleSelectBlock from './views/Selection&Singles/SingleSelectBlock';
import RoomSelection from './views/Selection&Singles/RoomSelection';
import SingleSelectRoom from './views/Selection&Singles/SingleSelectRoom';
import AddComplaintForm from './views/AddComplaintForm';
import HallTypes from './views/HallTypes';
import AddHallType from './views/AddHallType';
import Halls from './views/Halls';
import AddHall from './views/AddHall';


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
        <Route path="/student-registeration" element={<StudentRegistration />} />        
        <Route path="/porter-login" element={<PorterLogin />} />
        <Route path="/hallAdmin-login" element={<HallAdminLogin />} />
        <Route path="/chiefHallAdmin-login" element={<ChiefHallAdminLogin />} />
        <Route path="/view-hall/:id" element={<SingleHall />} />

        <Route path="/unauthorized" element={<Unauthorized />} />


        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>

          <Route path="/student-dashboard" element={<StudentDashBoard />} />
          <Route path="/student-devices" element={<StudentDevices />} />
          <Route path="/student-exit-passes" element={<StudentExitPass />} />
          <Route path="/add-device" element={<AddStudentDevice />} />
          <Route path="/student-complaint-form" element={<AddComplaintForm />} />
          <Route path="/add-exit-pass" element={<AddExitPass />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/select-hall" element={<HallTypeSelection />} />
          <Route path="/halls/:id" element={<HallSelection />} />
          <Route path="/select-block" element={<BlockSelection />} />
          <Route path="/select-room" element={<RoomSelection />} />
          <Route path="/view-select-hall/:id" element={<SingleSelectHall />} />
          <Route path="/view-select-block/:id" element={<SingleSelectBlock />} />
          <Route path="/view-select-room/:id" element={<SingleSelectRoom />} />          
          <Route path="/edit-account/:id" element={<StudentAccount />} />          

        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Student, ROLES.HallAdmin, ROLES.Porter]} />}>
          <Route path="/view-exitPass/:id" element={<SingleExitPass />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.HallAdmin]} />}>
          <Route path="/hallAdmin-dashboard" element={<HallAdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.ChiefHallAdmin]} />}>
          <Route path="/chiefHallAdmin-dashboard" element={<ChiefHallAdminDashboard />} />
          <Route path="/hall-types" element={<HallTypes />} />
          <Route path="/add-hall-type" element={<AddHallType />} />
          <Route path="/add-hall" element={<AddHall />} />
          <Route path="/halls" element={<Halls />} />
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
