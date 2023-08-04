import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Box,
  TextField,
  Typography,
  Autocomplete,
  FormControl
} from '@mui/material';

const columns = [
  { field: 'id', headerName: 'Invoice no', width: 100 },
  { field: 'itemName', headerName: 'Item name', width: 150 },
  { field: 'phoneNumber', headerName: 'Phone number', width: 150 },
  { field: 'partName', headerName: 'Party name', width: 150 },
  { field: 'issueDate', headerName: 'Issue date', width: 130 },
  { field: 'amount', headerName: 'Amount', width: 150 }
];

const rows = [
  { id: 100002, itemName: 'Snow', phoneNumber: '898889', partName: 'Xyzzz', issueDate: '10/04/2023', amount: '10,000' },
  { id: 100003, itemName: 'Lannister', phoneNumber: '898889', partName: 'Xyzzz', issueDate: '10/04/2023', amount: '10,000' },
  { id: 100004, itemName: 'Stark', phoneNumber: '898889', partName: 'Xyzzz', issueDate: '10/04/2023', amount: '10,000' }
  // ... rest of the rows
];

export default function DataTable() {
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [filteredRows, setFilteredRows] = React.useState(rows);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValue(newValue);

    if (newValue) {
      const filteredData = rows.filter((row) => {
        const fullName = `${row.itemName || ''} ${row.partName || ''}`;
        return fullName.toLowerCase().includes(newValue.toLowerCase());
      });
      setFilteredRows(filteredData);
    } else {
      setFilteredRows(rows);
    }
  };

  return (
    <>
     <div style={{ marginBottom: '20px' }}>
  <Box sx={{ display: "flex" }}>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      name="product_id"
      size="small"
      sx={{ width: 340 }}
      options={rows.map((row) => `${row.itemName || ''} ${row.partName || ''}`)}
      value={selectedValue}
      onChange={handleAutocompleteChange}
      renderInput={(params) => <TextField {...params} label="Select Party" />}
    />

    {/* Move the Button to the end */}
    <div style={{ marginLeft: 'auto' }}>
      <Button variant="outlined" color="primary">
        Generate Receipt
      </Button>
    </div>
  </Box>
</div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={filteredRows} columns={columns} pageSize={5} checkboxSelection />
      </div>
    </>
  );
}
