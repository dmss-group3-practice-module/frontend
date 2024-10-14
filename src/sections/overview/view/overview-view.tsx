import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { OrderTimeline } from '../analytics-order-timeline';

import { useAuth } from 'src/context/AuthContext';

export function OverviewView() {
  const { user } = useAuth();

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back {user?.displayName} 👋
      </Typography>

      <Grid>
        <Grid xs={12} md={6} lg={4}>
          <OrderTimeline title="Order timeline" list={_timeline} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
