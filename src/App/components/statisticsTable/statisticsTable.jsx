import styles from "./statisticsTable.module.scss";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import { FaPlay } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination, Paper } from "@material-ui/core";

import { useEffect, useState } from "react";

import getStats from "../../services/statsService";

const useStyles = makeStyles((theme) => ({
  table: {
    "& tfoot tr td div:nth-child(1)": {
      justifyContent: "center",
      flex: "initial",
    },
  },
}));

const StatisticsTable = () => {
  useEffect(() => {
    getStats().then((data) => setUsers(data));
  }, []);

  const classes = useStyles();
  const columns = [
    {
      title: "Vardas",
      field: "name",
    },
    {
      title: "Reitingas",
      field: "rating",
    },
    {
      title: "Pergalės",
      field: "wins",
    },
    {
      title: "Pralaimėjimai",
      field: "loses",
    },
    {
      title: "Lygiosios",
      field: "draws",
    },
  ];

  const tableIcons = {
    play: forwardRef((props, ref) => <FaPlay {...props} ref={ref} />),
  };

  const [users, setUsers] = useState([]);

  return (
    <MaterialTable
      icons={tableIcons}
      style={{ width: "600px", height: "480px", padding: "50px" }}
      title="Žaidėjų statistika"
      data={users ? users : []}
      columns={columns}
      options={{
        search: true,
        paging: true,
        filtering: false,
        exportButton: false,

        actionsColumnIndex: -1,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: "Deja šiuo metu nėra žaidėjų",
        },
        toolbar: {
          searchPlaceholder: "Paieška",
        },
        header: { actions: "" },
        pagination: {
          labelDisplayedRows: "{from}-{to} iš {count}",
          labelRowsPerPage: "Eilutės per puslapį",
          firstAriaLabel: "Pirmas puslapis",
          firstTooltip: "Pirmas puslapis",
          previousAriaLabel: "Buvęs puslapis",
          previousTooltip: "Buvęs puslapis",
          nextAriaLabel: "Sekantis puslapis",
          nextTooltip: "Sekantis puslapis",
          lastAriaLabel: "Paskutinis puslapis",
          lastTooltip: "Paskutinis puslapis",
        },
      }}
      components={{
        Container: (props) => <Paper {...props} className={classes.table} />,
        Pagination: (props) => (
          <TablePagination {...props} className={classes.table} />
        ),
      }}
    />
  );
};

export default StatisticsTable;
