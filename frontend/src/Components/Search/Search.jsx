import React from 'react'



const Search = () => {
    const inputStyle = {
        padding: '8px',
        borderRadius: '40px',
        border: '1px solid #ccc',
        marginRight: '5px',
      };
    
      const buttonStyle = {
        padding: '4px 6px',
        borderRadius: '40px',
        border: '1px solid #28a745',
        background: '#28a745',
        color: 'white',
        cursor: 'pointer',
        margin:'-1px',
      };
    
      const handleSearch = () => {
        // Implement your search logic here
        console.log('Search button clicked');
      };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>

<input type="text" placeholder="Search..." style={inputStyle} />
      <button onClick={handleSearch} style={buttonStyle}>
        Search 
      </button>
    </div>
  )
}

export default Search