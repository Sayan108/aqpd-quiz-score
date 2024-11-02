import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Round } from "../App";

interface RoundSetupProps {
  onSetup: (round: Round) => void;
}

const RoundSetup: React.FC<RoundSetupProps> = ({ onSetup }) => {
  const [roundData, setRoundData] = useState<Round>({
    pounceRight: 10,
    pounceWrong: -5,
    directRight: 10,
    directWrong: 0,
    bonusRight: 5,
    bonusWrong: 0,
    numberOfQuestions: 0,
  });

  const handleSubmit = () => {
    onSetup(roundData);
  };

  return (
    <Box sx={{ justifyContent: "center" }}>
      <Typography variant="h5">Round Setup</Typography>
      <TextField
        label="Pounce Right"
        type="number"
        value={roundData.pounceRight}
        onChange={(e) =>
          setRoundData({ ...roundData, pounceRight: Number(e.target.value) })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Pounce Wrong"
        type="number"
        value={roundData.pounceWrong}
        onChange={(e) =>
          setRoundData({ ...roundData, pounceWrong: Number(e.target.value) })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Direct Right"
        type="number"
        value={roundData.directRight}
        onChange={(e) =>
          setRoundData({ ...roundData, directRight: Number(e.target.value) })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Direct Wrong"
        type="number"
        value={roundData.directWrong}
        onChange={(e) =>
          setRoundData({ ...roundData, directWrong: Number(e.target.value) })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Bonus Right"
        type="number"
        value={roundData.bonusRight}
        onChange={(e) =>
          setRoundData({ ...roundData, bonusRight: Number(e.target.value) })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Bonus Wrong"
        type="number"
        value={roundData.bonusWrong}
        onChange={(e) =>
          setRoundData({ ...roundData, bonusWrong: Number(e.target.value) })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="No of questions"
        type="number"
        value={roundData.numberOfQuestions}
        onChange={(e) =>
          setRoundData({
            ...roundData,
            numberOfQuestions: Number(e.target.value),
          })
        }
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleSubmit}>
        Start Round
      </Button>
    </Box>
  );
};

export default RoundSetup;
