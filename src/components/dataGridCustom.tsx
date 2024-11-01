import React, { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";

export interface ParticipantData {
  id: number;
  name: string;
  marksString: string;
  totalMarks: number;
}

const initialParticipants: ParticipantData[] = [
  { id: 1, name: "Alice", marksString: "10+5", totalMarks: 15 },
  { id: 2, name: "Bob", marksString: "10+10", totalMarks: 20 },
  { id: 3, name: "Charlie", marksString: "5+5", totalMarks: 10 },
];

const markingOptions = ["+5", "-5", "+10", "-10", "+15", "-15"];

const DataGridWithDynamicMarks = ({
  participants,
  setParticipants,
}: {
  participants: ParticipantData[];
  setParticipants: any;
}) => {
  // const [participants, setParticipants] = useState(initialParticipants);

  // Function to calculate total marks from marksString
  const calculateTotal = (marksString: string): number => {
    const numbers = marksString?.match(/([+-]?\d+)/g) as string[];
    return numbers.reduce(
      (total: number, item: string) => total + parseInt(item, 10),
      0
    );
  };

  // Function to handle marks update
  const handleMarksUpdate = (id: number, operation: string) => {
    setParticipants((prev: ParticipantData[]) =>
      prev.map((participant: ParticipantData) => {
        if (participant.id === id) {
          const updatedMarks = `${participant?.marksString}${operation}`;
          const updatedTotal = calculateTotal(updatedMarks);
          return {
            ...participant,
            marksString: updatedMarks,
            totalMarks: updatedTotal,
          };
        }
        return participant;
      })
    );
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, width: 100 },
    {
      width: 1000,
      field: "marksString",
      headerName: "Marks",
      flex: 4,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" flexDirection="column" width="100%">
          <Typography
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {params.value}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={1}>
            {markingOptions.map((option) => (
              <Button
                key={option}
                size="small"
                variant="outlined"
                onClick={() => handleMarksUpdate(params.row.id, option)}
              >
                {option}
              </Button>
            ))}
          </Box>
        </Box>
      ),
    },
    { field: "totalMarks", headerName: "Total Marks", flex: 1 },
  ];

  // Custom row height calculation based on marksString length
  const getRowHeight = (params: any) => {
    const marksString = params?.row?.marksString;
    const lineHeight = 24; // Adjust based on font size
    const lines = Math.ceil(marksString?.length / 20); // Adjust 20 as per expected characters per line
    return lineHeight * lines + 70; // Add extra space for buttons
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={participants}
        columns={columns}
        disableColumnMenu
        hideFooter
        rowHeight={100}
        // getRowHeight={getRowHeight} // Dynamic row height
      />
    </Box>
  );
};

export default DataGridWithDynamicMarks;
