import React,{useMemo,useEffect,useState} from 'react'
import { connect } from 'react-redux'
import {useTable,useSortBy,useGlobalFilter,usePagination,useRowSelect } from 'react-table'
import {GlobalFilter} from './GlobalFilter'
import { Checkbox } from './Checkbox'
import UserComponent from './UserComponent'
import AddFabButton from '../common/Fab/AddFabButton'
export const UserListComponent = (props) => {
   const [IsNewDoc, setIsNewDoc] = useState(false)
   const setDocStatus=()=>{
       setIsNewDoc(!IsNewDoc)
   }
    const columns =useMemo(()=>[
                {Header:'First Name',accessor:'firstname'},
                {Header:'Last Name',accessor:'lastname'},
                {Header:'User Name',accessor:'username'},
                {Header:'Mobile No.',accessor:'mobile'},
                {Header:'Email',accessor:'email'}],[]);
    const data =useMemo(()=>[...props.users],[])           
                const {getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    pageOptions,
    setPageSize,
    selectedFlatRows
                        } = useTable({columns,data,initialState: { pageIndex: 0 }},
                        useGlobalFilter,
                        useSortBy,
                        usePagination,
                        useRowSelect,
                        
    hooks => {
      hooks.visibleColumns.push(columns => [
          ...columns,
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
        },
        
      ])
    }
                         )
    const {globalFilter,pageIndex, pageSize } = state 
    console.log('selected',selectedFlatRows.map(row => row.original))
    if(selectedFlatRows[0] || IsNewDoc){
    let docno='NO-ID'
    if(!IsNewDoc) docno = selectedFlatRows[0].original._id
    return(<UserComponent _id={docno}/>)
    }
    return (
        
           <div className="projects">
      <div className="card">
        <div className="card-header">
          <h3>Recent Project</h3>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
          <button>
            See all <span className="las la-arrow-right"></span>
          </button>
        </div>
        <div className="card-body">
          <div className="table-response">
        <table {...getTableProps()} width="100%">
            <thead>
           {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{textAlign:'left',padding: '0.5rem 1rem'}}>{column.render('Header')}<span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span></th>
              ))}
            </tr>
          ))}  
            </thead>
            <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot><div style={{width:'100%',alignContent:"center"}}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}>
          {[10, 25, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div></tfoot>
        </table>
        </div>
        </div>
        </div>
        <AddFabButton action={setDocStatus}/>
        </div>
        
    )
}

const mapStateToProps = (state) => ({
    users:state.documents.users,
    docnos:state.documents.docnos,
    companies:state.documents.companies,
})

const mapDispatchToProps =(dispatch:any)=> {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListComponent)
