import AddIcon from "@mui/icons-material/Add";
import "./App.css";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Box,
  TextField,
  Fab,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import CardComponent from "./Card";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
function App() {
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");
  const [editmode, setEditMode] = useState(false);
  const [editObj, setEditObj] = useState({});

  const AddItem = () => {
    if (input) {
      const obj = {
        id: Math.random(),
        text: input,
        selected: false,
      };
      setState([...state, obj]);
      setInput("");
    }
  };

  const HandleDelete = (id) => {
    const filterDate = state.filter((res) => res.id !== id);
    setState(filterDate);
  };
  const HandleCheck = (id) => {
    const filterDate = state.map((res) =>
      res.id === id ? { ...res, selected: !res.selected } : res
    );
    setState(filterDate);
  };
  const HandleEdit = (arg) => {
    setEditMode(true);
    setEditObj(arg);
  };
  const HandleSubmit = () => {
    setEditMode(false);
    const filterDate = state.map((res) =>
      res.id === editObj.id ? editObj : res
    );
    setState(filterDate);
  };

  const inProgress = state.filter((arg) => arg.selected === false);
  const completed = state.filter((arg) => arg.selected === true);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            background: theme.palette.background.default,
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <Container maxWidth="md" sx={{ paddingTop: "50px" }}>
            <Box
              sx={{
                boxShadow: `
            0px 3px 6px rgba(0,0,0,0.3)
              `,
                minheight: "80vh",
                padding: "50px",
                background: theme.palette.background.paper,
              }}
            >
              <Grid container>
                <Grid sx={{ marginBottom: "20px" }}>
                  <Typography variant="h4" color="primary">
                    Todo World
                  </Typography>
                </Grid>
                <Grid item lg={10}>
                  <TextField
                    value={editmode ? editObj.text : input}
                    onChange={(e) =>
                      editmode
                        ? setEditObj({ ...editObj, text: e.target.value })
                        : setInput(e.target.value)
                    }
                    fullWidth
                    focused
                    id="outlined-basic"
                    label={editmode ? "Edit Todo" : "Add Todo"}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  sx={{ paddingLeft: "20px" }}
                  whileHover={{ scale: 1.3 }}
                  component={motion.div}
                >
                  {editmode ? (
                    <Button
                      size="large"
                      variant="contained"
                      sx={{ height: "100%" }}
                      color="primary"
                      onClick={HandleSubmit}
                    >
                      Update
                    </Button>
                  ) : (
                    <Fab
                      color="primary"
                      aria-label="add"
                      onClick={() =>
                        state.length < 5
                          ? AddItem()
                          : alert("Only you can add 5 tasks")
                      }
                    >
                      <AddIcon />
                    </Fab>
                  )}
                </Grid>
              </Grid>

              <Grid
                key={"sd"}
                container
                style={{ marginTop: "20px" }}
                spacing={2}
              >
                {inProgress.length > 0 && (
                  <Typography variant="h5" sx={{ color: "gray" }}>
                    Need to complete
                  </Typography>
                )}
                <AnimatePresence>
                  {state
                    .filter((arg) => arg.selected === false)
                    .map((data) => (
                      <Grid
                        key={data.id}
                        style={{ cursor: "pointer" }}
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          opacity: 1,
                          transition: { duration: 1 },
                          x: 0,
                          rotate: 0,
                        }}
                        initial={{
                          opacity: 0,
                          x: 100,
                          transition: { duration: 1 },
                          rotate: 360,
                        }}
                        exit={{
                          opacity: 0,
                          x: 50,
                          rotate: 360,
                          y: 100,
                          transition: { duration: 1 },
                        }}
                        item
                        lg={12}
                        component={motion.div}
                      >
                        <CardComponent
                          {...data}
                          HandleDelete={HandleDelete}
                          HandleCheck={HandleCheck}
                          HandleEdit={HandleEdit}
                        />
                      </Grid>
                    ))}
                </AnimatePresence>
              </Grid>
              <Grid
                key={"sd"}
                container
                style={{ marginTop: "20px" }}
                spacing={2}
              >
                {completed.length > 0 && (
                  <Typography variant="h5" sx={{ color: "green" }}>
                    Completed
                  </Typography>
                )}
                <AnimatePresence>
                  {state
                    .filter((arg) => arg.selected === true)
                    .map((data) => (
                      <Grid
                        key={data.id}
                        style={{ cursor: "pointer" }}
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          opacity: 1,
                          transition: { duration: 1 },
                          x: 0,
                          rotate: 0,
                        }}
                        initial={{
                          opacity: 0,
                          x: 100,
                          transition: { duration: 1 },
                          rotate: 360,
                        }}
                        exit={{
                          opacity: 0,
                          x: 50,
                          rotate: 360,
                          y: 100,
                          transition: { duration: 1 },
                        }}
                        item
                        lg={12}
                        component={motion.div}
                      >
                        <CardComponent
                          {...data}
                          HandleDelete={HandleDelete}
                          HandleCheck={HandleCheck}
                          HandleEdit={HandleEdit}
                        />
                      </Grid>
                    ))}
                </AnimatePresence>
              </Grid>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
