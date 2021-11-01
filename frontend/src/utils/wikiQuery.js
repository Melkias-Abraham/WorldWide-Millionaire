const apiurl = "https://query.wikidata.org/sparql?query=";

// Query Wikidata using SPARQL
// https://query.wikidata.org

export async function queryWikidata(sparql) {
    let response = await fetch(apiurl + encodeURIComponent(sparql), {
      headers: { accept: "application/sparql-results+json" },
    });
    let json = await response.json();
    let data = json.results.bindings;
    return data;
  }