var shelterIds = []
document.addEventListener('DOMContentLoaded', bindButtons);
var apiKey = "0d60940cc1ebb2a47f2f53bd4ec5f607"	
var blank = 'target="_blank"';
function bindButtons(){

    document.getElementById('submitZip').addEventListener('click', function(event){
        event.preventDefault();
        d3.selectAll(".col-sm-2").remove();
        var dropdown = document.getElementById('animus').value;
        var counter = document.getElementById('count').value;
        var dogs = []
        var zip = document.getElementById('zip').value; // this line gets the zip code from the form entry
        var url = 'https://api.petfinder.com/pet.find';
            $.ajax({
                url: url,
                jsonp: "callback",
                dataType: "jsonp",
                data: {
                    key: apiKey,
                    animal: dropdown,
                    'location': zip,
                    output: 'basic',
                    count: counter,
                    format: 'json'
                },
                success: function( response ) {
                    var breeds = []
                    var names = []
                    var age = []
                    var shelterIds = []
                    console.log(response);

                    let petArray = response.petfinder.pets.pet;
                    for(var i = 0; i < petArray.length; i++){
                    //create new html to print out responses.
                        var animalName = petArray[i].name.$t;
                        var imglink = petArray[i].media.photos.photo[0].$t;
                        var id = petArray[i].id.$t;

                        var newName = document.createElement('a');
                        var newDiv = document.createElement('div');
                        newDiv.setAttribute("class", "row")
                        newName.textContent = animalName;
                        newName.href = 'https://www.petfinder.com/petdetail/' + id + " target = `_blank`";

                        // newName.href = 'https://www.petfinder.com/petdetail/' + id;

                        var newImg = document.createElement('img');
                        newImg.src = imglink;

                        var list = document.createElement("div");
                        list.setAttribute("class", "col-sm-2 center-block text-center");
                        document.body.appendChild(list);

                        newDiv.appendChild(newName);
                        list.appendChild(newImg);
                        list.appendChild(newDiv);


                    //pulling response into array of breed,names,age,shelterID.


                        names.push(petArray[i].name.$t);
                        age.push(petArray[i].age.$t);
                        shelterIds.push(petArray[i].shelterId.$t);

                        if (petArray[i].breeds.breed.length > 1){
                            for (var b = 0; b < petArray[i].breeds.breed.length; b++) {
                                var breed1 = (petArray[i].breeds.breed[0].$t);
                                var breed2 = (petArray[i].breeds.breed[1].$t);
                        }
                            breeds.push(`${breed1} / ${breed2}`);
                    }
                        else {
                            breeds.push(petArray[i].breeds.breed.$t);
                        }
                }
                        dogs.push(shelterIds, names, age, breeds);
                        console.log(dogs);

                }
            });
        
})
}