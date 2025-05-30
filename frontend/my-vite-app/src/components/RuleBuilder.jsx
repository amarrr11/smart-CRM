import React from 'react';

export default function RuleInput({ field, value, onChange, disabled }) {
  // field: 'spend', 'visits' or 'lastTimeVisited'
  // value: current value
  // onChange: function to update parent state
  // disabled: boolean to disable input

  const getPlaceholder = () => {
    if (field === 'lastTimeVisited') return 'dd/mm/yy';
    if (field === 'spend') return 'Enter spend (e.g., 10000)';
    if (field === 'visits') return 'Enter visits (e.g., 3)';
    return '';
  };

  const inputType = field === 'lastTimeVisited' ? 'text' : 'number';

  return (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ textTransform: 'capitalize', display: 'block', marginBottom: '5px' }}>
        {field}:
      </label>
      <input
        type={inputType}
        placeholder={getPlaceholder()}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(field, e.target.value)}
        style={{ padding: '5px', width: '200px' }}
      />
    </div>
  );
}
