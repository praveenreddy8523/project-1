import {Route,Routes} from 'react-router-dom';
import Home from '../Pages/Home'
import Dashboard from '../Pages/Dashboard'
import Project from '../Project';
import AddProject from '../Components/Addproject';
import Addprojecttagbyuser from '../Addprojecttagtouser';
import AuthPage from '../Login';
import { ProjectList } from '../Components/ProjectList';
import AdminHome from '../Components/AdminHome';
import AddWorkFlow from '../Components/AddWorkflow';
import WorkflowDataGrid from '../Components/WorkFlowsList';
import AddInvestor from '../Components/AddInvestor';
import { UsersList } from '../Components/UserList';
import AddInvestmentByUser from '../Components/Addinvestmentbyuser';
import ProtectedRoute from './ProtectedRoutes.jsx';
import ProjectManagement from '../Components/ProjectManagement.jsx';
import InvestorManagement from '../Components/InvestorManagement.jsx';

const AppRoutes = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage isAdmin={false} />} />
          <Route path="/adminlogin" element={<AuthPage isAdmin={true} />} />
          
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /> </ProtectedRoute>}>
              <Route
                path=""
                element={
                  <ProtectedRoute>
                    <AdminHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="project"
                element={
                  <ProtectedRoute>
                    <ProjectManagement />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ProtectedRoute>
                    <ProjectList />
                  </ProtectedRoute>} />
                <Route path='addproject'
                element={
                  <ProtectedRoute>
                    <AddProject/>
                  </ProtectedRoute>
                }/>
                <Route
                path="projects"
                element={
                  <ProtectedRoute>
                    <ProjectList />
                  </ProtectedRoute>
                }
              />
                </Route>
                <Route
                path="investor"
                element={
                  <ProtectedRoute>
                    <InvestorManagement />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ProtectedRoute>
                    <UsersList />
                  </ProtectedRoute>} />
                <Route path='addinvestor'
                element={
                  <ProtectedRoute>
                    <AddInvestor />
                  </ProtectedRoute>
                }/>
                <Route
                path="users"
                element={
                  <ProtectedRoute>
                    <UsersList />
                  </ProtectedRoute>
                }
              />
                </Route>
              <Route
                path="addproject"
                element={
                  <ProtectedRoute>
                    <AddProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="addinvestment"
                element={
                  <ProtectedRoute>
                    <AddInvestmentByUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="addprojecttag"
                element={
                  <ProtectedRoute>
                    <Addprojecttagbyuser />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="addworkflow"
                element={
                  <ProtectedRoute>
                    <AddWorkFlow />
                  </ProtectedRoute>
                }
              />
              <Route
                path="workflows"
                element={
                  <ProtectedRoute>
                    <WorkflowDataGrid />
                  </ProtectedRoute>
                }
              />
              <Route
                path="addinvestor"
                element={
                  <ProtectedRoute>
                    <AddInvestor />
                  </ProtectedRoute>
                }
              />
              <Route path="users" element={<UsersList />} />
            </Route>
          
        </Routes>
      </>
    );
  };
  
  export default AppRoutes;
  