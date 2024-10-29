import React from 'react';
import { Box, Button, Grid } from '@mui/material';

interface QuizDataGridProps {
  teams: { name: string; score: number }[];
  currentRound: any;
  onUpdateScore: (teamIndex: number, score: number) => void;
}

const QuizDataGrid: React.FC<QuizDataGridProps> = ({ teams, currentRound, onUpdateScore }) => {
  const handleAddScore = (teamIndex: number, type: string) => {
    let score = 0;
    if (type === 'pounceRight') score = currentRound.pounceRight;
    else if (type === 'pounceWrong') score = currentRound.pounceWrong;
    else if (type === 'directRight') score = currentRound.directRight;
    else if (type === 'directWrong') score = currentRound.directWrong;
    else if (type === 'bonusRight') score = currentRound.bonusRight;
    else if (type === 'bonusWrong') score = currentRound.bonusWrong;

    onUpdateScore(teamIndex, score);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {teams.map((team, index) => (
          <Grid key={index} item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>{team.name}</div>
              <div>Score: {team.score}</div>
              <Button onClick={() => handleAddScore(index, 'pounceRight')}>Pounce Right</Button>
              <Button onClick={() => handleAddScore(index, 'pounceWrong')}>Pounce Wrong</Button>
              <Button onClick={() => handleAddScore(index, 'directRight')}>Direct Right</Button>
              <Button onClick={() => handleAddScore(index, 'directWrong')}>Direct Wrong</Button>
              <Button onClick={() => handleAddScore(index, 'bonusRight')}>Bonus Right</Button>
              <Button onClick={() => handleAddScore(index, 'bonusWrong')}>Bonus Wrong</Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuizDataGrid;
