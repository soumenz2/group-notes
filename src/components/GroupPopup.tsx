import React, { useState } from 'react';

interface GroupPopupProps {
  addGroup: (name: string) => void;
  closePopup: () => void;
}

const GroupPopup: React.FC<GroupPopupProps> = ({ addGroup, closePopup }) => {
  const [groupName, setGroupName] = useState('');

  const handleAddGroup = () => {
    if (groupName.trim()) {
      addGroup(groupName);
      closePopup();
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group Name"
        className="border p-2 w-full mb-2"
      />
      <button className="p-2 bg-blue-500 text-white rounded" onClick={handleAddGroup}>
        Add Group
      </button>
    </div>
  );
};

export default GroupPopup;
