import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { ListItemLink } from 'src/components/ListItemLink';

export const mainListLeaderItems = (
  <div>
    <ListItemLink icon={<DashboardIcon />} primary="Tasks" to="/tasks" />
    <ListItemLink icon={<LayersIcon />} primary="Scopes" to="/scopes" />
    <ListItemLink icon={<BarChartIcon />} primary="Analytics" to="/analytics" />
  </div>
);

export const mainListStudentItems = (
  <div>
    <ListItemLink icon={<DashboardIcon />} primary="Tasks" to="/tasks" />
  </div>
);