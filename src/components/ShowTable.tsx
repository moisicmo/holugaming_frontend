import {
  Drawer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material';

interface tableProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  headers: Array<string>;
  data: any;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));
export const ShowTable = (props: tableProps) => {
  const { open, handleClose, title, headers = [], data } = props;
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: '50vh',
          top: 'auto',
          bottom: 0,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        },
      }}
    >
      <div style={{ padding: '16px' }}>
        <Typography variant="h6">{title}</Typography>
      </div>
      <TableContainer component={Paper} style={{ overflowY: 'auto' }}>
        <Table stickyHeader size="small" sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              {headers.map((elem, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ fontWeight: 'bold', backgroundColor: '#01DE87' }}
                >
                  {elem}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index_body: number) => (
              <StyledTableRow key={index_body}>
                {columns.map((columnName, index) => (
                  <TableCell key={index} sx={{ border: '.1px solid grey' }}>
                    {row[columnName]}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Drawer>
  );
};
