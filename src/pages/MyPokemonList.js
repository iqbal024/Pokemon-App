import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { releasePokemon, renamePokemon } from "../redux/pokemonSlice";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  TextField,
} from "@mui/material";

const MyPokemonList = () => {
  const pokemons = useSelector((state) => state.pokemon.caughtPokemons);
  const dispatch = useDispatch();
  const [renameInputs, setRenameInputs] = React.useState({});

  const handleRelease = (id) => {
    axios.get("http://localhost:5000/release").then((response) => {
      if (response.data.success) {
        dispatch(releasePokemon(id));
      } else {
        alert("Failed to release Pokemon");
      }
    });
  };

  const handleRenameChange = (id, value) => {
    setRenameInputs({ ...renameInputs, [id]: value });
  };

  const handleRename = (id, name) => {
    axios.get(`http://localhost:5000/rename?name=${name}`).then((response) => {
      dispatch(renamePokemon({ id, newName: response.data.rename }));
      setRenameInputs({ ...renameInputs, [id]: "" });
    });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Pokemon List
      </Typography>
      <List>
        {pokemons.map((pokemon) => (
          <ListItem key={pokemon.id}>
            <ListItemText primary={`${pokemon.nickname} (${pokemon.name})`} />
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRelease(pokemon.id)}
              >
                Release
              </Button>
              <TextField
                label="Rename"
                value={renameInputs[pokemon.id] || ""}
                onChange={(e) => handleRenameChange(pokemon.id, e.target.value)}
                style={{ marginLeft: "10px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRename(pokemon.id, pokemon.nickname)}
                style={{ marginLeft: "10px" }}
              >
                Rename
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MyPokemonList;
