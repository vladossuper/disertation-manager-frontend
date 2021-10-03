import { CircularProgress, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import Chart from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "src/app/slices/task";
import { RootState } from "src/app/store";
import { getScopes } from "src/app/thunk/scope";
import { Status, tasksCreatedByLeader } from "src/app/thunk/task";
import { MainLayout } from "src/components/MainLayout";

type DataType = Array<Array<{ type: string; label: string }> | Array<string | number | Date | null>>;

export const Analytics = () => {
  const dispatch = useDispatch();

  const { user_id } = useSelector((state: RootState) => state.auth);
  const { scopes } = useSelector((state: RootState) => state.scope);
  const { tasks } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    dispatch(getScopes());
    dispatch(tasksCreatedByLeader({ user_id }));
  }, []);

  const scopesFilteredByUser = useMemo(() => !!scopes ? scopes.filter((scope) => scope.created_by_user === user_id) : [], [user_id, scopes]);

  const calculateCompletedPercent = useCallback(({ tasks, scope_id }: { tasks: Array<Task>, scope_id: string }) => {
    if (!tasks) {
      return 0;
    }

    const filteredTasksByScope = tasks.filter((task) => task.scope_id === scope_id);
    const completedTasks = filteredTasksByScope.filter((task) => task.status === Status.DONE);

    return completedTasks.length === 0 && filteredTasksByScope.length === 0 ? 0 : (completedTasks.length / filteredTasksByScope.length) * 100;
  }, []);

  const chartData = useMemo(() => {
    const data: DataType = [[
      { type: 'string', label: 'Scope ID' },
      { type: 'string', label: 'Scope Name' },
      { type: 'string', label: 'Resource' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ]];

    scopesFilteredByUser.forEach((scope) => {
      data.push([
        scope.scope_id,
        scope.name,
        scope.name,
        new Date(scope.date_start),
        new Date(scope.date_end),
        null,
        calculateCompletedPercent({ tasks, scope_id: scope.scope_id }),
        null
      ]);
    })

    return data;
  }, [scopesFilteredByUser, tasks]);

  if (!scopes || !tasks) {
    return (
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
    )
  }

  if (chartData.length === 1) {
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Typography>No Data</Typography>
    </Grid>
  }

  return (
    <MainLayout>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          height: 400,
          gantt: {
            trackHeight: 30,
          },
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    </MainLayout>
  )
}