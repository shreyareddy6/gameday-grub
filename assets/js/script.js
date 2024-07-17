function openModal(modalId, sportName) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.getElementById("modalTitle").textContent = `${sportName} Games`;
    modal.classList.remove("hidden");

    teamSelectMenu();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("hidden");
  modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("closeButton").addEventListener("click", function () {
    closeModal("formModal");
  });
});

// Function to populate the dropdown based on the selected sport
function teamSelectMenu() {
  // dropdown options arrays
  const nbaOptions = [
    "-----",
    "Atlanta Hawks",
    "Boston Celtics",
    "Brooklyn Nets",
    "Charlotte Hornets",
    "Chicago Bulls",
    "Cleveland Cavaliers",
    "Dallas Maverics",
    "Denver Nuggets",
    "Detroit Pistons",
    "Golden State Warriors",
    "Houston Rockets",
    "Indiana Pacers",
    "Los Angeles Clippers",
    "Los Angeles Lakers",
    "Memphis Grizzlies",
    "Miami Heat",
    "Milwaukee Bucks",
    "Minnesota Timberwolves",
    "New Orleans Pelicans",
    "New York Knicks",
    "Oklahoma City Thunder",
    "Orlando Magic",
    "Philadelphia 76ers",
    "Phoenix Suns",
    "Portland Trail Blazers",
    "Sacramento Kings",
    "San Antonio Spurs",
    "Toronto Raptors",
    "Utah Jazz",
    "Washington Wizards",
  ];
  const mlsOptions = [
    "-----",
    "Atlanta United FC",
    "Austin FC",
    "CF Montreal",
    "Charlotte FC",
    "Chicago Fire FC",
    "Colorado Rapids",
    "Columbus Crew",
    "D.C. United",
    "FC Cincinnati",
    "FC Dallas",
    "Houston Dynamo FC",
    "Inter Miami CF",
    "LA Galaxy",
    "Los Angeles FC",
    "Minnesota United FC",
    "Nashville SC",
    "New England Revolution",
    "New York City FC",
    "New York Red Bulls",
    "Orlando City SC",
    "Philadelphia Union",
    "Portland Timbers",
    "Real Salt Lake",
    "San Jose Earthquakes",
    "Sporting Kansas City",
    "St. Louis City SC",
    "Toronto FC",
    "Vancouver Whitecaps FC",
  ];
  const mlbOptions = [
    "-----",
    "Arizona Diamondbacks",
    "Atlanta Braves",
    "Baltimore Orioles",
    "Boston Red Sox",
    "Chicago Cubs",
    "Chicago White Sox",
    "Cincinnati Reds",
    "Cleveland Guardians",
    "Colorado Rockies",
    "Detroit Tigers",
    "Houston Astros",
    "Kansas City Royals",
    "Los Angeles Angels",
    "Los Angeles Dodgers",
    "Miami Marlins",
    "Milwaukee Brewers",
    "Minnesota Twins",
    "New York Mets",
    "New York Yankees",
    "Oakland Athletics",
    "Philadelphia Phillies",
    "Pittsburgh Pirates",
    "San Diego Padres",
    "San Francisco Giants",
    "Seattle Mariners",
    "St. Louis Cardinals",
    "Tampa Bay Rays",
    "Texas Rangers",
    "Toronto Blue Jays",
    "Washington Nationals",
  ];
  const wnbaOptions = [
    "-----",
    "Atlanta Dream",
    "Chicago Sky",
    "Conneticut Sun",
    "Dallas Wings",
    "Indiana Fever",
    "Las Vegas Aces",
    "Los Angeles Sparks",
    "Minnesota Lynx",
    "New York Liberty",
    "Phoenix Mercury",
    "Seattle Storm",
    "Washington Mystics",
  ];
  const nhlOptions = [
    "-----",
    "Anaheim Ducks",
    "Boston Bruins",
    "Buffalo Sabres",
    "Calgary Flames",
    "Carolina Hurricanes",
    "Chicago Blackhawks",
    "Colorado Avalanche",
    "Columbus Blue Jackets",
    "Dallas Stars",
    "Detroit Red Wings",
    "Edmonton Oilers",
    "Florida Panthers",
    "Los Angeles Kings",
    "Minnesota Wild",
    "Montreal Canadiens",
    "Nashville Predators",
    "New Jersey Devils",
    "New York Islanders",
    "New York Rangers",
    "Ottawa Senators",
    "Philadelphia Flyers",
    "Pittsburgh Penguins",
    "San Jose Sharks",
    "Seattle Kraken",
    "St. Louis Blues",
    "Tampa Bay Lightning",
    "Toronto Maple Leafs",
    "Utah Hockey Club",
    "Vancouver Canucks",
    "Vegas Golden Knights",
    "Washington Capitals",
    "Winnipeg Jets",
  ];
  const nflOptions = [
    "-----",
    "Arizona Cardinals",
    "Atlanta Falcons",
    "Baltimore Ravens",
    "Buffalo Bills",
    "Carolina Panthers",
    "Chicago Bears",
    "Cincinnati Bengals",
    "Cleveland Browns",
    "Dallas Cowboys",
    "Denver Broncos",
    "Detroit Lions",
    "Green Bay Packers",
    "Houston Texans",
    "Indianapolis Colts",
    "Jacksonville Jaguars",
    "Kansas City Chiefs",
    "Las Vegas Raiders",
    "Los Angeles Chargers",
    "Los Angeles Rams",
    "Miami Dolphins",
    "Minnesota Vikings",
    "New England Patriots",
    "New Orleans Saints",
    "New York Giants",
    "New York Jets",
    "Philadelphia Eagles",
    "Pittsburgh Steelers",
    "San Francisco 49ers",
    "Seattle Seahawks",
    "Tampa Bay Buccaneers",
    "Tennessee Titans",
    "Washington Commanders"
  ];

  // retrieve the modal title and dropdown elements
  const modalTitle = document.getElementById("modalTitle").textContent;
  const dropDown = document.getElementById("team-dropdown");

  let dropDownArray = [];

  switch (modalTitle) {
    case "NBA Games":
      dropDownArray = nbaOptions;
      break;
    case "MLS Games":
      dropDownArray = mlsOptions;
      break;
    case "MLB Games":
      dropDownArray = mlbOptions;
      break;
    case "WNBA Games":
      dropDownArray = wnbaOptions;
      break;
    case "NHL Games":
      dropDownArray = nhlOptions;
      break;
    case "NFL Games":
      dropDownArray = nflOptions;
      break;
    default:
      console.error("Unknown sport:", modalTitle);
      return;
  }

  // clear previous options
  dropDown.innerHTML = "";

  // add new options to the dropdown
  for (let i = 0; i < dropDownArray.length; i++) {
    const option = document.createElement("option");
    option.textContent = dropDownArray[i];
    dropDown.append(option);
  }
}

// Function to allow calendar for date selection
function datepicker() {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
}

// function to store the user input in localStorage
function storeUserInputs() {
  // retireve input values from modal
  const formSubmit = document.getElementById("user-inputs");
  const gameDate = document.getElementById("datepicker");
  const teamName = document.getElementById("team-dropdown");

  // create the local storage
  localStorage.getItem("userInputs");

  // store the user inputs on modal submission
  formSubmit.addEventListener("submit", function (event) {
    event.preventDefault();

    if (gameDate.value === "" || teamName.value === "") {
      displayErrorMsg();
    } else {
      let userInput = {
        team: teamName.value,
        date: dayjs(gameDate.value).format("YYYY-MM-DD"),
      };

      localStorage.setItem("userInputs", JSON.stringify(userInput));
      location.replace("./grubpage.html");
    }
  });
}

// function to append error message to modal if submit clicked with no values
function displayErrorMsg() {
  const errorContainer = document.getElementById("errorMsg");
  const errorMsg = document.createElement("p");

  errorContainer.textContent = "";
  errorMsg.textContent = "Must select a team and game date";
  errorMsg.className =
    "font-center text-rose-700 text-sm italic font-thin pt-4 pl-9";
  errorContainer.append(errorMsg);
}

// Initial functions to run on page load
datepicker();
storeUserInputs();
