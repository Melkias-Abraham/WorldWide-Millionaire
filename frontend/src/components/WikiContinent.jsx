import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import image from "../addons/game.png";
import as from "../addons/as.jpg";
import { queryWikidata } from "../utils/wikiQuery";
import { stateContext } from "../providers/StateProvider";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { CardActions } from "@mui/material";

import ListItemText from "@mui/material/ListItemText";
import { textAlign } from "@mui/system";

export default function WikiContinent() {
  const [continentData, setContinentData] = useState({
    population: 0,
    pageBanner: "",
    borders: "",
    consists: "",
    loading: false,
  });
  const { state } = useContext(stateContext);

  useEffect(() => {
    let sparql = `SELECT ?continent ?continentLabel ?continentFlag ?continentPopulation ?pageBanner (GROUP_CONCAT(DISTINCT ?bordersLabel; SEPARATOR=", ") AS ?bordersLabels) (GROUP_CONCAT(DISTINCT ?containLabel; SEPARATOR=", ") AS ?containLabels) WHERE {
      {
        SELECT *  WHERE  {
          ?continent wdt:P31 wd:Q5107.
          OPTIONAL {
            ?continent wdt:P242 ?continentFlag.
            ?continent wdt:P1082 ?continentPopulation.
          }
          OPTIONAL {
                  ?continent wdt:P47 ?borders.
          }
          OPTIONAL {
                  ?continent wdt:P948 ?pageBanner.
          }
          OPTIONAL {
                  ?continent wdt:P527 ?contain.
          }
          
        }
      }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
                             ?borders rdfs:label ?bordersLabel .
                             ?contain rdfs:label ?containLabel .
                             ?continent rdfs:label ?continentLabel .}
    }
group by ?continent ?continentLabel ?continentFlag ?continentPopulation ?pageBanner`;
    if (state.continent) {
      setContinentData(prev => ({...prev, loading: true}))
      queryWikidata(sparql)
        .then((result) => {
          // console.log("state", state);
          // console.log("state", result);
          let dataObj = {
            population: 0,
            pageBanner: "",
            image: "",
            borders: "",
            consists: "",
            loading: false,
          };
          const c = result.find(
            (data) => data.continentLabel.value === state.continent.name
          );

          dataObj = {
            population: c.continentPopulation.value,
            pageBanner: c.pageBanner && c.pageBanner.value,
            borders: c.bordersLabels,
            consists: c.containLabels,
            loading: false,
          };
          console.log("THIS IS CONTINENT DATA", c);
          setContinentData(dataObj);
        })
        .catch((err) => err);
    }
  }, [state]);

  const skeleton = (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Stack>
  );

  const introCard = (
    <Card sx={{ maxWidth: 400, fontSize: "20px !important" }}>
      <CardHeader title={"Rules:"} />
      <CardContent>
        <List sx={{ alignSelf: "flex-start" }} subheader={<li />}>
          <ListItemText primary="1. Do not talk about fight club" />
          <ListItemText primary="2. Select a continent from the map " />
          <ListItemText primary="3. Click Start Game" />
          <ListItemText primary="4. Answer some questions" />
          <ListItemText primary="5. Enjoy" />
        </List>
      </CardContent>
    </Card>
  );

  return (
    <>
      {console.log(continentData)}
      {continentData.loading ? (
        skeleton
      ) : (
        <>
          {!state.continent ? (
            introCard
          ) : (
            <Card sx={{ maxWidth: 400 }}>
              <CardHeader
                title={(state.continent && state.continent.name) || "World"}
                subheader="Intro:"
              />
              <CardMedia
                component="img"
                height="140"
                image={
                  (continentData.pageBanner && continentData.pageBanner) || as
                }
                alt="wwtbam background"
              />
              <CardContent>
                <Typography variant="body2">
                <Typography variant="h6" display="inline">Population: </Typography> 
                  {(continentData && continentData.population) || "So many"}
                </Typography>
                <Divider sx={{ m: "1rem 0" }} />

                <Typography variant="body2">
                <Typography variant="h6" display="inline">Borders: </Typography> 
                  {(continentData && continentData.borders.value) || "So many"}
                </Typography>
                <Divider sx={{ m: "1rem 0" }} />

                <Typography variant="body2">
                <Typography variant="h6" display="inline">Consists of: </Typography>  {(continentData && continentData.consists.value) || "So many"}
                </Typography>
                <Divider sx={{ mt: "1rem" }} />

                <CardActions>
                  {" "}
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    color="text.secondary"
                  >
                    Source: Wikidata
                  </Typography>
                </CardActions>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </>
  );
}
