"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const GolfScorecard = () => {
  const [scores, setScores] = useState({
    front: Array(9).fill(''),
    back: Array(9).fill('')
  });
  
  const [selectedTee, setSelectedTee] = useState('Whites (60.5)');
  const [selectedHoles, setSelectedHoles] = useState('18 Holes');
  const [selectedType, setSelectedType] = useState('On Course');

  const pars = [4, 5, 3, 4, 4, 3, 5, 4, 4]; // Same for both front and back nine

  const handleScoreChange = (nine: 'front' | 'back', holeIndex: number, value: string) => {
    const newScores = { ...scores };
    newScores[nine][holeIndex] = value;
    setScores(newScores);
  };

  const calculateNineTotal = (nine: 'front' | 'back') => {
    return scores[nine].reduce((sum, score) => {
      const numScore = parseInt(score) || 0;
      return sum + numScore;
    }, 0);
  };

  const calculateTotalScore = () => {
    return calculateNineTotal('front') + calculateNineTotal('back');
  };

  const styles = `
    .scorecard-container {
      max-width: 1500px;
      margin: 0 auto;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .controls-section {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .control-group {
      flex: 1;
      min-width: 200px;
    }

    .control-label {
      display: block;
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      color: #6b7280;
    }

    .dropdown {
      position: relative;
      width: 100%;
    }

    .dropdown-button {
      width: 100%;
      padding: 12px 16px;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 16px;
      color: #374151;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: border-color 0.2s;
    }

    .dropdown-button:hover {
      border-color: #d1d5db;
    }

    .dropdown-button:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .scorecard-table {
      width: 100%;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .scorecard-row {
      display: flex;
      border-bottom: 1px solid #e5e7eb;
    }

    .scorecard-row:last-child {
      border-bottom: none;
    }

    .scorecard-cell {
      padding: 12px 8px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      border-right: 1px solid #e5e7eb;
      flex: 1;
      min-width: 60px;
    }

    .scorecard-cell:last-child {
      border-right: none;
      background: #f3f4f6;
      min-width: 80px;
    }

    .scorecard-cell:first-child {
      text-align: left;
      padding-left: 16px;
      background: #f9fafb;
      min-width: 80px;
      flex: 0 0 80px;
    }

    .header-row {
      background: #f9fafb;
      font-weight: 600;
      color: #374151;
    }

    .par-row {
      background: #f9fafb;
      color: #6b7280;
    }

    .score-input {
      width: 100%;
      padding: 8px 4px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      background: white;
      transition: border-color 0.2s;
    }

    .score-input:focus {
      outline: none;
      border-color: #3b82f6;
    }

    .score-input:hover {
      border-color: #d1d5db;
    }

    .score-section {
      background: #e0f2fe;
    }

    .total-section {
      background: #f3f4f6;
      font-weight: 600;
      font-size: 16px;
    }

    .total-score {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
    }

    .button-section {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 20px;
    }

    .button {
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .button-cancel {
      background: #f3f4f6;
      color: #6b7280;
    }

    .button-cancel:hover {
      background: #e5e7eb;
    }

    .button-post {
      background: #d4edda;
      color: #155724;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .button-post:hover {
      background: #c3e6cb;
    }

    @media (max-width: 768px) {
      .scorecard-cell {
        padding: 8px 4px;
        font-size: 12px;
        min-width: 40px;
      }
      
      .scorecard-cell:first-child {
        min-width: 60px;
        flex: 0 0 60px;
      }
      
      .scorecard-cell:last-child {
        min-width: 60px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="scorecard-container">
        {/* Controls Section */}
        <div className="controls-section">
          <div className="control-group">
            <label className="control-label">Tees</label>
            <div className="dropdown">
              <button className="dropdown-button">
                {selectedTee}
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
          <div className="control-group">
            <label className="control-label">Holes</label>
            <div className="dropdown">
              <button className="dropdown-button">
                {selectedHoles}
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
          <div className="control-group">
            <label className="control-label">Type</label>
            <div className="dropdown">
              <button className="dropdown-button">
                {selectedType}
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Front Nine */}
        <div className="scorecard-table">
          <div className="scorecard-row header-row">
            <div className="scorecard-cell">HOLE</div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(hole => (
              <div key={hole} className="scorecard-cell">{hole}</div>
            ))}
            <div className="scorecard-cell">OUT</div>
          </div>
          
          <div className="scorecard-row par-row">
            <div className="scorecard-cell">PAR</div>
            {pars.map((par, index) => (
              <div key={index} className="scorecard-cell">{par}</div>
            ))}
            <div className="scorecard-cell">36</div>
          </div>
          
          <div className="scorecard-row score-section">
            <div className="scorecard-cell">SCORE</div>
            {scores.front.map((score, index) => (
              <div key={index} className="scorecard-cell">
                <input
                  type="number"
                  className="score-input"
                  value={score}
                  onChange={(e) => handleScoreChange('front', index, e.target.value)}
                  min="1"
                  max="15"
                />
              </div>
            ))}
            <div className="scorecard-cell">{calculateNineTotal('front') || ''}</div>
          </div>
        </div>

        {/* Back Nine */}
        <div className="scorecard-table">
          <div className="scorecard-row header-row">
            <div className="scorecard-cell">HOLE</div>
            {[10, 11, 12, 13, 14, 15, 16, 17, 18].map(hole => (
              <div key={hole} className="scorecard-cell">{hole}</div>
            ))}
            <div className="scorecard-cell">IN</div>
          </div>
          
          <div className="scorecard-row par-row">
            <div className="scorecard-cell">PAR</div>
            {pars.map((par, index) => (
              <div key={index} className="scorecard-cell">{par}</div>
            ))}
            <div className="scorecard-cell">36</div>
          </div>
          
          <div className="scorecard-row score-section">
            <div className="scorecard-cell">SCORE</div>
            {scores.back.map((score, index) => (
              <div key={index} className="scorecard-cell">
                <input
                  type="number"
                  className="score-input"
                  value={score}
                  onChange={(e) => handleScoreChange('back', index, e.target.value)}
                  min="1"
                  max="15"
                />
              </div>
            ))}
            <div className="scorecard-cell">{calculateNineTotal('back') || ''}</div>
          </div>
        </div>

        {/* Total Score */}
        <div className="scorecard-table">
          <div className="scorecard-row total-section">
            <div className="scorecard-cell">TOTAL SCORE</div>
            <div className="scorecard-cell total-score" style={{ flex: 1, textAlign: 'right', paddingRight: '16px' }}>
              {calculateTotalScore() || '77'}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-section">
          <button className="button button-cancel">Cancel</button>
          <button className="button button-post">
            Post Score
            <span>→</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default GolfScorecard;