'use client'

import { HomeOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import CashiersPage from '../cashiers/page'
const menuItems = [
  { key: 'Cashiers', label: 'Cashiers', icon: <UserOutlined/ >, component: <CashiersPage /> },
  { key: 'Dashboard', label: 'Home', icon: <HomeOutlined />, component: <div > Welcome  Home! </div>},
  { key: 'Settings', label: 'Settings', icon: <SettingOutlined />, component: <div> Settings Page </div> }
]


import Dashboard from '../../../components/Dashboard'

const Home = () => {

  return(
    <Dashboard menuItems={menuItems}/> 
  );
}


export default Home;






















// export default function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   // fetc users when the page loads
//   useEffect(() => {
//     fetchCashiers();
//   }, []); 

//   const fetchCashiers = async () => {
//     setLoading(true);

//     try{
//       const res = await fetch('/api/getCashierInfo');
//       const data = await res.json();

//       setUsers(data);
//     } catch (error) {
//       console.error('Error fetching users: ', error);
//     }
//     setLoading(false);
//   }


//   return (
//     <>
//       {loading ? <p> Loading... </p> : (
//         <ul>

//           {users.map((user) => (
//             <li key={user.id}>
//               {user.name} -- 
//               {user.shift}
//             </li>

//           ))}
//         </ul>
//       )}
//     </>


//   );

// }


