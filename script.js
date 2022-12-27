

function setIndicatorTrue() {
  document
    .getElementById("body")
    .classList.replace("body__false", "body__true");
  document.getElementById("indicator").innerHTML =
    "Уровень бумажных полотенец ниже критического";
  document
    .getElementById("indicator")
    .classList.replace("indicator__false", "indicator__true");
}

function setIndicatorFalse() {
  document
    .getElementById("body")
    .classList.replace("body__true", "body__false");
  document.getElementById("indicator").innerHTML = "Всё в порядке";
  document
    .getElementById("indicator")
    .classList.replace("indicator__true", "indicator__false");
}

async function fetchIndicatorStatus() {
  const response = await fetch(
    "https://blynk.cloud/external/api/get?token=MI6LRaI5RilMyNwDUj1DoXo_xJAo6xae&v0"
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const responseData = await response.json();
  console.log(responseData);

  if (responseData === 1) {
    setIndicatorTrue();
  } else if (responseData === 0) {
    setIndicatorFalse();
  }
  //   await fetch(
  //     "https://blynk.cloud/external/api/get?token=iyDUGy_1jqMhI0gHxBQC3jvcM3wPzO7V&v0"
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`Request failed with status ${response.status}`);
  //       }
  //       console.log(response);
  //       return response;
  //     })
  //     .then((data) => {
  //       console.log(data.json(), "coco");
  //       if (data === 1) {
  //         setIndicatorFalse();
  //       } else {
  //         setIndicatorTrue();
  //       }
  //     })
  //     .catch((error) => console.log(error));
}

fetchIndicatorStatus();

setInterval(() => {
  console.log("fetching");
  fetchIndicatorStatus();
}, "5000");
