import React, { useState, useEffect } from 'react';
import GroupList from './components/GroupList';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';
import { FaArrowLeft } from 'react-icons/fa'; 
import image from './assets/initialpage.png';
import { CiLock } from "react-icons/ci"

interface Group {
  id: number;
  name: string;
}

interface Note {
  content: string;
  createdAt: number;
}

const App: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isGroupListView, setIsGroupListView] = useState<boolean>(true);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
    setGroups(savedGroups);
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      const savedNotes = JSON.parse(localStorage.getItem(`notes-${selectedGroup.id}`) || '[]');
      setNotes(savedNotes);
    } else {
      setNotes([]);
    }
  }, [selectedGroup]);

  useEffect(() => {
 
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768); 
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addGroup = (name: string) => {
    const newGroup: Group = { id: Date.now(), name };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  };

  const addNote = (content: string) => {
    if (!selectedGroup) return;

    const newNote: Note = {
      content,
      createdAt: Date.now(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem(`notes-${selectedGroup.id}`, JSON.stringify(updatedNotes));
  };

  const selectGroup = (group: Group) => {
    setSelectedGroup(group);
    setIsGroupListView(false); 
  };

  const backToGroupList = () => {
    setSelectedGroup(null); 
    setIsGroupListView(true); 
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 bg-gray-100 p-4 border-r">
        <GroupList groups={groups} selectGroup={selectGroup} addGroup={addGroup} />
      </div>
      <div className="w-full md:w-3/4 p-4 flex flex-col">
        {!isMobileView && !selectedGroup && (
          <div className="flex-1 items-center justify-center text-gray-500 bg-[#F7ECDC]">
            <img src={image} alt="Illustration" className="mb-4" />
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Pocket Notes</h1>
              <p>
                Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
              </p>
              <div className="flex items-center mt-2 mx-8">
                <span className="text-gray-500"><CiLock /></span>
                <span className="ml-2 text-gray-500">end-to-end encrypted</span>
              </div>
            </div>
          </div>
        )}
        {!isGroupListView && selectedGroup && (
          <div className="mb-4 p-2 bg-gray-200 rounded flex items-center">
            <button className="mr-4 md:hidden " onClick={backToGroupList}>
              <FaArrowLeft size={24} />
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              {selectedGroup.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="ml-4 text-xl font-bold">{selectedGroup.name}</h2>
          </div>
          
          
        )}
        {selectedGroup ? (
          <div className="flex-1 overflow-y-auto p-4 bg-beige">
            <NoteList notes={notes} />
            <div className="p-4 border-t">
              <NoteInput addNote={addNote} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-[#F7ECDC] md:hidden">
           
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
