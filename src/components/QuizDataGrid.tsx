import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { Team } from "../App";

interface QuizDataGridProps {
  teams: Team[];
  currentRound: {
    pounceRight: number;
    pounceWrong: number;
    directRight: number;
    directWrong: number;
    bonusRight: number;
    bonusWrong: number;
    numberOfQuestions: number;
  };
  numberOfQuestions: number;
  onUpdateScore: (
    teamIndex: number,
    questionIndex: number,
    score: number
  ) => void;
  totalScores: number[];
  setTotalScores: React.Dispatch<React.SetStateAction<number[]>>;
}

const QuizDataGrid: React.FC<QuizDataGridProps> = ({
  teams,
  currentRound,
  numberOfQuestions,
  onUpdateScore,
  totalScores,
  setTotalScores,
}) => {
  const [scores, setScores] = useState(
    Array(currentRound?.numberOfQuestions).fill(teams.map(() => null))
  );
  // const [totalScores, setTotalScores] = useState(teams.map(() => 0));

  const handleAddScore = (
    questionIndex: number,
    teamIndex: number,
    type: string
  ) => {
    let score = 0;
    if (type === "pounceRight") score = currentRound.pounceRight;
    else if (type === "pounceWrong") score = currentRound.pounceWrong;
    else if (type === "directRight") score = currentRound.directRight;
    else if (type === "directWrong") score = currentRound.directWrong;
    else if (type === "bonusRight") score = currentRound.bonusRight;
    else if (type === "bonusWrong") score = currentRound.bonusWrong;

    const updatedScores = scores.map((questionScores, i) =>
      i === questionIndex
        ? questionScores.map((s: any, j: any) => (j === teamIndex ? score : s))
        : questionScores
    );
    const updatedTotalScores = totalScores.map((s, i) =>
      i === teamIndex ? s + score : s
    );

    setScores(updatedScores);
    setTotalScores(updatedTotalScores);
    onUpdateScore(teamIndex, questionIndex, score);
  };

  const handleResetScore = (questionIndex: number, teamIndex: number) => {
    const resetScore = scores[questionIndex][teamIndex] || 0;
    const updatedScores = scores.map((questionScores, i) =>
      i === questionIndex
        ? questionScores.map((s: any, j: any) => (j === teamIndex ? null : s))
        : questionScores
    );
    const updatedTotalScores = totalScores.map((s, i) =>
      i === teamIndex ? s - resetScore : s
    );

    setScores(updatedScores);
    setTotalScores(updatedTotalScores);
    onUpdateScore(teamIndex, questionIndex, 0);
  };

  const columns: GridColDef[] = [
    {
      field: "question",
      headerName: "Question",
      width: 120,
      renderCell: (params) => (
        <Typography>Q{params.row.questionIndex + 1}</Typography>
      ),
    },
    ...teams.map((team, teamIndex) => ({
      field: `team${teamIndex}`,
      headerName: team.name,
      width: 180,
      renderHeader: () => (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography fontWeight="bold" color="primary">
            {team.name}
          </Typography>
          <Typography color="secondary">{totalScores[teamIndex]}</Typography>
        </Box>
      ),
      renderCell: (params: GridCellParams) => {
        const questionIndex = params.row.questionIndex;

        return scores[questionIndex][teamIndex] === null ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <ButtonGroup size="small" variant="outlined" sx={{ mt: 1 }}>
              <Button
                color="success"
                onClick={() =>
                  handleAddScore(questionIndex, teamIndex, "pounceRight")
                }
              >
                +P
              </Button>
              <Button
                color="error"
                onClick={() =>
                  handleAddScore(questionIndex, teamIndex, "pounceWrong")
                }
              >
                -P
              </Button>
              <Button
                color="success"
                onClick={() =>
                  handleAddScore(questionIndex, teamIndex, "directRight")
                }
              >
                +D
              </Button>
              {currentRound.directWrong !== 0 && (
                <Button
                  color="error"
                  onClick={() =>
                    handleAddScore(questionIndex, teamIndex, "directWrong")
                  }
                >
                  -D
                </Button>
              )}
              <Button
                color="info"
                onClick={() =>
                  handleAddScore(questionIndex, teamIndex, "bonusRight")
                }
              >
                +B
              </Button>
              {currentRound.bonusWrong !== 0 && (
                <Button
                  color="error"
                  onClick={() =>
                    handleAddScore(questionIndex, teamIndex, "bonusWrong")
                  }
                >
                  -B
                </Button>
              )}
            </ButtonGroup>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography variant="body2">
              {scores[questionIndex][teamIndex]}
            </Typography>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleResetScore(questionIndex, teamIndex)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      },
    })),
  ];

  const rows = Array.from(
    { length: currentRound?.numberOfQuestions },
    (_, questionIndex) => ({
      id: questionIndex,
      questionIndex,
    })
  );

  return (
    <Box
      sx={{
        height: 650,
        width: "100%",
        bgcolor: "#f8f9fa",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        hideFooterPagination
        disableColumnMenu
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "#e0e0e0",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row": {
            bgcolor: "#ffffff",
            "&:nth-of-type(odd)": {
              bgcolor: "#f3f4f6",
            },
          },
          "& .MuiButton-root": {
            fontSize: "0.75rem",
            minWidth: 32,
          },
        }}
      />
    </Box>
  );
};

export default QuizDataGrid;
