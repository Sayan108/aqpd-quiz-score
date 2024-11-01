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
import DataGridWithDynamicMarks, {
  ParticipantData,
} from "./components/dataGridCustom";

export interface Team {
  name: string;
  score: number[];
}

export interface Round {
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

  const [teamAndScoreDetails, setTeamAndScoreDetails] = useState<
    ParticipantData[]
  >([]);

  // Fetch from local storage
  useEffect(() => {
    const savedRounds = getFromLocalStorage("rounds");
    if (savedRounds) setRounds(savedRounds);
  }, []);

  const handleQuizSetup = (name: string, teamNames: string[]) => {
    setQuizName(name);
    const initializedTeams = teamNames.map((team, index) => ({
      id: index,
      name: team,
      marksString: "",
      totalMarks: 0,
    }));
    setTeamAndScoreDetails(initializedTeams);
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
        <StandingsChart
          teams={teamAndScoreDetails?.map(
            (item: ParticipantData) => item?.name
          )}
          totalScores={teamAndScoreDetails?.map(
            (item: ParticipantData) => item?.totalMarks
          )}
        />
      ) : (
        <>
          <Typography variant="h4">{quizName}</Typography>
          {/* <QuizDataGrid
            numberOfQuestions={teams?.length}
            teams={teams}
            currentRound={currentRound}
            onUpdateScore={handleUpdateScore}
            totalScores={totalScores}
            setTotalScores={setTotalScores}
          /> */}
          <DataGridWithDynamicMarks
            participants={teamAndScoreDetails}
            setParticipants={setTeamAndScoreDetails}
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
