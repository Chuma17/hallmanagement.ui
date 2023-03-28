// import './App.css';
import { Routes, Route } from 'react-router-dom';

//Components
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import HeaderForLogin from './components/HeaderForLogin';

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
import HallAdminAccount from './views/Accounts/HallAdminAccount';

//Singles
import SingleHall from './views/Singles/SingleHall';
import SingleExitPass from './views/Singles/SingleExitPass';
import SingleStudentExitPass from './views/Singles/SingleStudentExitPass';
import SingleSelectHall from './views/Selection&Singles/SingleSelectHall';
import SingleSelectBlock from './views/Selection&Singles/SingleSelectBlock';
import SingleSelectRoom from './views/Selection&Singles/SingleSelectRoom';

//Views
import HomePage from './views/HomePage';
import StudentDevices from './views/StudentDevices';
import AddStudentDevice from './views/AddStudentDevice';
import StudentExitPass from './views/ExitPass/StudentExitPass';
import AddExitPass from './views/ExitPass/AddExitPass';
import Selection from './views/Selection&Singles/Selection';
import HallTypeSelection from './views/Selection&Singles/HallTypeSelection';
import HallSelection from './views/Selection&Singles/HallSelection';
import BlockSelection from './views/Selection&Singles/BlockSelection';
import RoomSelection from './views/Selection&Singles/RoomSelection';
import AddComplaintForm from './views/ComplaintForm/AddComplaintForm';
import HallTypes from './views/HallTypes';
import AddHallType from './views/AddHallType';
import Halls from './views/Halls';
import AddHall from './views/AddHall';
import HallAdminForHall from './views/Singles/HallAdminForHall';
import HallAdmins from './views/HallAdmins';
import HallAdminRegistration from './views/Login&Reg/HallAdminRegistration';
import Porters from './views/Porters';
import PorterRegistration from './views/Login&Reg/PorterRegistration';
import Blocks from './views/Blocks';
import AddBlock from './views/AddBlock';
import Rooms from './views/Rooms';
import Notifications from './views/Notifications';
import HallAdminNotifications from './views/HallAdminNotification';
import AddNotification from './views/AddNotification';
import ExitPasses from './views/ExitPass/ExitPasses';
import UnapprovedExitPasses from './views/ExitPass/UnapprovedExitPasses';
import ApprovedExitPasses from './views/ExitPass/ApprovedExitPasses';
import StudentsInHall from './views/StudentsInHall';
import ComplaintForms from './views/ComplaintForm/ComplaintForms';
import RoomsForComplaint from './views/ComplaintForm/RoomsForComplaint';
import ComplaintsInRoom from './views/ComplaintForm/ComplaintsInRoom';
import StudentsDue from './views/ExitPass/StudentsDue';
import StudentsOverDue from './views/ExitPass/StudentsOverDue';
import ComplaintsInHall from './views/ComplaintForm/ComplaintsInHall';
import ExitPassesInHall from './views/ExitPass/ExitPassesInHall';

const ROLES = {
  'Student': "Student",
  'HallAdmin': "HallAdmin",
  'ChiefHallAdmin': "ChiefHallAdmin",
  'Porter': "Porter"
}

const App = () => {
  return <>

    <HeaderForLogin />
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route path="/" exact element={<HomePage />} />
        <Route path="/student-login" element={<StudentLogin />} />        
        <Route path="/student-registration" element={<StudentRegistration />} />        
        <Route path="/porter-login" element={<PorterLogin />} />
        <Route path="/hallAdmin-login" element={<HallAdminLogin />} />
        <Route path="/chiefHallAdmin-login" element={<ChiefHallAdminLogin />} />
        <Route path="/view-hall/:id" element={<SingleHall />} />
        <Route path="/hallAdmin-for-fall/:id" element={<HallAdminForHall />} />
        <Route path="/notifications" element={<Notifications />} />
        

        <Route path="/unauthorized" element={<Unauthorized />} />


        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>

          <Route path="/student-dashboard" element={<StudentDashBoard />} />
          <Route path="/student-devices" element={<StudentDevices />} />
          <Route path="/student-exit-passes" element={<StudentExitPass />} />
          <Route path="/view-student-exitPass/:id" element={<SingleStudentExitPass />} />
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
          <Route path="/edit-student-account/:id" element={<StudentAccount />} />          

        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Student, ROLES.HallAdmin, ROLES.Porter]} />}>
          
          <Route path="/view-admin-exitPass/:id" element={<SingleExitPass />} />
        
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.HallAdmin]} />}>

          <Route path="/hallAdmin-dashboard" element={<HallAdminDashboard />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/add-block" element={<AddBlock />} />
          <Route path="/view-rooms-in-block/:id" element={<Rooms />} />
          <Route path="/hallAdmin-notifications" element={<HallAdminNotifications />} />
          <Route path="/exit-passes" element={<ExitPasses />} />
          <Route path="/all-exitPasses" element={<ExitPassesInHall />} />
          <Route path="/pending-exitPass" element={<UnapprovedExitPasses />} />
          <Route path="/approved-exitPass" element={<ApprovedExitPasses />} />
          <Route path="/add-notification" element={<AddNotification />} />
          <Route path="/students" element={<StudentsInHall />} />
          <Route path="/complaint-forms" element={<ComplaintForms />} />
          <Route path="/all-complaints" element={<ComplaintsInHall />} />
          <Route path="/view-complaintRooms/:id" element={<RoomsForComplaint />} />
          <Route path="/view-complaints/:id" element={<ComplaintsInRoom />} />
          <Route path="/students-due" element={<StudentsDue />} />
          <Route path="/students-overdue" element={<StudentsOverDue />} />
          <Route path="/edit-hallAdmin-account/:id" element={<HallAdminAccount />} />          


        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.ChiefHallAdmin]} />}>
          
          <Route path="/chiefHallAdmin-dashboard" element={<ChiefHallAdminDashboard />} />
          <Route path="/hall-types" element={<HallTypes />} />
          <Route path="/add-hall-type" element={<AddHallType />} />
          <Route path="/add-hall" element={<AddHall />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/hall-admins" element={<HallAdmins />} />
          <Route path="/add-hallAdmin" element={<HallAdminRegistration />} />
          <Route path="/porters" element={<Porters />} />
          <Route path="/add-porter" element={<PorterRegistration />} />

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
