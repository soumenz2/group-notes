import React, { useState } from 'react';
import GroupPopup from './GroupPopup';

interface GroupListProps {
  groups: Group[];
  selectGroup: (group: Group) => void;
  addGroup: (name: string) => void;
}

interface Group {
  id: number;
  name: string;
}

const GroupList: React.FC<GroupListProps> = ({ groups, selectGroup, addGroup }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLDivElement).id === 'popup-background') {
      setShowPopup(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pocket Notes</h1>
      <button
        className="mb-4 p-2 bg-black text-white rounded-2xl w-full"
        onClick={() => setShowPopup(true)}
      >
        + Create Notes group
      </button>
      {showPopup && (
        <div
          id="popup-background"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleOutsideClick}
        >
          <GroupPopup addGroup={addGroup} closePopup={() => setShowPopup(false)} />
        </div>
      )}
      <ul>
        {groups.map((group, index) => (
          <li
            key={index}
            className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
            onClick={() => selectGroup(group)}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              {group.name.charAt(0).toUpperCase()}
            </div>
            <span className="ml-4">{group.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
