import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Fab, DialogActions, Button, Card, CircularProgress, Typography, Box, IconButton, TextField } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { deleteFile, downloadFile, getFilesForTask, uploadFile } from '../app/thunk/file';
import { User } from "src/app/slices/user";
import { Task } from "src/app/slices/task";
import { RootState } from "src/app/store";
import { setFiles } from "src/app/slices/file";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useForm } from "react-hook-form";
import { useValidationForm } from "src/app/hooks/useValidationForm";
import { createComment, deleteComment, getCommentByTask } from "src/app/thunk/comment";
import { format } from "date-fns";
import { Scope } from "src/app/slices/scope";

type MoreInfoModalProps = {
  open: boolean;
  handleClose: () => void;
  user: User;
  task: Task;
  scopes: Array<Scope>
};

type SendComment = {
  description: string;
};

const Input = styled.input`
  display: none
`;

const FileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const UploadFileWrapper = styled.div`
  margin-top: 16px;
`;

const FileName = styled.span`
  margin-left: 6px;
  margin-bottom: 2px;
`;

export const MoreInfoModal = ({ open, handleClose, user, task, scopes }: MoreInfoModalProps) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const { descriptionError } = useValidationForm({ errors });

  useEffect(() => {
    if (open) {
      dispatch(getFilesForTask({ task_id: task.task_id }));
    }
  }, [open]);

  useEffect(() => {
    return () => {
      dispatch(setFiles(null));
    };
  }, []);

  useEffect(() => {
    if (open) {
      dispatch(getCommentByTask({ task_id: task.task_id }));
    }
  }, [open]);

  const { files } = useSelector((state: RootState) => state.files);
  const { comments } = useSelector((state: RootState) => state.comments);

  const selectedFile = useCallback((event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }, [setFile, setFileName]);

  const clearFile = useCallback(() => {
    setFile(null);
    setFileName(null);
  }, [setFile, setFileName]);

  const upload = useCallback(() => {
    const data = new FormData();

    data.set('name', fileName);
    data.set('task_id', task.task_id);
    data.set('user_id', user.user_id);
    data.append('file', file);

    dispatch(uploadFile({ data }));

    clearFile()
  }, [file, fileName, uploadFile, clearFile]);

  const saveFile = useCallback(({ path, name }: { path: string; name: string }) => {
    dispatch(downloadFile({ path, name }));
  }, [downloadFile]);

  const deleteTaskFile = useCallback(({ path, file_id }: { path: string; file_id: string; }) => {
    dispatch(deleteFile({ path, task_id: task.task_id, file_id }));
  }, [deleteFile, task.task_id]);

  const onSubmitSendComment = useCallback((data: SendComment, file_id: string) => {
    dispatch(createComment({
      description: data.description,
      author: `${user.name} ${user.surname}`,
      task_id: task.task_id,
      comment_to_file: file_id,
      user_id: user.user_id
    }));

    reset();
  }, [task, user, dispatch]);

  const handleDeleteComment = useCallback(({ comment_id }: { comment_id: string }) => {
    dispatch(deleteComment({ comment_id, task_id: task.task_id }));
  }, [task]);

  const scope = useMemo(() => scopes.find((scope) => scope.scope_id === task.scope_id), [scopes, task]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="subtitle1">Task info</Typography>
      </DialogTitle>
      <Box sx={{ pl: 3, pt: 2 }}>
        <Typography variant="h5">{task.title}</Typography>
      </Box>
      <Box sx={{ pl: 3, mt: 2, display: 'flex' }}>
        <Typography>Status:</Typography>
        <Typography variant="body1" sx={{ ml: 2 }}>{task.status}</Typography>
      </Box>
      <Box sx={{ pl: 3, mt: 2, display: 'flex' }}>
        <Typography>Priority:</Typography>
        <Typography variant="body1" sx={{ ml: 2 }}>{task.priority}</Typography>
      </Box>
      {scope && (
        <Box sx={{ pl: 3, mt: 2, display: 'flex' }}>
          <Typography>Scope:</Typography>
          <Typography variant="body1" sx={{ ml: 2 }}>{scope.name}</Typography>
        </Box>
      )}
      <Box sx={{ pl: 3, mt: 2, display: 'flex' }}>
        <Typography>Description:</Typography>
        <Typography variant="body1" sx={{ ml: 2 }}>{task.description}</Typography>
      </Box>
      <Box sx={{ pl: 3, mt: 2, display: 'flex' }}>
        <Typography>Estimation:</Typography>
        <Typography variant="body1" sx={{ ml: 2 }}>{task.estimation} hours</Typography>
      </Box>

      <DialogContent>
        {
          !files ? (
            <CircularProgress disableShrink />
          ) : (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Uploaded files</Typography>
              {!files.length ? <Typography>No files</Typography> : (
                <>
                  {files.map((file) => {
                    return (
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography
                            key={file.file_id}
                            sx={{ mt: 1, cursor: 'pointer' }}
                            onClick={() => saveFile({ path: file.file_path, name: file.original_name })}>
                            <PictureAsPdfIcon color="error" sx={{ mt: 1 }} />
                            <FileName>{file.original_name}</FileName>
                          </Typography>

                          <IconButton
                            aria-label="delete"
                            size="small"
                            sx={{ mt: 2 }}
                            onClick={() => deleteTaskFile({ path: file.file_path, file_id: file.file_id })}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                        <Box sx={{ ml: 2, mt: 2 }}>
                          <Typography variant="h6">Comments to {file.original_name}</Typography>
                          {!!comments && comments.filter((comment) => comment.comment_to_file === file.file_id) &&
                            comments.filter((comment) => comment.comment_to_file === file.file_id).map((comment) => {
                              return (
                                <>
                                  <Card sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, p: 2 }}>
                                    <Box>
                                      <Box sx={{ display: 'flex' }}>
                                        <Typography variant="subtitle2">Author: {comment.author}</Typography>
                                        <Typography variant="subtitle2" sx={{ ml: 4 }}>Created at: {format(new Date(comment.creation_date), 'MM/dd/yyyy')}</Typography>
                                      </Box>
                                      <div>
                                        <Typography variant="subtitle1">{comment.description}</Typography>
                                      </div>
                                    </Box>

                                    {user.user_id === comment.user_id &&
                                      <IconButton size="small" onClick={() => handleDeleteComment({ comment_id: comment.comment_id })}>
                                        <DeleteIcon />
                                      </IconButton>
                                    }
                                  </Card>
                                </>
                              )
                            })}
                          <>
                            <Controller
                              id="description"
                              as={TextField}
                              name='description'
                              control={control}
                              onChange={args => args[0].nativeEvent.text}
                              label={`Comment to file ${file.original_name}`}
                              defaultValue=""
                              fullWidth
                              error={!!descriptionError}
                              rules={{ required: true }}
                              helperText={descriptionError}
                              margin="normal"
                              variant="standard"
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Button
                                variant="text"
                                onClick={handleSubmit((data: SendComment) => onSubmitSendComment(data, file.file_id))}
                              >
                                Send comment
                              </Button>
                            </div>
                          </>
                        </Box>
                      </Box>
                    )
                  })}
                </>
              )}
            </Box>
          )}

        <Typography variant="subtitle1" align="center" sx={{ mt: 3 }}>Upload pdf files</Typography>
        <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
          {!file || !fileName ?
            <UploadFileWrapper>
              <Input
                accept="application/pdf, application/msword"
                id="contained-button-file"
                multiple
                type="file"
                onChange={selectedFile}
              />
              <label htmlFor="contained-button-file">
                <Fab component="span">
                  <UploadFileIcon />
                </Fab>
              </label>
            </UploadFileWrapper>
            :
            <FileWrapper>
              <span>{fileName}</span>
              <CloseIcon onClick={clearFile} />
            </FileWrapper>
          }
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={upload}>Upload file</Button>
      </DialogActions>
    </Dialog >
  )
}