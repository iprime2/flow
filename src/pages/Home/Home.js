import './home.scss'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [flowData, setFlowData] = useState(null)

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  const rows = [flowData]

  function createData(name, input, created) {
    return { name, input, created }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://64307b10d4518cfb0e50e555.mockapi.io/workflow'
        )
        setFlowData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='home'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Input type</StyledTableCell>
              <StyledTableCell>Created at</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flowData?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <Link to={`flow/${row.id}`} className='link'>
                  <StyledTableCell>{row.name}</StyledTableCell>
                </Link>
                <StyledTableCell>{row.input_type}</StyledTableCell>
                <StyledTableCell>{row.createdAt}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home
