import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { PasswordInterface } from '../Interfaces/Interfaces';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function generatePassword(length: number): string {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const characters = '!@#$%^&*()_-+=<>?';

  if (length < 4) return digits.substring(0, length);
  const txt = uppercaseLetters + lowercaseLetters + digits + characters;

  const passwordArray = [
    uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)],
    lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)],
    digits[Math.floor(Math.random() * digits.length)],
    characters[Math.floor(Math.random() * characters.length)]
  ];

  const remainingLength = length - 4;
  for (let i = 0; i < remainingLength; i++) {
    passwordArray.push(txt[Math.floor(Math.random() * txt.length)]);
  }

  return passwordArray.sort(() => Math.random() - 0.5).join('');
}

export default function PasswordModal({ passwordData, openPasswordModal, setOpenPasswordModal }:
  { passwordData: PasswordInterface, openPasswordModal: boolean, setOpenPasswordModal: any }) {

  const [passwordLocalData, setPasswordLocalData] = React.useState<PasswordInterface>(passwordData);


  const CreatePassword = async () => {

  }

  const UpdatePassword = async () => {

  }

  const DeletePassword = async () => {
    
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === 'length') {
      name = 'password';
      value = generatePassword(parseInt(value));
    }
    setPasswordLocalData((prev) => ({ ...prev, [name]: value }));
  }


  React.useEffect(() => setPasswordLocalData(passwordData), [passwordData]);
  return (
    <div>
      <Modal
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {passwordLocalData.id == -1 ? "Insert Password" : "Update Password"}
          </Typography>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              name="website"
              value={passwordLocalData.website}
              onChange={handlePasswordChange}
              label="Website"
              type="text"
              id="website"
              autoComplete="current-website"
            />
            <TextField
              margin="normal"
              required
              style={{ width: '50%' }}
              name="username"
              value={passwordLocalData.username}
              onChange={handlePasswordChange}
              label="Username"
              type="text"
              id="username"
              autoComplete="current-username"
            />
            <TextField
              margin="normal"
              style={{ width: '50%' }}
              name="length"
              value={passwordLocalData.password.length}
              onChange={handlePasswordChange}
              label="Password Length"
              type="text"
              id="length"
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              value={passwordLocalData.password}
              onChange={handlePasswordChange}
              type="text"
              id="password"
            />
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box>
              <Button
                onClick={passwordLocalData.id === -1 ? CreatePassword : UpdatePassword}
                variant="contained" color="primary">
                {passwordLocalData.id === -1 ? "Insert" : "Update"}
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                variant="contained"
                color="warning" onClick={() => setOpenPasswordModal(false)}>
                Cancel
              </Button>
            </Box>
            <Button
              variant="contained"
              color="error"
              disabled={passwordLocalData.id === -1}
              onClick={DeletePassword}
            > Delete Password</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}