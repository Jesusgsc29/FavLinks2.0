function Table(props){

    const handleEditClick = (data) => {
        const newName = window.prompt('New name:', data.name)
        if (newName === null) return

        const newUrl = window.prompt('New URL:', data.url)
        if (newUrl === null) return

        if (newName === '' || newUrl === '') {
          alert('Name and URL are required')
          return
        }
        props.onUpdate(data.id, { name: newName, url: newUrl })
      }

    let rows = props.links.map( (data) =>{
        return(
        <tr key={data.id}>
            <td>{data.name}</td>
            <td>{data.url}</td>
            <td>
                <button type="button" onClick={() => handleEditClick(data)}>
                    Edit
                </button>
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