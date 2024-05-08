import React, { useState, useEffect } from 'react';
import LoadingPopup from './LoadingPopup'; 
import './Sidebar.css'; 
import BoardPopup from './BoardPopup';
import { useBrdsContext } from '../hooks/useBrdsContext';
import { useAuthContext } from "../hooks/useAuthContext";
import BoardIdContext from '../context/BoardIdContext';


const Sidebar = () => {
  const { user } = useAuthContext();
  const { brds, dispatch } = useBrdsContext();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { BoardId, setBoardId } = React.useContext(BoardIdContext);
  const [active, setActive] = useState('Learn Python');

  useEffect(() => {

    const fetchBoards = async () => {
      try {
        const response = await fetch("/api/Board/", {
          headers: { 'Authorization': `Bearer ${user.token}` },

        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_BRDS', payload: json });
          const latestBoardId = json.length > 0 ? json[json.length - 1]._id : null;
          console.log("Latest Board ID:", latestBoardId);
          setBoardId(latestBoardId);
          
        }
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    }
    
    if (user) {
      fetchBoards();
    }
  }, [dispatch, user]);
  

  //this is to rename the board
  const handleClick = (card) => {
    setActive(card);
    setIsOpen(true);
  };

  const handleAddCard = async () => {
    try {
      const cardData = {
        title: 'New Title',
        description: 'New card Description',
      };

      const response = await fetch('/api/Board/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      });

      if (!response.ok) {
        throw new Error('Failed to add new card');
      }

      const newcard = await response.json();
      dispatch({ type: 'CREATE_BRD', payload: newcard });
    } catch (error) {
      console.error('Error adding new card:', error);
    }
  };
  const handleSingleClick = (card) => {
    setActive(card);
    // Show loading screen
    setLoading(true);

    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
      // Update the board ID in the state
      setBoardId(card._id);
      setLoading(false); // Hide loading screen
    }, 2000); // Simulated delay for demonstration
  };



  const handleDeleteCard = async (boardId) => {
    try {
      const response = await fetch(`/api/Board/${boardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete board');
      }

      dispatch({ type: 'DELETE_BRD', payload: { _id: boardId } });
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Boards</h3>
      </div>
      <div className="sidebar-content">
        <ul>
        {brds.map((board, index) => (
  <li key={index}>
    <span
      className={active.title == board.title ? 'active board-title' : 'board-title'}
      // onClick={() => handleClick(board)}
      onDoubleClick={() => handleSingleClick(board)}

    >
      {board.title}
    </span>
    <span>
  <div className="button-container">
    <button onClick={()=>handleClick(board)}className="edit-button">
      Edit
    </button>
    <button onClick={() => handleDeleteCard(board._id)} className="delete-button">
      Delete
    </button>
  </div>
</span>
  </li>
))}

             
        </ul>
        <button className="add-button" onClick={handleAddCard}>
          <span className="plus-icon"></span> ADD BOARD
        </button>

        {isOpen && (
          <BoardPopup
            board={active}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
          {loading && <LoadingPopup />}
      </div>
    </div>
  );
};

export default Sidebar;
