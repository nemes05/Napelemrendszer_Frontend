'use strict'
var http = new XMLHttpRequest();

function listMissingParts() {
    alert("Jelenleg ez a funkció még nem elérhető.")
}
function listReservedParts() {
    alert("Jelenleg ez a funkció még nem elérhető.")
}
function addShippedPart() {
    alert("Jelenleg ez a funkció még nem elérhető.")
}
function boxManagement() {
    alert("Jelenleg ez a funkció még nem elérhető.")
}

function addNewPart() {
    var iframe = document.getElementById('myFrame');
    iframe.src = "newPart.html";
    iframe.hidden = false;
}

function setPrice() {
    var iframe = document.getElementById('myFrame');
    iframe.src = "setPrice.html";
    iframe.hidden = false;
}

function loadItemsDropdown() {
    http.onreadystatechange = function () {

        //Creates the dropdown and puts it in the div
        if (this.readyState == 4 && this.status == 200) {

            let response = JSON.parse(this.response);
            var select = document.getElementById("partSelect");

            $.each(response.result, function () {
                var opt = document.createElement("option");
                opt.value = this.price;
                opt.id = this.partID;
                opt.text = this.partName;
                select.appendChild(opt);
            });

            $("#previousPrice").text(response.result[0].price);
        }

        //Handles error
        else if (this.readyState == 4 && this.status == 401) {
            alert('Nem tudtunk csatlakozni az adatbázishoz!');
        }
    }

    http.open("GET", "http://localhost:3000/getAllParts");
    http.setRequestHeader("Authorization", document.cookie.split("=")[1]);
    http.send();
}

function changeCurrentPriceValue() {
    //Changes the 'Régi ár' dynamically
    $("#previousPrice").text($("#partSelect").val());
}