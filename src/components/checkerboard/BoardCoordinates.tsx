
import React from 'react';

const BoardCoordinates: React.FC = () => {
  const coordinates = [];
  
  // Render row numbers
  for (let row = 0; row < 8; row++) {
    coordinates.push(
      <div 
        key={`row-label-${row}`} 
        className="absolute text-xs font-bold text-white bg-blue-600/80 w-6 h-6 flex items-center justify-center z-10" 
        style={{ 
          left: '-2rem', 
          top: `calc(${row * 12.5}% + 6.25% - 0.75rem)`,
        }}
      >
        {8 - row}
      </div>
    );
  }
  
  // Render column letters
  for (let col = 0; col < 8; col++) {
    coordinates.push(
      <div 
        key={`col-label-${col}`} 
        className="absolute text-xs font-bold text-white bg-blue-600/80 w-6 h-6 flex items-center justify-center z-10" 
        style={{ 
          bottom: '-2rem', 
          left: `calc(${col * 12.5}% + 6.25% - 0.75rem)`,
        }}
      >
        {String.fromCharCode(97 + col)}
      </div>
    );
  }
  
  return <>{coordinates}</>;
};

export default BoardCoordinates;
