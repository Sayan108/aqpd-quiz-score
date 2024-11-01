import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Stack } from "@mui/material";

import QuizSetup from "./components/QuizSetup";
import RoundSetup from "./components/RoundSetup";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "./components/storageHelper";
import QuizDataGrid from "./components/QuizDataGrid";
import StandingsChart from "./components/standingsChart";

export interface Team {
  name: string;
  score: number[];
}

interface Round {
  pounceRight: number;
  pounceWrong: number;
  directRight: number;
  directWrong: number;
  bonusRight: number;
  bonusWrong: number;
  numberOfQuestions: number;
}

const App: React.FC = () => {
  const [quizName, setQuizName] = useState<string>("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [showChart, setshowChart] = useState(false);
  const [totalScores, setTotalScores] = useState(teams.map(() => 0));

  // Fetch from local storage
  useEffect(() => {
    const savedRounds = getFromLocalStorage("rounds");
    if (savedRounds) setRounds(savedRounds);
  }, []);

  const handleQuizSetup = (name: string, teamNames: string[]) => {
    setQuizName(name);
    const initializedTeams = teamNames.map((team) => ({
      name: team,
      score: [],
    }));
    setTeams(initializedTeams);
  };

  const handleRoundSetup = (round: Round) => {
    setRounds([...rounds, round]);
    setCurrentRound(round);
    saveToLocalStorage("rounds", [...rounds, round]);
  };

  const handleUpdateScore = (teamIndex: number, score: number) => {
    const updatedTeams = teams.map((team, index) =>
      index === teamIndex ? { ...team, score: [...team.score, score] } : team
    );
    setTeams(updatedTeams);
  };

  const handleResetScores = () => {
    const resetTeams = teams.map((team) => ({ ...team, score: [] }));
    setTeams(resetTeams);
  };
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      {!quizName ? (
        <QuizSetup onSetup={handleQuizSetup} />
      ) : !currentRound ? (
        <RoundSetup onSetup={handleRoundSetup} />
      ) : showChart ? (
        <StandingsChart teams={teams} totalScores={totalScores} />
      ) : (
        <>
          <Typography variant="h4">{quizName}</Typography>
          <QuizDataGrid
            numberOfQuestions={teams?.length}
            teams={teams}
            currentRound={currentRound}
            onUpdateScore={handleUpdateScore}
            totalScores={totalScores}
            setTotalScores={setTotalScores}
          />
          <Stack
            direction={"row"}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleResetScores}
            >
              Reset All Scores
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setshowChart(true)}
            >
              Show Standings
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={toggleFullScreen}
            >
              Full Screen
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default App;
