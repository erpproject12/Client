import React, { useState } from 'react';
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
const TableComponent = () => {
  const [rows, setRows] = useState([
    // Initial data with an empty row
    {
      id: 1,
      ItemName: '',
      Batch: '',
      ExpDate: '',
      Qty: '0',
      Discount: '0',
      PPrice: '0',
      SPrice: '',
      MRP: '',
      Tax: '',
      Total: ''
    }
  ]);
  const [nextId, setNextId] = useState(2); // Track the next available ID for new rows

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: nextId,
        ItemName: '',
        Batch: '',
        ExpDate: '',
        Qty: '',
        Discount: '',
        PPrice: '',
        SPrice: '',
        MRP: '',
        Tax: '',
        Total: ''
      }
    ]);
    setNextId(nextId + 1);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
    setRows(updatedRows);
  };
  //   const handleInputChange2 = (id, field, value) => {
  //     const updatedRows = rows.map((row) => (row.id === id ? { ...row, [field]: value } : row));
  //     setRows(updatedRows);
  //     let qty=rows[id-1].Qty;
  //     let price=rows[id-1].PPrice;
  //     let total=qty*price;
  //     console.log(total)

  //   };
  const handleInputChange2 = (id, name, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value, total: calculateTotal(value, row.PPrice) };
        }
        return row;
      });
      return updatedRows;
    });
  };
  const handlePPriceChange = (id, name, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value, total: calculateTotal(row.Qty, value) };
        }
        return row;
      });
      return updatedRows;
    });
  };
  const handleDiscount = (id, name, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value, total: calculateTotal(row.Discount, value) };
        }
        return row;
      });
      return updatedRows;
    });
  };
  const calculateTotal = (qty, price, Discount) => {
    const parsedQty = parseFloat(qty);
    const parsedPrice = parseFloat(price);
    const parsedDiscount = parseFloat(Discount);
    return isNaN(parsedQty) || isNaN(parsedPrice) ? 0 : parsedQty * parsedPrice;
  };

  const handleRemoveRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
      setNextId(nextId - 1);
    }
  };
  // useEffect(()=>{
  //     console.log('hello')
  // let qty=rows[0].Qty;
  // let price=rows[0].PPrice;
  // let total=qty*price;
  // console.log(total)
  // },[rows[0].Qty,rows[0].PPrice])

  return (
    <>
      <div>
        <Stack spacing={{ xs: 1 }} direction="row">
          <TextField variant="outlined" label="Bill Number" size="small" sx={{ width: 250, mb: 3 }} />
          <FormControl fullWidth size="small" sx={{ width: 250, mb: 3 }}>
            <InputLabel id="demo-simple-select-label">Party</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={'Bill Date'} size="small" />
          </LocalizationProvider>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell style={{ width: 200 }}>Item Name</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Exp.Date</TableCell>
                <TableCell>Qty</TableCell>
              
                <TableCell>Discount</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={top100Films}
                      sx={{ width: 250 }}
                      size="small"
                      renderInput={(params) => <TextField {...params} label="Movie" />}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Batch"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.col2}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Exp.Date"
                      sx={{ borderRadius: 4, width: '15ch' }}
                      size="small"
                      value={row.col3}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Qty"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      size="small"
                      name="Qty"
                      value={row.Qty}
                      onChange={(e) => handleInputChange2(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>

                 
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Discount"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      size="small"
                      value={row.Discount}
                      onChange={(e) => handleDiscount(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Price"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.col9}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="MRP"
                      size="small"
                      sx={{ borderRadius: 4, width: '10ch' }}
                      value={row.col10}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      variant="outlined"
                      label="Total"
                      size="small"
                      sx={{ borderRadius: 0, width: '10ch' }}
                      value={row.total}
                      onChange={(e) => handleInputChange(row.id, e.target.name, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
          <Button variant="contained" color="primary" onClick={handleAddRow} startIcon={<AddIcon />}>
            Add Item
          </Button>
          <Button variant="contained" color="error" onClick={handleRemoveRow} startIcon={<DeleteIcon />}>
            Remove
          </Button>
          <Button variant="contained" color="success" onClick={handleRemoveRow} startIcon={<CheckIcon />}>
            Submit
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div className="flex">
            <div className="pr-12">
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5">Sub Total :</Typography>
                </div>
                <div className="mr-4">
                  <TextField variant="outlined" label="Sub Total" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '5px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Discount : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" label="Discount" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> VAT : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" label="VAT" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '34px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Freight : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" label="Freight" size="small" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '7px' }}>
                <div className="mb-8">
                  <Typography variant="h5"> Grand Total : </Typography>
                </div>
                <div>
                  <TextField variant="outlined" label="Grand Total" size="small" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 }
];
export default TableComponent;
