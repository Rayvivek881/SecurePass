import React, { useContext, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Box, Button } from '@mui/material';
import { ReceivedPassword, PasswordInterface } from '../Interfaces/Interfaces';
import PasswordModal from './PasswordModal';
import { PasswordsRow } from '../TestData/SemplePasswords'

import { GlobalContext } from '../Context/GlobalStorage';


interface Column {
  id: 'id' | 'website' | 'username' | 'password' | 'created_at' | 'updated_at';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'Id', minWidth: 30 },
  {
    id: 'website',
    label: 'Website',
    align: 'right',
    minWidth: 100
  },
  {
    id: 'username',
    label: 'UserName',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'password',
    label: 'Password',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'created_at',
    label: 'Created At',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'updated_at',
    label: 'Updated At',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];


export default function HomePasswordsTable() {
  const { passwordData, setPasswordData } = useContext(GlobalContext);
  const { currentPage, rowsPerPage, totalDataCount, filter } = passwordData;

  const getPasswordPages = (page: number, rowsPerPage: number) => {
    const rows: ReceivedPassword[] = PasswordsRow;
    const l : number = page * rowsPerPage, r : number = page * rowsPerPage + rowsPerPage;

    if (setPasswordData !== undefined) {
      setPasswordData({ 
        currentPage: page, 
        rowsPerPage, filter,
        totalDataCount : rows.length,
        Arr: rows.slice(l, r)
      });
    }
  }
  useEffect(() => getPasswordPages(0, 20), []);
  const [openPasswordModal, setOpenPasswordModal] = React.useState<boolean>(false);
  const initialSelectedPassword : PasswordInterface = {
    id: -1,
    website: '',
    username: '',
    password: ''
  }
  const [selectedPassword, setSelectedPassword] = React.useState<PasswordInterface>(initialSelectedPassword);

  const handleRowClicked = (passwordRowData: PasswordInterface) => {
    
    setSelectedPassword(passwordRowData);
    setOpenPasswordModal(true);
  }



  const handleChangePage = (event: unknown, newPage: number) => {
    getPasswordPages(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    getPasswordPages(0, +event.target.value);
  };

  return (
    <React.Fragment>
      <TableContainer sx={{ maxHeight: "100vh" }}>
        <Box display={'flex'} justifyContent={'space-around'}>
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={totalDataCount}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Button variant="contained" onClick={() => handleRowClicked(initialSelectedPassword)}>Insert Password</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {passwordData.Arr.map((row, ind) => {
                return (
                  <TableRow onClick={() => handleRowClicked(row)} hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {typeof value === 'object' ? value.toLocaleString() : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <PasswordModal
        passwordData={selectedPassword}
        openPasswordModal={openPasswordModal}
        setOpenPasswordModal={setOpenPasswordModal}
      />
    </React.Fragment>
  );
}
