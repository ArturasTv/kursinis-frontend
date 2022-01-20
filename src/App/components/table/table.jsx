import styles from "./table.module.scss";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import { FaPlay } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { dispatchStartGame } from "./../../redux/actions/WSAction";

import { makeStyles } from "@material-ui/core/styles";
import { TablePagination, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    "& tfoot tr td div:nth-child(1)": {
      justifyContent: "center",
      flex: "initial",
    },
  },
}));

const Table = () => {
  const dispatch = useDispatch();

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
      title: "Laiko kontrolė",
      field: "timeControl",
    },
  ];

  const { tables } = useSelector((state) => state.WS);

  const tableIcons = {
    play: forwardRef((props, ref) => <FaPlay {...props} ref={ref} />),
  };
  return (
    <MaterialTable
      icons={tableIcons}
      style={{ width: "600px", height: "480px", padding: "50px" }}
      title="Stalai"
      data={tables ? tables : []}
      columns={columns}
      options={{
        search: true,
        paging: true,
        filtering: false,
        exportButton: false,
        pageSizeOptions: false,
        actionsColumnIndex: -1,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: "Deja šiuo metu nėra laisvų stalų",
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
      actions={[
        {
          icon: () => <FaPlay size={14} />,
          tooltip: "Pradėti",
          onClick: (event, rowData) => {
            dispatch(dispatchStartGame({ tableId: rowData.tableId }));
          },
        },
      ]}
      components={{
        Container: (props) => <Paper {...props} className={classes.table} />,
        Pagination: (props) => (
          <TablePagination {...props} className={classes.table} />
        ),
      }}
    />
  );
};

export default Table;
