import { Card, CardContent, Table, TableContainer, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import UserItem from './UserItem';
// redux
import { useSelector } from '../../../redux/store';

export default function UsersList() {
  const { users } = useSelector((state) => state.admin);

  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Nombre de usuario</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <UserItem key={u.id} user={u} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
