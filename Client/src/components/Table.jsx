function Table(props){

    let rows = props.links.map( (data) =>{
        return(
        <tr key={data.id}>
            <td>{data.name}</td>
            <td>{data.url}</td>
            <td>
                <button type="button" onClick={() => props.onDelete(data.id)}>
                Delete
                </button>
            </td>
        </tr>
        )   


    })

    return(
        <table>
            <thead>
                    <tr>
                        <th>Link Name</th>
                        <th>Link URL</th>
                        <th>Actions</th>
                    </tr>  
            </thead>
            <tbody>

            {rows}

            </tbody>
        </table>
    
    )

}

export default Table