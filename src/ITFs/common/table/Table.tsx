import React, { useState,useEffect } from 'react'
import Column from './Column'
import ColumnHead from './ColumnHead'
import {Pagination} from './Pagination';
import SMIconButton from './SMIconButton';
function Table(props: any) {
    let { data,actions,actionColWidth,headerText,addNew} = props
    const [selectedColumn, setSelectedColumn] = useState("");
    const [order, setOrder] = useState("");
    const [activePage, setActivePage] = useState(1);
    const [filterdata, setFilter] = useState([]);
    const [numberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(5)
    function sortSelectedColumn(selectedcolumn: string, order: string) {
        setOrder(order);
        setSelectedColumn(selectedcolumn)
    }
    useEffect(() => {
        setFilter([...data])
        
    }, [data])
    

    filterdata?.sort(compare)
    function compare(a: any, b: any) {
        if(order==="asc"){
        if (a[selectedColumn] < b[selectedColumn]) {
            return -1;
        }
        if (a[selectedColumn] > b[selectedColumn]) {
            return 1;
        }
        return 0;
    }else{
        if (a[selectedColumn] > b[selectedColumn]) {
            return -1;
        }
        if (a[selectedColumn] < b[selectedColumn]) {
            return 1;
        }
        return 0;
    }
    }
  let pageData:any=[]
  
  for(let i=(activePage-1)*numberOfRecordsPerPage;i<(((activePage-1)*numberOfRecordsPerPage)+numberOfRecordsPerPage) && i<filterdata.length;i++){
    pageData?.push(filterdata[i])
  }
    const globalSearch = (searchtext: string) => {
        let keys = Object.keys(data[0])
        let filteredData:any=[]
        for (let i = 0; i < data.length; i < i++) {
            for (let key of keys) {
                if(data[i][key]?.includes(searchtext)){
                    filteredData.push(data[i])
                    break;
                }
            }
        }
        setFilter(filteredData);
        
    }
    return (
        
        <>
        
            {/* {renderChildren(props.children)} */}
            
                    <div className="card-header">
                        {/* <div className="table-header-text">
                            <h3>{headerText}</h3><span>({data.length})</span>
                        </div> */}
                        <div className="goble-search"><input placeholder="search" style={{height:'40px',fontSize:"16px"}} onChange={(e)=>{globalSearch(e.target.value)}}/><i className="fas fa-search"/></div>
                        <button className="tabel-add-button" onClick={()=>addNew("NO-ID",true)}>Add new <span className="las la-arrow-right"></span></button>
                        
                    </div>
                    <div className="card-body">
                        <div className="table-response">
                            <table width="100%">
                                <thead>
                                    <tr>{props.children.map((ele: any) => (<ColumnHead selectColumn={sortSelectedColumn} fieldname={ele.props.fieldname} selectedcolumn={selectedColumn} width={ele.props.width}>{ele.props.columnname}</ColumnHead>))}
                                            {actions?.length>0 ?<ColumnHead width={actionColWidth} selectColumn={()=>{}}>Action</ColumnHead>:null}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData?.map((data: any) => { 
                                    return (<tr>{props.children.map((ele: any) => {
                                        const { fieldname, columnname,render,width } = ele.props
                                       
                                        return <Column data={data && data[fieldname]? data[fieldname]:""} />
                                    })}
                                    {<Column data={<div className="table-button-container">{actions.map((action:any,i:any)=>{
                                        return(<SMIconButton action={action.action} id={data && data["_id"]? data["_id"]:""} icon={action.icon} className={action.className}/>)})}</div>}/>
                                    }
                                    </tr>)})
                                

                                }</tbody></table>
                        </div>
                    </div>
                
                <Pagination 
                    number={Math.ceil(filterdata.length/numberOfRecordsPerPage)} 
                    activePage={activePage} setActivePage={setActivePage} 
                    numberOfRecordsPerPage={numberOfRecordsPerPage}
                    setNumberOfRecordsPerPage={setNumberOfRecordsPerPage}
                />
            
        </>
    )
}

export default Table
