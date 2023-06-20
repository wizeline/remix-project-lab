import { Container, Paper } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import Header from "app/core/layouts/Header";
import type {
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridSortModel,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { DataGrid, GridLinkOperator, GridToolbar } from "@mui/x-data-grid";
import { searchApplicants } from "~/models/applicant.server";

export const loader: LoaderFunction = async ({ request }) => {
  const data = await searchApplicants();
  return data;
};

const shortDateFormatter = (params: GridValueFormatterParams) => {
  const date = new Date(params.value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function Projects() {
  const applicants = useLoaderData();
  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      renderCell: (params: GridRenderCellParams<string>) => {
        return <a href={`mailto:${params.value}`}>{params.row.fullName}</a>;
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 0.5,
      type: "date",
      valueGetter: (params: GridValueGetterParams) => {
        return new Date(params.value).toISOString();
      },
      valueFormatter: shortDateFormatter,
    },
    {
      field: "endDate",
      headerName: "End Date",
      type: "date",
      flex: 0.5,
      valueGetter(params) {
        return new Date(params.value).toISOString();
      },
      valueFormatter: shortDateFormatter,
    },
    { field: "hoursPerWeek", headerName: "HpW", flex: 0.2 },
    { field: "university", headerName: "university", flex: 1 },
  ];

  const filterModel: GridFilterModel = {
    items: [
      {
        id: 1,
        columnField: "startDate",
        operatorValue: "after",
        value: new Date(
          Date.now() - 60 * 60 * 24 * 30 * 3 /** months **/ * 1000
        ).toISOString(),
      },
    ],
    linkOperator: GridLinkOperator.And,
  };

  const sortModel: GridSortModel = [{ field: "startDate", sort: "asc" }];

  return (
    <>
      <Header title="Applicants" />
      <Container>
        <Paper sx={{ p: 2 }}>
          <h1 style={{ marginTop: 0 }}>Applicants</h1>
          <DataGrid
            rows={applicants}
            columns={columns}
            autoHeight={true}
            initialState={{
              filter: { filterModel },
              sorting: { sortModel },
            }}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Paper>
      </Container>
    </>
  );
}
