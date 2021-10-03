import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/app/store";
import { getScopes } from "src/app/thunk/scope";
import { CreateScopeModal } from "src/components/CreateScopeModal";
import { MainLayout } from "src/components/MainLayout"
import { ScopeCard } from "src/components/ScopeCard";
import { TypeOfScopeModal } from "src/components/TypeOfScopeModal";

export const Scopes = () => {
  const [openCreateScopeModal, setCreateScopeModal] = useState(false);
  const [openScopeType, setOpenScopeType] = useState(false);

  const dispatch = useDispatch();

  const { scopes } = useSelector((state: RootState) => state.scope);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getScopes());
  }, []);

  const toggleCreateScopeModal = useCallback(() => {
    setCreateScopeModal(!openCreateScopeModal);
  }, [openCreateScopeModal, setCreateScopeModal]);

  const toggleTypeOfScopeModal = useCallback(() => {
    setOpenScopeType(!openScopeType);
  }, [openScopeType, setOpenScopeType]);

  return (
    <MainLayout>
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button variant="contained" onClick={toggleCreateScopeModal} sx={{ ml: 2 }}>Create scope</Button>
          <Button variant="contained" onClick={toggleTypeOfScopeModal} sx={{ ml: 2 }}>Choose type of dissertation</Button>
        </Box>

        <CreateScopeModal open={openCreateScopeModal} toggleCreateScopeModal={toggleCreateScopeModal} user={user} />
        <TypeOfScopeModal open={openScopeType} toggleTypeOfScopeModal={toggleTypeOfScopeModal} />
      </Grid>

      <Grid lg={12}>
        {!scopes ? <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '80vh' }}
        >
          <CircularProgress disableShrink />
        </Grid> :
          <>
            {scopes.map((scope) => (
              <ScopeCard key={scope.scope_id} scope={scope} />
            ))}
          </>
        }
      </Grid>
    </MainLayout>
  )
}