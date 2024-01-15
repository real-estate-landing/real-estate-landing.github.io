import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "../../../styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Switch,
  TablePagination,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FlagIcon from "@mui/icons-material/Flag";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import ViewListIcon from "@mui/icons-material/ViewList";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import {
  applyQueryFilters,
  deleteSelectedUsers,
  returnAllDocsCount,
  returnPaginatedContacts,
  updateUserCalled,
  updateUserStatus,
} from "../../../lib/firebase/firestore";
import {
  contactTableType,
  contactType,
  contactsController,
  supportedContactStatusList,
} from "../../../types/contactType";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import dateFormat from "dateformat";
import { db } from "../../../lib/firebase/firebase";
import { filterType } from "../../../types/filterType";
import noDataImg from "../../../assets/images/no_data.png";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles()((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  h2: {
    fontSize: "20px",
  },
  freeTrialChip: {
    marginRight: "5px",
    color: "#ffd900",
    border: "1px solid #ffd900",
    backgroundColor: alpha("#ffd900", 0.2),
  },
  purchasedChip: {
    marginRight: "5px",
    color: "#008000",
    border: "1px solid #008000",
    backgroundColor: alpha("#008000", 0.2),
  },
  noStatusChip: {
    marginRight: "5px",
    color: "#808080",
    border: "1px solid #808080",
    backgroundColor: alpha("#808080", 0.2),
  },
  wannaTryChip: {
    marginRight: "5px",
    color: "#FF0000",
    border: "1px solid #FF0000",
    backgroundColor: alpha("#FF0000", 0.2),
  },
  typography: {
    width: "auto",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "16px",
  },
  reloader: {
    color: theme.palette.primary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
  needToCall: {
    backgroundColor: alpha("#008000", 0.2),
  },
  alreadyCalled: {},
  popper: {
    position: "absolute",
    borderRadius: "8px",
    border: `1.5px solid ${theme.palette.primary.main}`,
    height: "150px",
    overflowY: "scroll",
    width: "250px",
    transform: "translateY(-10%)",
    zIndex: 11111111,
    // padding: "0px 5px",
    "&::-webkit-scrollbar": {
      width: "6px",
      borderRadius: "15px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgb(231, 230, 230)",
      borderRadius: "15px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "white",
      borderRadius: "15px",
    },

    "&:hover": {
      "&::-webkit-scrollbar-thumb": {
        background: "rgb(147, 147, 147)",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
    },
  },
  popperOpen: {
    visibility: "visible",
    position: "absolute",
    opacity: "1",
    transition: "400ms ease",
    transform: "translateY(0)",
  },
  popperClose: {
    position: "absolute",
    visibility: "hidden",
    opacity: "0",
    transition: "400ms ease",
    transform: "translateY(-10%)",
  },
  noDataImg: {
    width: "350px",
    height: "auto",
    aspectRatio: "1/1",
    margin: "auto",
  },
  noDataImgFull: {
    height: "100%",
    width: "auto",
    aspectRatio: "1/1",
    marginLeft: "50px",
  },
}));

function createData(
  id: string,
  isOnTrial: boolean,
  isPurchased: boolean,
  isWannaTry: boolean,
  name: string,
  phoneNumber: string,
  time: number,
  wantToContact: boolean
): contactTableType {
  return {
    id,
    name,
    phoneNumber,
    wantToContact,
    time,
    status: {
      isOnTrial,
      isPurchased,
      isWannaTry,
    },
  };
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof contactTableType;
  label: string;
  numeric: boolean;
  statuses?: string[];
}

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  headCells: readonly HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount, headCells } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  tableTitle: string;
  selectedTitle: string;
  nameVal: string;
  phoneVal: string;
  statusSelected?: supportedContactStatusList | undefined;
  deleteSelecteds: () => void;
  searchByPhone?: (str: string) => void;
  searchByName?: (str: string) => void;
  searchByStatus?: (str: supportedContactStatusList | undefined) => void;
  status?: supportedContactStatusList;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const {
    numSelected,
    tableTitle,
    selectedTitle,
    deleteSelecteds,
    nameVal,
    phoneVal,
    searchByName,
    searchByPhone,
    searchByStatus,
    status,
    statusSelected,
  } = props;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameEl, setNameEl] = useState<HTMLInputElement | null>(null);
  const [phoneEl, setPhoneEl] = useState<HTMLInputElement | null>(null);
  const [names, setNames] = useState<Array<string> | undefined>(undefined);
  const [phones, setPhones] = useState<Array<string> | undefined>(undefined);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isOnTrial, isPurchased, isWannaTry, noStatus, wantToContact, all] = t(
    "callTableUserStatuses"
  ).split(";");

  const handlePhoneElClick = (event: React.MouseEvent<HTMLInputElement>) => {
    setPhoneEl(event.currentTarget);
  };

  const handlePhoneElClose = () => {
    setPhoneEl(null);
  };

  const phoneElOpen = Boolean(phoneEl);
  const handleNameElClick = (event: React.MouseEvent<HTMLInputElement>) => {
    setNameEl(event.currentTarget);
  };

  const handleNameElClose = () => {
    setNameEl(null);
  };

  const nameElOpen = Boolean(nameEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function getNames() {
    const collectionInitial = collection(db, "contactsName");
    onSnapshot(collectionInitial, (snapshot) => {
      const smth = snapshot.docs[0]
        .data()
        .values.split(";") as unknown as string[];
      setNames(smth);
    });
  }
  function getPhones() {
    const collectionInitial = collection(db, "contactsPhone");
    onSnapshot(collectionInitial, (snapshot) => {
      const smth = snapshot.docs[0]
        .data()
        .values.split(";") as unknown as string[];
      setPhones(smth);
    });
  }
  function returnFilteredArray(arr: string[] | undefined, search: string) {
    return arr?.filter((val) => val.includes(search ?? "") && val.length > 0);
  }

  useEffect(() => {
    if (name?.length === 0) searchByName(undefined);
  }, [name]);
  useEffect(() => {
    if (phone?.length === 0) searchByPhone(undefined);
  }, [phone]);
  useEffect(() => {
    setName(nameVal);
  }, [nameVal]);
  useEffect(() => {
    setPhone(phoneVal);
  }, [phoneVal]);
  useEffect(() => {
    getNames();
    getPhones();
    return () => {
      getNames();
      getPhones();
    };
  }, []);
  const setSelectStatus = (event: SelectChangeEvent) => {
    searchByStatus(event.target.value as supportedContactStatusList);
  };

  return (
    <Toolbar
      sx={{
        width: "100%",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {selectedTitle}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", fontSize: "20px" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteSelecteds}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : open ? (
        <Tooltip title="Filter list">
          <IconButton aria-describedby={id} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-describedby={id} onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "10px",
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            {t("filterName")}
          </Typography>
          <Box sx={{ position: "relative" }}>
            <TextField
              id="searchByPhone"
              label={t("searchByPhone")}
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onClick={handlePhoneElClick}
              onBlur={handlePhoneElClose}
            />
            <Paper
              className={`${classes.popper} ${
                phoneElOpen ? classes.popperOpen : classes.popperClose
              }`}
            >
              {returnFilteredArray(phones, phone) &&
              returnFilteredArray(phones, phone)?.length > 0 ? (
                returnFilteredArray(phones, phone)?.map((phone, index) => {
                  return phone.length > 1 ? (
                    <>
                      <MenuItem
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                          borderBottom: "1px solid grey",
                        }}
                        onClick={() => {
                          searchByPhone(phone);
                          setPhone(phone);
                        }}
                      >
                        <PersonPinIcon fontSize="medium" />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: "bold" }}
                          >
                            {phone}
                          </Typography>
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>
                            {returnFilteredArray(names, name)
                              ? returnFilteredArray(names, name)[index]
                              : null}
                          </Typography>
                        </Box>
                      </MenuItem>
                    </>
                  ) : (
                    <div key={index}></div>
                  );
                })
              ) : (
                <>
                  <img
                    src={noDataImg}
                    alt="no-data-img"
                    className={classes.noDataImgFull}
                    loading="lazy"
                  />
                </>
              )}
            </Paper>
          </Box>
          <Box sx={{ position: "relative" }}>
            <TextField
              id="searchByName"
              label={t("searchByName")}
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={handleNameElClick}
              onBlur={handleNameElClose}
            />

            <Paper
              className={`${classes.popper} ${
                nameElOpen ? classes.popperOpen : classes.popperClose
              }`}
            >
              {returnFilteredArray(names, name)?.length > 0 ? (
                returnFilteredArray(names, name)?.map((name, index) => {
                  return name.length > 1 ? (
                    <>
                      <MenuItem
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                          borderBottom: "1px solid grey",
                        }}
                        onClick={() => {
                          searchByName(name);
                          setName(name);
                        }}
                      >
                        <PersonPinIcon fontSize="medium" />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: "bold" }}
                          >
                            {name}
                          </Typography>
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>
                            {returnFilteredArray(phones, phone) &&
                              returnFilteredArray(phones, phone)[index]}
                          </Typography>
                        </Box>
                      </MenuItem>
                    </>
                  ) : (
                    <div key={index}></div>
                  );
                })
              ) : (
                <>
                  <img
                    src={noDataImg}
                    alt="no-data-img"
                    className={classes.noDataImgFull}
                    loading="lazy"
                  />
                </>
              )}
            </Paper>
          </Box>

          <Box sx={{ minWidth: 120, minHeight: "150px" }}>
            {statusSelected && statusSelected !== "all" ? (
              <>
                <InputLabel id="demo-simple-select-label">Status:</InputLabel>
                <br />
              </>
            ) : null}
            {statusSelected && statusSelected !== "all" ? (
              <>
                {statusSelected == "isOnTrial" ? (
                  <Chip
                    className={classes.freeTrialChip}
                    label={
                      <Typography className={classes.typography}>
                        <MoreTimeIcon />
                        {isOnTrial}
                      </Typography>
                    }
                  />
                ) : statusSelected == "isPurchased" ? (
                  <Chip
                    className={classes.purchasedChip}
                    label={
                      <Typography className={classes.typography}>
                        <LocalMallIcon />
                        {isPurchased}
                      </Typography>
                    }
                  />
                ) : statusSelected == "isWannaTry" ? (
                  <Chip
                    className={classes.wannaTryChip}
                    label={
                      <Typography className={classes.typography}>
                        <FlagIcon />
                        {isWannaTry}
                      </Typography>
                    }
                  />
                ) : null}
              </>
            ) : (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {t("status")}:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={setSelectStatus}
                  // sx={{ display: "flex", alignItems: "center" }}
                >
                  <MenuItem key={0} value={"all"}>
                    <ViewListIcon sx={{ marginRight: "5px" }} />
                    {all}
                  </MenuItem>
                  <MenuItem key={1} value={"wantToContact"}>
                    <PhoneCallbackIcon sx={{ marginRight: "5px" }} />
                    {wantToContact}
                  </MenuItem>
                  <MenuItem key={2} value={"isOnTrial"}>
                    <MoreTimeIcon sx={{ marginRight: "5px" }} />
                    {isOnTrial}
                  </MenuItem>
                  <MenuItem key={3} value={"isPurchased"}>
                    <LocalMallIcon sx={{ marginRight: "5px" }} />
                    {isPurchased}
                  </MenuItem>
                  <MenuItem key={4} value={"isWannaTry"}>
                    <FlagIcon sx={{ marginRight: "5px" }} />
                    {isWannaTry}
                  </MenuItem>
                  <MenuItem key={5} value={"noStatus"}>
                    <DoNotDisturbIcon sx={{ marginRight: "5px" }} />
                    {noStatus}
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </Paper>
      </Popover>
    </Toolbar>
  );
}

function GroupCall({
  pageStatus,
}: {
  pageStatus?: supportedContactStatusList;
}) {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [direction, setDirection] = useState<"back" | "forward" | undefined>(
    undefined
  );
  const [searchFilter, setSearchFilter] = useState<filterType>({
    phoneNumber: undefined,
    name: undefined,
    status: "all",
  });

  const [selectedId, setSelectedId] = useState("");
  const [reloadTable, setReloadTable] = useState(true);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState<number | undefined>(
    undefined
  );
  const [startingAt, setStartingAt] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();
  const [contactsController, setContactsController] =
    useState<contactsController | null>(null);
  function genereateQueryForOnSnapshot(purpose: "total" | "table") {
    let initialQuery = query(collection(db, "users"), orderBy("time", "desc"));
    if (purpose == "total") {
      initialQuery = query(initialQuery);
    } else {
      initialQuery = query(initialQuery, limit(rowsPerPage));
    }
    return (initialQuery = applyQueryFilters(initialQuery, {
      phoneNumber: searchFilter.phoneNumber,
      name: searchFilter.name,
      status: searchFilter.status,
    }));
  }
  const fetchData = async () => {
    if (page !== 0) {
      const rData = await returnPaginatedContacts(
        rowsPerPage,
        direction,
        startingAt ? startingAt : undefined,
        searchFilter.phoneNumber,
        searchFilter.name,
        searchFilter.status
      );
      setContactsController({
        ...rData,
        data:
          rowsPerPage < rData.data.length
            ? rData.data.slice(rowsPerPage)
            : rData.data,
        rawData:
          rowsPerPage < rData.rawData.length
            ? rData.rawData.slice(rowsPerPage)
            : rData.rawData,
      });
      return () => {};
    } else if (rowsPerPage) {
      const unsubscribe = onSnapshot(
        genereateQueryForOnSnapshot("table"),
        async (snapshot) => {
          const total = await returnAllDocsCount(
            undefined,
            genereateQueryForOnSnapshot("total")
          );
          const updatedUsers = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as contactType;
          });
          setContactsController({
            data: updatedUsers,
            rawData: snapshot.docs,
            totalElements: total,
          });
        }
      );
      return () => unsubscribe();
    }
  };
  useEffect(() => {
    if (pageStatus) {
      setSearchFilter((pre) => {
        return { ...pre, status: pageStatus };
      });
    }
  }, [pageStatus]);
  useEffect(() => {
    const rowsPerpageLocal = localStorage.getItem("rowsPerpageCalls");
    if (rowsPerpageLocal) {
      setRowsPerPage(+rowsPerpageLocal);
    } else {
      localStorage.setItem("rowsPerpageCalls", "10");
      setRowsPerPage(10);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, direction, reloadTable, searchFilter]);

  const rows: contactTableType[] = contactsController?.data?.map((item) => {
    return createData(
      item.id,
      item.isOnTrial,
      item.isPurchased,
      item.isWannaTry,
      item.name,
      item.phoneNumber,
      item.time,
      item.wantToContact
    );
  });

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: t("callTableName"),
    },
    {
      id: "phoneNumber",
      numeric: true,
      disablePadding: false,
      label: t("callTablePhone"),
    },
    {
      id: "time",
      numeric: true,
      disablePadding: false,
      label: t("callTableTime"),
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: t("callTableStatus"),
    },
    {
      id: "wantToContact",
      numeric: true,
      disablePadding: false,
      label: t("callPhoneStatus"),
    },
  ];

  const searchByName = (str: string) => {
    setSearchFilter((pre) => {
      return { ...pre, name: str };
    });
  };
  const searchByPhone = (str: string) => {
    setSearchFilter((pre) => {
      return { ...pre, phoneNumber: str };
    });
  };
  const searchByStatus = (str: supportedContactStatusList) => {
    setSearchFilter((pre) => {
      return { ...pre, status: str };
    });
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setDirection(
      newPage === 0 ? undefined : newPage > page ? "forward" : "back"
    );
    setStartingAt(
      contactsController?.rawData?.[contactsController?.rawData?.length - 1]
    );
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    localStorage.setItem("rowsPerpageCalls", event.target.value ?? "10");
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleStatus = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.stopPropagation();
    setSelectedId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleStatusClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(null);
    setReloadTable((pre) => !pre);
  };
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <EnhancedTableToolbar
            numSelected={selected?.length}
            selectedTitle={t("selectTitle")}
            tableTitle={
              pageStatus == "isOnTrial"
                ? t("freeTrialTableTitle")
                : pageStatus === "isPurchased"
                ? t("purchasedTableTitle")
                : pageStatus === "isWannaTry"
                ? t("interestedTableTitle")
                : t("callTableTitle")
            }
            deleteSelecteds={() => {
              deleteSelectedUsers("users", selected);
              setReloadTable((pre) => !pre);
              setSelected([]);
            }}
            status={searchFilter.status}
            nameVal={searchFilter.name}
            phoneVal={searchFilter.phoneNumber}
            searchByName={searchByName}
            searchByPhone={searchByPhone}
            searchByStatus={searchByStatus}
            statusSelected={pageStatus}
            key={0}
          />
          {rows?.length > 0 ? (
            <>
              <TableContainer>
                <Table
                  sx={{ minWidth: 950 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected?.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={rows?.length}
                    headCells={headCells}
                  />
                  <TableBody>
                    {rows?.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const [
                        freeTrialText,
                        purchasedText,
                        wannaTryText,
                        noStatusText,
                      ] = t("callTableUserStatuses").split(";");
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                          className={
                            row?.wantToContact
                              ? classes.needToCall
                              : classes.alreadyCalled
                          }
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="right">
                            <a
                              href={`tel:${row.phoneNumber}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateUserCalled(row.id);
                                setReloadTable((pre) => !pre);
                              }}
                            >
                              {row.phoneNumber}
                            </a>
                          </TableCell>
                          <TableCell align="right">
                            {dateFormat(new Date(row.time), "HH:MM:ss")} <br />
                            {dateFormat(new Date(row.time), "mm/dd/yyyy")}
                          </TableCell>
                          <TableCell align="right">
                            {row.status.isOnTrial ? (
                              <Chip
                                className={classes.freeTrialChip}
                                label={
                                  <Typography className={classes.typography}>
                                    <MoreTimeIcon />
                                    {freeTrialText}
                                  </Typography>
                                }
                              />
                            ) : row.status.isPurchased ? (
                              <Chip
                                className={classes.purchasedChip}
                                label={
                                  <Typography className={classes.typography}>
                                    <LocalMallIcon />
                                    {purchasedText}
                                  </Typography>
                                }
                              />
                            ) : row.status.isWannaTry ? (
                              <Chip
                                className={classes.wannaTryChip}
                                label={
                                  <Typography className={classes.typography}>
                                    <FlagIcon />
                                    {wannaTryText}
                                  </Typography>
                                }
                              />
                            ) : (
                              <Chip
                                className={classes.noStatusChip}
                                label={
                                  <Typography className={classes.typography}>
                                    <DoNotDisturbIcon />
                                    {noStatusText}
                                  </Typography>
                                }
                              />
                            )}
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? "long-menu" : undefined}
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={(e) => handleStatus(e, row.id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              MenuListProps={{
                                "aria-labelledby": "long-button",
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleStatusClose}
                              PaperProps={{
                                style: {
                                  width: "20ch",
                                },
                              }}
                            >
                              <MenuItem
                                key={1}
                                // selected={option === "Pyxis"}
                                onClick={(e) => {
                                  handleStatusClose(e);
                                  updateUserStatus(selectedId, "trial").then(
                                    (res) => console.log(res)
                                  );
                                  console.log("fre trial clicked");
                                }}
                              >
                                <MoreTimeIcon sx={{ marginRight: "5px" }} />
                                {freeTrialText}
                              </MenuItem>
                              <MenuItem
                                key={2}
                                // selected={option === "Pyxis"}
                                onClick={(e) => {
                                  handleStatusClose(e);
                                  updateUserStatus(selectedId, "purchased");
                                }}
                              >
                                <LocalMallIcon sx={{ marginRight: "5px" }} />
                                {purchasedText}
                              </MenuItem>
                              <MenuItem
                                key={3}
                                // selected={option === "Pyxis"}
                                onClick={(e) => {
                                  handleStatusClose(e);
                                  updateUserStatus(selectedId, "wannaTry");
                                }}
                              >
                                <FlagIcon sx={{ marginRight: "5px" }} />
                                {wannaTryText}
                              </MenuItem>
                              <MenuItem
                                key={4}
                                // selected={option === "Pyxis"}
                                onClick={(e) => {
                                  handleStatusClose(e);
                                  updateUserStatus(selectedId, undefined);
                                }}
                              >
                                <DoNotDisturbIcon sx={{ marginRight: "5px" }} />
                                {noStatusText}
                              </MenuItem>
                            </Menu>
                          </TableCell>
                          <TableCell align="right">
                            {row.wantToContact ? (
                              <a
                                href={`tel:${row.phoneNumber}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateUserCalled(row.id);
                                  setReloadTable((pre) => !pre);
                                }}
                              >
                                <Chip
                                  className={classes.purchasedChip}
                                  label={
                                    <Typography className={classes.typography}>
                                      <BorderColorIcon />
                                      {t("callTablePhoneActive")}
                                    </Typography>
                                  }
                                />
                              </a>
                            ) : (
                              <Chip
                                className={classes.noStatusChip}
                                label={
                                  <Typography className={classes.typography}>
                                    <DoneAllIcon />
                                    {t("callTablePhoneDisactive")}
                                  </Typography>
                                }
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",

                  ".css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
                    display: "flex",
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                  },
                }}
                count={contactsController?.totalElements}
                rowsPerPage={rowsPerPage ?? 10}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          ) : (
            <img
              src={noDataImg}
              alt="no-data-img"
              className={classes.noDataImg}
              loading="lazy"
            />
          )}
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label={t("densePadding")}
          />
          <h4
            onClick={() => setReloadTable((pre) => !pre)}
            className={classes.reloader}
          >
            {t("reloadTable")}
          </h4>
        </Box>
      </Box>
    </>
  );
}

export default GroupCall;
