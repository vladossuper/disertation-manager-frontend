import { MainLayout } from 'src/components/MainLayout';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { LeaderLayout } from './LeaderLayout';
import { StudentLayout } from './StudentLayout';
import { CircularProgress, Grid } from '@mui/material';

export enum Role {
  STUDENT = 'student',
  LEADER = 'leader',
}

export const DashboardContent = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <MainLayout>
      {!user ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '80vh' }}
        >
          <CircularProgress disableShrink />
        </Grid>
      ) : (
        <>
          {user.role === Role.LEADER ? <LeaderLayout /> : <StudentLayout />}
        </>
      )
      }
    </MainLayout >
  );
}
