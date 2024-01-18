import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Label from 'src/components/Label';
import Scrollbar from 'src/components/Scrollbar';
import GameListHead from './GameListHead';
import GameListToolbar from './GameListToolbar';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  // { id: '' },
];

function descendingComparator<T>(a: any, b: any) {
  if (b.displayName < a.displayName) {
    return -1;
  }
  if (b.displayName > a.displayName) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(order: Order): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b) : (a, b) => -descendingComparator(a, b);
}

function applySortFilter(array: any[], comparator: any, query: string) {
  const copy = [...array];
  copy.sort(comparator);

  if (query) {
    return copy.filter((_game) => _game.displayName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return copy;
}

export default function GameList({ games }: any) {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<Order>('asc');

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = games.map((g: any) => g.displayName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: any) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - games.length) : 0;

  const filteredUsers = applySortFilter(games, getComparator(order), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | ari Admin </title>
      </Helmet>

      <>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={2}>
          <Typography variant='h5'>Game List</Typography>
          {/* <Button variant="contained" startIcon={}>
            New Game
          </Button> */}
        </Stack>

        <Card>
          <GameListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <GameListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={games.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                    const { id, displayName, released, company } = row;
                    const selectedUser = selected.indexOf(displayName) !== -1;

                    return (
                      <TableRow hover key={id} selected={selectedUser}>
                        {/* <TableCell padding='checkbox'>
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, displayName)} />
                        </TableCell> */}

                        <TableCell component='th' scope='row'>
                          <Typography variant='subtitle2' noWrap>
                            {displayName}
                          </Typography>
                        </TableCell>

                        <TableCell align='left'>{company}</TableCell>

                        <TableCell align='left'>
                          <Label color={(!released && 'error') || 'success'}>{released ? 'Active' : 'In-Active'}</Label>
                        </TableCell>

                        {/* <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant='h6' paragraph>
                            Not found
                          </Typography>

                          <Typography variant='body2'>
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={games.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </>

      {/* <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

// const games = [
//   {
//     gameId: 'portal-dogs',
//     displayName: 'Portal Dogs',
//     coverImage: 'https://storage.googleapis.com/ari-game-images/portal-dogs/cover.png',
//     tags: ['Arcade', 'Single-Player'],
//     price: {
//       USD: 1.5,
//     },
//     description:
//       'As king of the dogs, your mission is to find all your loyal subjects and guide them to the portal. The second you wake up another dog, he will simultaneously follow your movements. You succeed by finding your way to the portal. You are mastering the mission if you save all your loyal subjects, find the golden bone and get to the portal.',
//     platforms: ['Windows', 'MacOS'],
//     released: true,
//     rating: 4,
//     company: 'Brain Connected',
//     esrbRating: 'E',
//     sold: 5,
//     countLimit: 10,
//   },
//   {
//     gameId: 'test-game',
//     displayName: 'Test Game',
//     coverImage: 'https://storage.googleapis.com/ari-game-images/games/fallout-76/fallout-76-large.webp',
//     tags: ['FPS'],
//     price: {
//       USD: 1.5,
//     },
//     description: 'test',
//     platforms: ['windows'],
//     released: true,
//     rating: 4,
//     company: 'test company',
//     sold: 5,
//     countLimit: 10,
//   },
// ];
