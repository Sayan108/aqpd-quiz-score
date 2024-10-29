import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface QuizSetupProps {
  onSetup: (quizName: string, teamNames: string[]) => void;
}

const QuizSetup: React.FC<QuizSetupProps> = ({ onSetup }) => {
  const [quizName, setQuizName] = useState('');
  const [teamCount, setTeamCount] = useState<number>(2);
  const [teamNames, setTeamNames] = useState<string[]>(['', '']);

  const handleTeamCountChange = (count: number) => {
    setTeamCount(count);
    setTeamNames(new Array(count).fill(''));
  };

  const handleSubmit = () => {
    onSetup(quizName, teamNames);
  };

  return (
    <Box>
      <Typography variant="h5">Quiz Setup</Typography>
      <TextField
        label="Quiz Name"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Number of Teams"
        type="number"
        value={teamCount}
        onChange={(e) => handleTeamCountChange(Number(e.target.value))}
        inputProps={{ min: 2, max: 20 }}
        fullWidth
        margin="normal"
      />
      {teamNames.map((team, index) => (
        <TextField
          key={index}
          label={`Team ${index + 1} Name`}
          value={teamNames[index]}
          onChange={(e) => {
            const newNames = [...teamNames];
            newNames[index] = e.target.value;
            setTeamNames(newNames);
          }}
          fullWidth
          margin="normal"
        />
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        Start Quiz
      </Button>
    </Box>
  );
};

export default QuizSetup;
