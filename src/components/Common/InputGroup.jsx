import React from 'react';

function InputGroup({ name, value, placeholder, onChange }) {
  return (
    <div className='form-group'>
      <input
        type='text'
        name={name}
        className='form-control form-control-lg'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default InputGroup;
