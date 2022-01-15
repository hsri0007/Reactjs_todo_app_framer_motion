import { Fab, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CardComponent = ({
  text,
  HandleDelete,
  id,
  selected,
  HandleCheck,
  HandleEdit,
}) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Card
      sx={{ padding: "10px", boxShadow: "0px 6px 9px rgba(0,0,0,0.1)" }}
      elevation={0}
    >
      <Grid container>
        <Grid item lg={10}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {!selected && (
                <Checkbox
                  {...label}
                  color="primary"
                  onClick={() => HandleCheck(id)}
                />
              )}
            </div>
            <div>
              <h2
              // style={{
              //   textDecoration: selected ? "line-through" : "",
              //   textDecorationThickness: "3px",
              //   textDecorationColor: "Black",
              // }}
              >
                {text}
              </h2>
            </div>
          </div>
        </Grid>
        <Grid item>
          <Fab
            color="primary"
            aria-label="edit"
            onClick={() => HandleEdit({ id, text, selected })}
          >
            <EditIcon />
          </Fab>
          <Fab
            color="secondary"
            sx={{ marginLeft: "10px" }}
            aria-label="edit"
            onClick={() => HandleDelete(id)}
          >
            <DeleteIcon />
          </Fab>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardComponent;
